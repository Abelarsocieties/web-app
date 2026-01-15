-- ============================================
-- Abelar Project - Supabase Database Setup
-- ============================================
-- Run this entire script in the Supabase SQL Editor
-- Make sure to run it in order (don't skip sections), or just simply copy and paste so it works same way on your end like it does for me

-- ============================================
-- 1. ENABLE EXTENSIONS
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. CREATE TABLES
-- ============================================

-- Profiles table (user profiles and roles)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'editor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Works table (user-submitted content)
CREATE TABLE IF NOT EXISTS works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'published', 'rejected')),
  cover_image_url TEXT,
  content_json JSONB,
  category TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Work images table (additional images for works)
CREATE TABLE IF NOT EXISTS work_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Likes table (user likes for works)
CREATE TABLE IF NOT EXISTS likes (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, work_id)
);

-- Programs table (program/category information)
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('hackathon', 'research_sprint', 'learning_session', 'opportunity')),
  deadline TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'concluded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Submissions table (submission review information)
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  submitted_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  decision TEXT CHECK (decision IN ('approved', 'rejected', 'pending')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- Comments table (comments on works)
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table (contact form submissions)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. CREATE INDEXES (for performance)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_works_status ON works(status);
CREATE INDEX IF NOT EXISTS idx_works_author ON works(author_id);
CREATE INDEX IF NOT EXISTS idx_works_slug ON works(slug);
CREATE INDEX IF NOT EXISTS idx_works_published ON works(published_at) WHERE status = 'published';
CREATE INDEX IF NOT EXISTS idx_likes_work ON likes(work_id);
CREATE INDEX IF NOT EXISTS idx_likes_user ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_work_images_work ON work_images(work_id);
CREATE INDEX IF NOT EXISTS idx_submissions_work ON submissions(work_id);
CREATE INDEX IF NOT EXISTS idx_submissions_submitted_by ON submissions(submitted_by);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_comments_work ON comments(work_id);
CREATE INDEX IF NOT EXISTS idx_comments_author ON comments(author_id);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at);

-- ============================================
-- 4. CREATE FUNCTIONS
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, first_name, last_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 5. CREATE TRIGGERS
-- ============================================

-- Trigger to auto-create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at on profiles
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on works
DROP TRIGGER IF EXISTS update_works_updated_at ON works;
CREATE TRIGGER update_works_updated_at
  BEFORE UPDATE ON works
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on programs
DROP TRIGGER IF EXISTS update_programs_updated_at ON programs;
CREATE TRIGGER update_programs_updated_at
  BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update updated_at on comments
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. CREATE RLS POLICIES
-- ============================================

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile and public profiles" ON profiles;
CREATE POLICY "Users can view their own profile and public profiles"
  ON profiles FOR SELECT
  USING (auth.uid() = id OR true);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Works Policies
DROP POLICY IF EXISTS "Published works are public" ON works;
CREATE POLICY "Published works are public"
  ON works FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

DROP POLICY IF EXISTS "Authenticated users can create works" ON works;
CREATE POLICY "Authenticated users can create works"
  ON works FOR INSERT
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update their own works" ON works;
CREATE POLICY "Users can update their own works"
  ON works FOR UPDATE
  USING (
    auth.uid() = author_id AND status IN ('draft', 'submitted')
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

DROP POLICY IF EXISTS "Users can delete their own draft works" ON works;
CREATE POLICY "Users can delete their own draft works"
  ON works FOR DELETE
  USING (
    (auth.uid() = author_id AND status = 'draft')
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

-- Work Images Policies
DROP POLICY IF EXISTS "Work images follow work visibility" ON work_images;
CREATE POLICY "Work images follow work visibility"
  ON work_images FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM works WHERE works.id = work_images.work_id
    AND (works.status = 'published' OR works.author_id = auth.uid() OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
    ))
  ));

DROP POLICY IF EXISTS "Users can add images to their own works" ON work_images;
CREATE POLICY "Users can add images to their own works"
  ON work_images FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM works WHERE works.id = work_images.work_id AND works.author_id = auth.uid()
  ) OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')));

DROP POLICY IF EXISTS "Users can manage images for their own works" ON work_images;
CREATE POLICY "Users can manage images for their own works"
  ON work_images FOR ALL
  USING (EXISTS (
    SELECT 1 FROM works WHERE works.id = work_images.work_id AND works.author_id = auth.uid()
  ) OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')));

-- Likes Policies
DROP POLICY IF EXISTS "Likes are public" ON likes;
CREATE POLICY "Likes are public"
  ON likes FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can like works" ON likes;
CREATE POLICY "Authenticated users can like works"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can unlike their own likes" ON likes;
CREATE POLICY "Users can unlike their own likes"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- Programs Policies
DROP POLICY IF EXISTS "Active programs are public" ON programs;
CREATE POLICY "Active programs are public"
  ON programs FOR SELECT
  USING (status = 'active' OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

DROP POLICY IF EXISTS "Only admins/editors can manage programs" ON programs;
CREATE POLICY "Only admins/editors can manage programs"
  ON programs FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Submissions Policies
DROP POLICY IF EXISTS "Users can see their own submissions" ON submissions;
CREATE POLICY "Users can see their own submissions"
  ON submissions FOR SELECT
  USING (
    auth.uid() = submitted_by
    OR EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))
  );

DROP POLICY IF EXISTS "Users can create submissions" ON submissions;
CREATE POLICY "Users can create submissions"
  ON submissions FOR INSERT
  WITH CHECK (auth.uid() = submitted_by);

DROP POLICY IF EXISTS "Only admins/editors can update submissions" ON submissions;
CREATE POLICY "Only admins/editors can update submissions"
  ON submissions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Comments Policies
DROP POLICY IF EXISTS "Comments are public for published works" ON comments;
CREATE POLICY "Comments are public for published works"
  ON comments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM works WHERE works.id = comments.work_id AND works.status = 'published'
  ) OR auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

DROP POLICY IF EXISTS "Authenticated users can create comments" ON comments;
CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

DROP POLICY IF EXISTS "Users can update their own comments" ON comments;
CREATE POLICY "Users can update their own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;
CREATE POLICY "Users can delete their own comments"
  ON comments FOR DELETE
  USING (auth.uid() = author_id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- Contact Messages Policies
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins can view contact messages" ON contact_messages;
CREATE POLICY "Only admins can view contact messages"
  ON contact_messages FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

DROP POLICY IF EXISTS "Only admins can update contact messages" ON contact_messages;
CREATE POLICY "Only admins can update contact messages"
  ON contact_messages FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'editor')
  ));

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Your database is now ready. Next steps:
-- 1. Set up email OTP in Supabase Dashboard (you can ask me on how to do this step)
-- 2. Create storage buckets (see architecture.md)
-- 3. Test authentication flow
