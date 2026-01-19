-- Verify the profile exists and check the user ID
-- Run this in Supabase SQL Editor to verify everything is correct

-- 1. Find the user by email
SELECT 
  id,
  email,
  created_at
FROM auth.users 
WHERE email = 'support@icwebpro.net';

-- 2. Check if profile exists for that user
SELECT 
  p.id,
  p.name,
  p.role,
  p.created_at,
  u.email
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'support@icwebpro.net';

-- 3. If profile doesn't exist, create it with the correct user ID
-- First, get the user ID from the query above, then run:
-- INSERT INTO profiles (id, name, role)
-- VALUES ('USER_ID_FROM_ABOVE', 'Admin User', 'admin');

-- 4. Or use this to create/update in one go:
INSERT INTO profiles (id, name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'support@icwebpro.net'),
  'Admin User',
  'admin'
)
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';

-- 5. Verify again
SELECT 
  p.id,
  u.email,
  p.name,
  p.role,
  p.created_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'support@icwebpro.net';
