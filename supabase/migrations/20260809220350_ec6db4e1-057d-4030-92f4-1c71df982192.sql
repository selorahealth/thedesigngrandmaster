DROP POLICY "Published projects are public" ON public.projects;
CREATE POLICY "Anyone can read published projects" ON public.projects
  FOR SELECT TO anon USING (published);
CREATE POLICY "Signed in users read projects" ON public.projects
  FOR SELECT TO authenticated USING (published OR public.is_site_admin());

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, public;
REVOKE ALL ON FUNCTION public.is_site_admin() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_site_admin() TO authenticated, service_role;