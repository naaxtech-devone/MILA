-- has_role is SECURITY DEFINER and must stay callable by authenticated
-- (RLS policies + assertAdmin server fn use it), but anon has no reason to call it.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
