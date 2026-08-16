ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS publish_at timestamptz,
  ADD COLUMN IF NOT EXISTS unpublish_at timestamptz;

CREATE TABLE IF NOT EXISTS public.role_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  role public.app_role NOT NULL DEFAULT 'editor',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.role_invites TO authenticated;
GRANT ALL ON public.role_invites TO service_role;

ALTER TABLE public.role_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage role invites" ON public.role_invites
  FOR ALL TO authenticated
  USING (public.is_site_admin())
  WITH CHECK (public.is_site_admin());

CREATE POLICY "Users can read their own invite" ON public.role_invites
  FOR SELECT TO authenticated
  USING (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

CREATE TRIGGER role_invites_updated_at
  BEFORE UPDATE ON public.role_invites
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
    OR coalesce(auth.jwt() ->> 'email', '') = 'thedesigngrandmaster@gmail.com'
    OR EXISTS (
      SELECT 1 FROM public.role_invites ri
      WHERE lower(ri.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        AND ri.role = 'admin'
    )
$$;

CREATE OR REPLACE FUNCTION public.is_site_editor()
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT public.is_site_admin()
    OR public.has_role(auth.uid(), 'editor')
    OR EXISTS (
      SELECT 1 FROM public.role_invites ri
      WHERE lower(ri.email) = lower(coalesce(auth.jwt() ->> 'email', ''))
        AND ri.role = 'editor'
    )
$$;

CREATE TABLE IF NOT EXISTS public.audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  actor_email text NOT NULL DEFAULT '',
  entity text NOT NULL,
  entity_key text NOT NULL DEFAULT '',
  action text NOT NULL,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS audit_log_created_at_idx ON public.audit_log (created_at DESC);

GRANT SELECT, INSERT ON public.audit_log TO authenticated;
GRANT ALL ON public.audit_log TO service_role;

ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Editors read the audit log" ON public.audit_log
  FOR SELECT TO authenticated
  USING (public.is_site_editor());

CREATE POLICY "Editors write their own audit entries" ON public.audit_log
  FOR INSERT TO authenticated
  WITH CHECK (public.is_site_editor() AND actor_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can read published projects" ON public.projects;
CREATE POLICY "Anyone can read published projects" ON public.projects
  FOR SELECT TO anon
  USING (
    published
    AND (publish_at IS NULL OR publish_at <= now())
    AND (unpublish_at IS NULL OR unpublish_at > now())
  );

DROP POLICY IF EXISTS "Signed in users read projects" ON public.projects;
CREATE POLICY "Signed in users read projects" ON public.projects
  FOR SELECT TO authenticated
  USING (
    (
      published
      AND (publish_at IS NULL OR publish_at <= now())
      AND (unpublish_at IS NULL OR unpublish_at > now())
    )
    OR public.is_site_admin()
  );

INSERT INTO public.site_content (key, value)
VALUES ('site.cv', '{"note": ""}'::jsonb)
ON CONFLICT (key) DO NOTHING;