REVOKE EXECUTE ON FUNCTION public.is_site_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_site_editor() FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated;