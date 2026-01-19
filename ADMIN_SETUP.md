# Admin Setup Guide

## How Admin Authentication Works

Admin authentication in Abelar works through the `profiles` table in Supabase. When a user signs up, they get a default role of `'user'`. To make someone an admin, you need to update their role in the `profiles` table to `'admin'`.

## Setting Up Your First Admin User

### Option 1: Using Supabase Dashboard (Recommended)

1. **Sign up a user account** (use `/auth/sign-up` on your site)
   - Use the email and password you want for your admin account
   - Complete the sign-up process

2. **Go to Supabase Dashboard**
   - Navigate to your project
   - Go to **Table Editor** → **profiles**

3. **Find your user**
   - Look for the row with the email you just signed up with
   - Or find the user by their `id` (matches `auth.users.id`)

4. **Update the role**
   - Click on the `role` field for that user
   - Change it from `'user'` to `'admin'`
   - Save the changes

5. **Test admin login**
   - Go to `/admin/login` on your site
   - Sign in with the email and password you used
   - You should be redirected to `/admin/dashboard`

### Option 2: Using SQL Editor (For Bulk Updates)

1. **Sign up your admin account** first (use `/auth/sign-up`)

2. **Go to Supabase Dashboard** → **SQL Editor**

3. **Run this SQL query** (replace `'admin@example.com'` with your admin email):

```sql
-- Update a specific user to admin role
UPDATE profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'admin@example.com'
);
```

4. **Verify the update**:
```sql
-- Check if the update worked
SELECT id, email, role 
FROM profiles
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'admin@example.com'
);
```

### Option 3: Create Admin During Sign-Up (Advanced)

If you want to automatically create an admin during sign-up, you can modify the sign-up process to check for a specific email pattern or use a secret code. However, **this is not recommended** for production as it's less secure.

## Admin Login Flow

1. User goes to `/admin/login`
2. Enters email and password
3. System checks:
   - ✅ Valid Supabase auth credentials
   - ✅ User exists in `profiles` table
   - ✅ User's `role` is `'admin'` or `'editor'`
4. If all checks pass → Redirect to `/admin/dashboard`
5. If not admin → Show error and sign out

## Roles Available

- **`'user'`** - Regular user (default)
- **`'editor'`** - Can access admin routes but limited permissions
- **`'admin'`** - Full admin access

## Security Best Practices

1. **Never hardcode admin credentials** in your code
2. **Use strong passwords** for admin accounts
3. **Limit admin accounts** - only create admins when necessary
4. **Use Supabase RLS policies** to protect admin routes (already configured)
5. **Monitor admin activity** - consider adding audit logs

## Troubleshooting

### "You do not have admin access" error
- Check that the user exists in the `profiles` table
- Verify the `role` field is set to `'admin'` (not `'Admin'` or `'ADMIN'` - it's case-sensitive)
- Make sure you're signing in with the correct email

### Admin login redirects to user dashboard
- Check `/admin/+layout.server.ts` - it verifies the role
- Ensure the `profiles` table has the correct role set
- Clear browser cookies and try again

### Profile doesn't exist after sign-up
- The profile should be created automatically via a database trigger
- If missing, you can create it manually:
```sql
INSERT INTO profiles (id, name, role)
VALUES (
  'user-uuid-here',
  'Admin Name',
  'admin'
);
```

## Creating Multiple Admins

To create additional admins, simply:
1. Have them sign up normally
2. Update their `role` in the `profiles` table to `'admin'`
3. They can now log in at `/admin/login`

---

**Note:** There is no "default admin" account created automatically. You must manually set up your first admin user using one of the methods above.
