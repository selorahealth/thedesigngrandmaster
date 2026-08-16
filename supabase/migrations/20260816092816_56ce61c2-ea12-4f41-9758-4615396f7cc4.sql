REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_site_editor() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_site_editor() TO authenticated;