-- Fix function search path security issue
DROP FUNCTION IF EXISTS public.has_role(_user_id uuid, _role app_role);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
-- Fix: Set immutable search_path to prevent security issues
SET search_path = 'public'
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;