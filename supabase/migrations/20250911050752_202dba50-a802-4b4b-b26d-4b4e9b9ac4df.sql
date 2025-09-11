-- Fix security issue: Ensure access_requests table has proper RLS policies
-- Drop existing policies that might be too permissive
DROP POLICY IF EXISTS "Anyone can create access requests" ON public.access_requests;
DROP POLICY IF EXISTS "Users can view their own access requests" ON public.access_requests;
DROP POLICY IF EXISTS "Admins can view all access requests" ON public.access_requests;
DROP POLICY IF EXISTS "Admins can update access requests" ON public.access_requests;
DROP POLICY IF EXISTS "Admins can delete access requests" ON public.access_requests;

-- Recreate policies with explicit security controls
-- Allow anyone to create access requests (for contact form functionality)
CREATE POLICY "Allow public access request creation"
ON public.access_requests
FOR INSERT
TO public
WITH CHECK (true);

-- Only allow authenticated users to view their own access requests (matched by email)
CREATE POLICY "Users can view their own access requests"
ON public.access_requests
FOR SELECT
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND email = (
    SELECT users.email 
    FROM auth.users 
    WHERE users.id = auth.uid()
  )::text
);

-- Only allow admins to view all access requests
CREATE POLICY "Admins can view all access requests"
ON public.access_requests
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'::app_role
  )
);

-- Only allow admins to update access requests
CREATE POLICY "Admins can update access requests"
ON public.access_requests
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'::app_role
  )
);

-- Only allow admins to delete access requests
CREATE POLICY "Admins can delete access requests"
ON public.access_requests
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'::app_role
  )
);

-- Ensure RLS is enabled on the table
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;