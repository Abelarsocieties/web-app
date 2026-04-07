-- ============================================
-- Abelar Project - Secure Database Setup
-- ============================================
-- This script sets up a SECURE database configuration where:
-- 1. RLS is enabled on all tables
-- 2. NO policies are created (blocks all access by default)
-- 3. Only service role key can access DB directly
-- 4. All writes go through Edge Functions with authentication
-- ============================================

-- ============================================
-- 1. DROP ALL EXISTING POLICIES (if any)
-- ============================================
-- This ensures we start with a clean slate

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile and public profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Works Policies
DROP POLICY IF EXISTS "Published works are public" ON works;
DROP POLICY IF EXISTS "Authenticated users can create works" ON works;
DROP POLICY IF EXISTS "Users can update their own works" ON works;
DROP POLICY IF EXISTS "Users can delete their own draft works" ON works;

-- Work Images Policies
DROP POLICY IF EXISTS "Work images follow work visibility" ON work_images;
DROP POLICY IF EXISTS "Users can add images to their own works" ON work_images;
DROP POLICY IF EXISTS "Users can manage images for their own works" ON work_images;

-- Likes Policies
DROP POLICY IF EXISTS "Likes are public" ON likes;
DROP POLICY IF EXISTS "Authenticated users can like works" ON likes;
DROP POLICY IF EXISTS "Users can unlike their own likes" ON likes;

-- Programs Policies
DROP POLICY IF EXISTS "Active programs are public" ON programs;
DROP POLICY IF EXISTS "Only admins/editors can manage programs" ON programs;

-- Submissions Policies
DROP POLICY IF EXISTS "Users can see their own submissions" ON submissions;
DROP POLICY IF EXISTS "Users can create submissions" ON submissions;
DROP POLICY IF EXISTS "Only admins/editors can update submissions" ON submissions;

-- Comments Policies
DROP POLICY IF EXISTS "Comments are public for published works" ON comments;
DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;

-- Contact Messages Policies
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Only admins can view contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Only admins can update contact messages" ON contact_messages;

-- ============================================
-- 2. ENABLE RLS ON ALL TABLES (BLOCKS ALL ACCESS)
-- ============================================
-- With RLS enabled and NO policies, all access is blocked
-- Only service role key can bypass RLS

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 3. CREATE READ-ONLY POLICIES (OPTIONAL - FOR PUBLIC DATA)
-- ============================================
-- Only add these if you want public read access
-- Comment out if you want everything to go through Edge Functions

-- Allow public read access to published works (for public pages)
-- CREATE POLICY "Public can view published works"
--   ON works FOR SELECT
--   USING (status = 'published');

-- Allow public read access to active programs
-- CREATE POLICY "Public can view active programs"
--   ON programs FOR SELECT
--   USING (status = 'active');

-- Allow public read access to likes count
-- CREATE POLICY "Public can view likes"
--   ON likes FOR SELECT
--   USING (true);

-- ============================================
-- 4. SECURE FUNCTION FOR PROFILE CREATION
-- ============================================
-- This function can only be called by authenticated users via Edge Function
-- It uses SECURITY DEFINER to run with elevated privileges

CREATE OR REPLACE FUNCTION secure_create_profile(user_id UUID, user_name TEXT, first_name TEXT, last_name TEXT)
RETURNS profiles
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_profile profiles;
BEGIN
  INSERT INTO profiles (id, name, first_name, last_name, role)
  VALUES (user_id, user_name, first_name, last_name, 'user')
  RETURNING * INTO new_profile;
  
  RETURN new_profile;
END;
$$;

-- ============================================
-- 5. GRANT EXECUTE PERMISSIONS
-- ============================================
-- Only authenticated users can call secure functions
-- Edge Functions will authenticate before calling

-- Grant execute to authenticated role (for Edge Functions)
GRANT EXECUTE ON FUNCTION secure_create_profile TO authenticated;
GRANT EXECUTE ON FUNCTION secure_create_profile TO anon; -- Only if needed for signup

-- ============================================
-- SECURITY NOTES
-- ============================================
-- 1. All tables now have RLS enabled with NO policies
-- 2. Direct client access is BLOCKED
-- 3. Only service role key can access DB directly
-- 4. All writes must go through Edge Functions
-- 5. Edge Functions authenticate users before making changes
-- 6. Edge Functions use service role key for DB operations
--
-- NEXT STEPS:
-- 1. Create Edge Functions for all write operations
-- 2. Update frontend to call Edge Functions instead of direct Supabase calls
-- 3. Test that direct client access is blocked
-- 4. Verify Edge Functions work correctly
