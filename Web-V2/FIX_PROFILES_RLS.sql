-- ============================================
-- Fix Profiles RLS Policy for Admin Login
-- ============================================
-- This adds back the necessary RLS policy so users can read their own profile
-- This is required for admin login to work
-- ============================================

-- Allow users to read their own profile (required for login role checking)
CREATE POLICY IF NOT EXISTS "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Also allow reading all profiles (for public profile viewing)
-- Uncomment if you want public profile viewing:
-- CREATE POLICY IF NOT EXISTS "Public can view profiles"
--   ON profiles FOR SELECT
--   USING (true);

-- Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'profiles';
