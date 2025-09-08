-- Fix security vulnerabilities in access_requests and newsletters tables
-- Issue: Customer email addresses could be harvested by unauthorized access

-- First, let's fix the access_requests table
-- Remove any overly permissive policies and ensure proper access control

-- Drop existing policies to rebuild them properly
DROP POLICY IF EXISTS "Anyone can create access requests" ON public.access_requests;
DROP POLICY IF EXISTS "Users can view their own access requests" ON public.access_requests;

-- Recreate proper policies for access_requests
-- 1. Allow anyone to create access requests (this is needed for contact forms)
CREATE POLICY "Anyone can create access requests"
ON public.access_requests
FOR INSERT
TO public
WITH CHECK (true);

-- 2. Allow users to view only their own access requests (authenticated users only)
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

-- 3. Allow admins to view all access requests
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

-- 4. Allow admins to update access requests (for status changes)
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

-- 5. Allow admins to delete access requests if needed
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

-- Now fix the newsletters table security issues
-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletters;
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.newsletters;
DROP POLICY IF EXISTS "Admins can manage all newsletter subscriptions" ON public.newsletters;

-- Recreate proper policies for newsletters
-- 1. Allow anyone to subscribe (needed for newsletter signup)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletters
FOR INSERT
TO public
WITH CHECK (true);

-- 2. Users can only view their own subscription (authenticated only)
CREATE POLICY "Users can view their own subscription"
ON public.newsletters
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

-- 3. Users can update their own subscription (for unsubscribing)
CREATE POLICY "Users can update their own subscription"
ON public.newsletters
FOR UPDATE
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND email = (
    SELECT users.email 
    FROM auth.users 
    WHERE users.id = auth.uid()
  )::text
);

-- 4. Admins can view all newsletter subscriptions
CREATE POLICY "Admins can view all newsletters"
ON public.newsletters
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

-- 5. Admins can manage all newsletter subscriptions
CREATE POLICY "Admins can manage all newsletters"
ON public.newsletters
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'::app_role
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'::app_role
  )
);