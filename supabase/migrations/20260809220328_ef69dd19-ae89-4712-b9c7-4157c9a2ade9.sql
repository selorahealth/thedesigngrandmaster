-- Roles
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','editor');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin')
    OR coalesce(auth.jwt() ->> 'email', '') = 'thedesigngrandmaster@gmail.com'
$$;

CREATE POLICY "Users can read their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

-- Projects (CMS managed)
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  industry text NOT NULL DEFAULT '',
  services jsonb NOT NULL DEFAULT '[]'::jsonb,
  tech jsonb NOT NULL DEFAULT '[]'::jsonb,
  year text NOT NULL DEFAULT '',
  url text NOT NULL DEFAULT '',
  summary text NOT NULL DEFAULT '',
  device text NOT NULL DEFAULT 'desktop',
  screen text NOT NULL DEFAULT '',
  second_screen text,
  second_device text,
  brief jsonb NOT NULL DEFAULT '[]'::jsonb,
  sections jsonb NOT NULL DEFAULT '[]'::jsonb,
  outcomes jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published projects are public" ON public.projects
  FOR SELECT TO anon, authenticated USING (published OR public.is_site_admin());
CREATE POLICY "Admins manage projects" ON public.projects
  FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Editable page copy
CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Site content is public" ON public.site_content
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage site content" ON public.site_content
  FOR ALL TO authenticated USING (public.is_site_admin()) WITH CHECK (public.is_site_admin());
CREATE TRIGGER site_content_updated_at BEFORE UPDATE ON public.site_content
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.projects (slug,name,category,industry,services,tech,year,url,summary,device,screen,second_screen,second_device,sort_order) VALUES
('suise','Suise','Fintech / Web','Fintech, payments','["Branding", "Web design", "Product design"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://suise.vercel.app/','A payments dashboard that makes moving money feel calm instead of clinical.','desktop','suise-dashboard.png',NULL,NULL,0),
('a01luxe','A01Luxe','Ecommerce / Web','Retail, luxury fashion','["Branding", "Web design", "Graphic design"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://a01luxe.vercel.app/','A luxury storefront and admin surface built around product photography.','desktop','a01luxe-shop-dashboard.png',NULL,NULL,1),
('pulse-talks','Pulse Talks','Media / Web','Media, events','["Branding", "Web design", "Graphic design"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://pulsetalks.vercel.app/','A talks platform with editorial pacing and a speaker-first home page.','desktop','pulsetalks-hero-section.png',NULL,NULL,2),
('women-in-leadership','Women in Leadership','Community / Web','Nonprofit, community','["Web design", "Graphic design", "Consulting"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://women-in-leadership-team.vercel.app/','A programme site built to convert readers into applicants.','desktop','women-in-leadership-hero-section.png',NULL,NULL,3),
('interior','Interior','Interiors / Web','Interior design','["Web design", "Branding"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','http://interior-design-hub.vercel.app/','A studio portfolio where the rooms do the talking.','desktop','interior-hero-section.png',NULL,NULL,4),
('selorah-health','Selorah Health','Health / Web','Healthcare','["Product design", "Web design", "B2B"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://selorah.vercel.app/','A clinic platform with a marketing front and a patient-facing app behind it.','desktop','selorah-desktop-screen.png','selorah-mobile.png','mobile',5),
('syncstep','SyncStep','Fitness / Product','Fitness, wearables','["Product design", "Web design", "Branding"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','http://syncstep.vercel.app/','A training product page built on motion and metrics.','desktop','syncstep-hero-section.png',NULL,NULL,6),
('toju','Toju','Health / Product','Healthcare, diagnostics','["Product design", "B2B", "Consulting"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://toju-ts.vercel.app/','A clinical dashboard where the data density had to stay readable.','desktop','toju-hero-section.png',NULL,NULL,7),
('fixbase','FixBase','Services / App','Home services','["Product design", "Web design"]'::jsonb,'["HTML", "CSS", "JavaScript", "Vercel"]'::jsonb,'2025','https://fixbase-html.vercel.app/','A repairs marketplace designed thumb-first.','mobile','fixbase-mobile.png',NULL,NULL,8),
('rektpay','RektPay','Crypto / Web','Crypto, payments','["Product design", "Branding"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://rektpay.netlify.app/','A crypto wallet flow that keeps confidence high and steps low.','mobile','rektpay-mobile.png',NULL,NULL,9),
('solarib','Solarib','Energy / Web','Renewable energy','["Web design", "B2B", "Branding"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://solarib.vercel.app/','A solar installer site that quotes instead of brochures.','desktop','solarib-desktop.png',NULL,NULL,10),
('webre','Webre','Agency / Web','Agency, services','["Branding", "Web design", "Graphic design"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://webre-dun.vercel.app/','An agency site with a strong opening statement and a fast case index.','desktop','webre-desktop.png',NULL,NULL,11),
('haus','Haus','Real estate / Web','Real estate','["Web design", "Product design", "Branding"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','http://haus-seven.vercel.app/','A property platform with listings that survive a phone screen.','desktop','haus-desktop.png','haus-mobile.png','mobile',12),
('newmanstores-collections','Newmanstores Collections','Retail / Web','Retail, fashion','["Web design", "Branding", "Graphic design"]'::jsonb,'["React", "TypeScript", "Tailwind CSS", "Vercel"]'::jsonb,'2025','https://the-nsc-hubbb.vercel.app/','A retail hub with an account layer and a catalogue that loads fast.','desktop','newmanstores-desktop.png','newmanstores-mobile.png','mobile',13);

-- Realtime
ALTER TABLE public.projects REPLICA IDENTITY FULL;
ALTER TABLE public.site_content REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;