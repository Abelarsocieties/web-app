-- Create profile for admin user
-- Replace 'support@icwebpro.net' with your admin email

-- First, get the user ID
-- Then insert/update the profile with admin role

-- Option 1: Insert if doesn't exist, update if exists
INSERT INTO profiles (id, name, role)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'support@icwebpro.net'),
  'Admin User',
  'admin'
)
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';

-- Option 2: Just update if profile exists
UPDATE profiles
SET role = 'admin'
WHERE id = (SELECT id FROM auth.users WHERE email = 'support@icwebpro.net');

-- Verify the profile was created/updated
SELECT 
  p.id,
  u.email,
  p.name,
  p.role,
  p.created_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.email = 'support@icwebpro.net';
