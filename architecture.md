# Abelar Project Architecture

**Last Updated:** 2024

## Overview

Abelar Project is a content submission and management platform built with SvelteKit, TypeScript, Tailwind CSS, shadcn-svelte, and Supabase.

## Routes

### Public Routes
- `/` - Home page
- `/works` - Browse published works (Articles)
- `/proposals` - Browse proposals
- `/research-papers` - Browse research papers
- `/programs` - View programs
- `/opportunities` - View opportunities
- `/support` - Support/contact page
- `/writing-guide` - Writing guide page
- `/terms` - Terms of service
- `/privacy` - Privacy policy

### Auth Routes
- `/auth/sign-in` - Sign in page
- `/auth/sign-up` - Sign up page
- `/auth/otp` - OTP verification page
- `/auth/forgot` - Forgot password page
- `/auth/reset` - Password reset page

### User App Routes (Protected - requires session)
- `/app/home` - User dashboard/home
- `/app/profile` - User profile page
- `/app/submitted` - User's submitted works
- `/app/liked` - User's liked works
- `/app/drafted` - User's draft works
- `/app/submit` - Submit new work (text editor + file upload)

### Admin Routes (Protected - requires admin/editor role)
- `/admin/dashboard` - Admin dashboard
- `/admin/home` - Admin home
- `/admin/works` - Manage works
- `/admin/submissions` - Review submissions
- `/admin/programs` - Manage programs
- `/admin/admins` - Manage admin users
- `/admin/settings` - Admin settings (profile/security/notifications)

## Data Model

### Tables

#### profiles
Stores user profile information and roles.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'editor', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### works
Stores user-submitted works/content.

```sql
CREATE TABLE works (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'published', 'rejected')),
  cover_image_url TEXT,
  content_json JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);
```

#### work_images
Stores additional images for works.

```sql
CREATE TABLE work_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### likes
Stores user likes for works.

```sql
CREATE TABLE likes (
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, work_id)
);
```

#### programs
Stores program/category information.

```sql
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### submissions
Stores submission review information.

```sql
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  work_id UUID NOT NULL REFERENCES works(id) ON DELETE CASCADE,
  submitted_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  decision TEXT CHECK (decision IN ('approved', 'rejected', 'pending')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);
```

## RBAC (Role-Based Access Control)

### Roles
- **user**: Default role for authenticated users. Can create works, submit, like.
- **editor**: Can review and manage submissions, edit works.
- **admin**: Full access including user management, settings, all CRUD operations.

### Route Protection
- `/app/*` routes require authenticated session
- `/admin/*` routes require role in ('admin', 'editor')

## Storage Buckets

### avatars (public)
- Path: `avatars/{user_id}/{filename}`
- Public read access
- Users can upload their own avatar
- Admins can manage all avatars

### work-images (public)
- Path: `work-images/{work_id}/{filename}`
- Public read access
- Users can upload images for their own works
- Admins/editors can manage all work images

### submission-files (private)
- Path: `submission-files/{work_id}/{filename}`
- Private access
- Only the submitter and admins/editors can access

## Environment Variables

### Client-side (PUBLIC_*)
- `PUBLIC_SUPABASE_URL` - Supabase project URL
- `PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Server-side only
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (never exposed to client)

## RLS Policies

### profiles
- **SELECT**: Users can read their own profile and public profiles
- **UPDATE**: Users can update their own profile
- **INSERT**: Auto-created on user signup via trigger

### works
- **SELECT**: 
  - Published works are public
  - Users can see their own works (all statuses)
  - Admins/editors can see all works
- **INSERT**: Authenticated users can create works
- **UPDATE**: 
  - Users can update their own works (if draft/submitted)
  - Admins/editors can update any work
- **DELETE**: 
  - Users can delete their own draft works
  - Admins/editors can delete any work

### work_images
- **SELECT**: Same visibility as parent work
- **INSERT**: Users can add images to their own works
- **UPDATE/DELETE**: Users can manage images for their own works, admins/editors can manage all

### likes
- **SELECT**: Public (anyone can see likes)
- **INSERT**: Authenticated users can like works
- **DELETE**: Users can unlike their own likes

### programs
- **SELECT**: Public (active programs visible to all)
- **INSERT/UPDATE/DELETE**: Admin/editor only

### submissions
- **SELECT**: 
  - Users can see their own submissions
  - Admins/editors can see all submissions
- **INSERT**: Auto-created when work status changes to 'submitted'
- **UPDATE**: Admins/editors can update submissions (review decisions)

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_works_status ON works(status);
CREATE INDEX idx_works_author ON works(author_id);
CREATE INDEX idx_works_slug ON works(slug);
CREATE INDEX idx_likes_work ON likes(work_id);
CREATE INDEX idx_likes_user ON likes(user_id);
CREATE INDEX idx_work_images_work ON work_images(work_id);
CREATE INDEX idx_submissions_work ON submissions(work_id);
CREATE INDEX idx_submissions_submitted_by ON submissions(submitted_by);
CREATE INDEX idx_profiles_role ON profiles(role);
```

