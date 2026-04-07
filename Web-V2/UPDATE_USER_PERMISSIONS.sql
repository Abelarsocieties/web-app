-- ============================================
-- Update RLS Policies for User Content Management
-- ============================================
-- This allows users to manage their own content (programs, opportunities, works)
-- while admins can manage everything
-- ============================================

-- ============================================
-- PROGRAMS TABLE - Allow users to create/manage their own programs
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Only admins/editors can manage programs" ON programs;

-- Allow users to create programs (they own them)
CREATE POLICY "Users can create programs"
  ON programs FOR INSERT
  WITH CHECK (true); -- Anyone authenticated can create

-- Allow users to update/delete their own programs
-- Note: We need to add a created_by column first
ALTER TABLE programs ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- Update existing programs to have created_by (set to first admin or null)
UPDATE programs SET created_by = (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1) WHERE created_by IS NULL;

-- Now create policies
CREATE POLICY "Users can update their own programs"
  ON programs FOR UPDATE
  USING (
    auth.uid() = created_by 
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

CREATE POLICY "Users can delete their own programs"
  ON programs FOR DELETE
  USING (
    auth.uid() = created_by 
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Public can view active programs
CREATE POLICY "Public can view active programs"
  ON programs FOR SELECT
  USING (status = 'active' OR auth.uid() = created_by OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- ============================================
-- WORKS TABLE - Users can already manage their own works
-- But let's ensure they can also publish/unpublish
-- ============================================

-- Users can update their own works (including status changes)
DROP POLICY IF EXISTS "Users can update their own works" ON works;
CREATE POLICY "Users can update their own works"
  ON works FOR UPDATE
  USING (
    auth.uid() = author_id 
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Users can delete their own works
DROP POLICY IF EXISTS "Users can delete their own draft works" ON works;
CREATE POLICY "Users can delete their own works"
  ON works FOR DELETE
  USING (
    auth.uid() = author_id 
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- ============================================
-- COMMENTS TABLE - Admins can delete any comment
-- Users can delete their own comments (already exists)
-- ============================================

-- Policy already exists: "Users can delete their own comments"
-- This allows both users and admins to delete comments

-- ============================================
-- OPPORTUNITIES - If you have a separate opportunities table
-- ============================================

-- If opportunities are stored in programs table with type='opportunity', 
-- the above policies already cover them.
-- If you have a separate opportunities table, add similar policies.

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check policies on programs
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'programs';

-- Check policies on works
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'works';

-- Check policies on comments
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'comments';
