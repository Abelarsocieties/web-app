-- ============================================
-- Complete Diagnostic and Fix Script
-- ============================================
-- Run this entire script to diagnose and fix the issue
-- ============================================

-- STEP 1: Check if user exists
SELECT 
  'User Check' as step,
  id,
  email,
  created_at
FROM auth.users 
WHERE email = 'support@icwebpro.net'
   OR id = 'f45cce0e-0797-4c2b-9528-22957be90930';

-- STEP 2: Check if profile exists (bypassing RLS with service role)
SELECT 
  'Profile Check (Direct)' as step,
  p.id,
  p.name,
  p.role,
  u.email
FROM profiles p
LEFT JOIN auth.users u ON u.id = p.id
WHERE p.id = 'f45cce0e-0797-4c2b-9528-22957be90930'
   OR u.email = 'support@icwebpro.net';

-- STEP 3: Check RLS policies on profiles table
SELECT 
  'RLS Policies Check' as step,
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'profiles';

-- STEP 4: Add RLS policy if missing (allows users to read their own profile)
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Also allow reading all profiles (for admin login check)
DROP POLICY IF EXISTS "Public can view profiles" ON profiles;
CREATE POLICY "Public can view profiles"
  ON profiles FOR SELECT
  USING (true);

-- STEP 5: Create the profile with exact user ID
INSERT INTO profiles (id, name, role)
VALUES (
  'f45cce0e-0797-4c2b-9528-22957be90930',
  'Admin User',
  'admin'
)
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  name = COALESCE(profiles.name, 'Admin User');

-- STEP 6: Verify profile was created
SELECT 
  'Final Verification' as step,
  p.id,
  u.email,
  p.name,
  p.role,
  p.created_at,
  p.updated_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.id = 'f45cce0e-0797-4c2b-9528-22957be90930';

-- STEP 7: Verify RLS policies are active
SELECT 
  'RLS Verification' as step,
  COUNT(*) as policy_count
FROM pg_policies
WHERE tablename = 'profiles';
