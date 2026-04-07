-- ============================================
-- Create Profile for Specific User ID
-- ============================================
-- Use this if you know the user ID from the logs
-- User ID: f45cce0e-0797-4c2b-9528-22957be90930
-- Email: support@icwebpro.net
-- ============================================

-- Step 1: Verify the user exists
SELECT 
  id,
  email,
  created_at
FROM auth.users 
WHERE email = 'support@icwebpro.net'
   OR id = 'f45cce0e-0797-4c2b-9528-22957be90930';

-- Step 2: Check if profile already exists
SELECT 
  p.id,
  p.name,
  p.role,
  u.email
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.id = 'f45cce0e-0797-4c2b-9528-22957be90930'
   OR u.email = 'support@icwebpro.net';

-- Step 3: Create/Update the profile with the EXACT user ID
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

-- Step 4: Verify it was created
SELECT 
  p.id,
  u.email,
  p.name,
  p.role,
  p.created_at,
  p.updated_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.id = 'f45cce0e-0797-4c2b-9528-22957be90930';

-- If you want to create it using email lookup instead:
-- INSERT INTO profiles (id, name, role)
-- VALUES (
--   (SELECT id FROM auth.users WHERE email = 'support@icwebpro.net'),
--   'Admin User',
--   'admin'
-- )
-- ON CONFLICT (id) 
-- DO UPDATE SET role = 'admin';
