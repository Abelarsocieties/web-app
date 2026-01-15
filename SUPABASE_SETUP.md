# Supabase Setup Guide for Abelar Project

This guide will walk you through setting up Supabase for the Abelar Project, including database setup and email OTP configuration.

## 📋 Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- A new Supabase project created

## 🗄️ Step 1: Database Setup

1. **Open Supabase SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor** in the left sidebar
   - Click **New Query**

2. **Run the Setup Script**
   - Open the file `supabase-setup.sql` in this project
   - Copy the entire contents
   - Paste it into the SQL Editor
   - Click **Run** (or press `Cmd/Ctrl + Enter`)

3. **Verify Tables Created**
   - Go to **Table Editor** in the left sidebar
   - You should see these tables:
     - `profiles`
     - `works`
     - `work_images`
     - `likes`
     - `programs`
     - `submissions`
     - `comments`

## 📧 Step 2: Email OTP Setup

### Option A: Using Supabase Email Templates (Recommended for Development)

1. **Enable Email OTP**
   - Go to **Authentication** → **Providers** in your Supabase dashboard
   - Find **Email** provider and make sure it's enabled
   - Under **Email Auth**, you'll see OTP settings

2. **Configure OTP Settings**
   - Go to **Authentication** → **URL Configuration**
   - Set **Site URL** to: `http://localhost:5173` (for development)
   - Set **Redirect URLs** to include:
     - `http://localhost:5173/**`
     - `http://localhost:5173/auth/callback`
     - Your production URL when ready

3. **Email Templates (Optional)**
   - Go to **Authentication** → **Email Templates**
   - Customize the **Magic Link** template (this is used for OTP)
   - You can customize the subject and body

### Option B: Using Custom SMTP (Recommended for Production)

1. **Set up SMTP Provider**
   - Go to **Project Settings** → **Auth** → **SMTP Settings**
   - Enable **Enable Custom SMTP**
   - Enter your SMTP credentials:
     - **Host**: Your SMTP server (e.g., `smtp.gmail.com`)
     - **Port**: Usually `587` for TLS or `465` for SSL
     - **Username**: Your email address
     - **Password**: Your email password or app password
     - **Sender email**: The email address that will send OTPs
     - **Sender name**: Display name (e.g., "Abelar")

2. **Test SMTP Configuration**
   - Click **Send test email** to verify your setup

## 🔐 Step 3: Authentication Configuration

1. **Disable Email Confirmation (Optional - for testing)**
   - Go to **Authentication** → **Settings**
   - Under **User Management**, toggle off **Enable email confirmations**
   - ⚠️ **Note**: Only disable this for development/testing. Re-enable for production!

2. **Configure OTP/Magic Link**
   - Go to **Authentication** → **Providers** → **Email**
   - Under **Email Auth**, you can configure:
     - **Enable email signup**: ON
     - **Enable email login**: ON
     - **Enable email OTP**: ON (this enables magic link/OTP)

3. **OTP Expiration**
   - Set **OTP expiry** to your preferred time (default is 3600 seconds = 1 hour)
   - This determines how long the OTP code is valid

## 📝 Step 4: Update Your Code for OTP

The OTP page (`/auth/otp`) needs to be updated to actually verify OTP codes. Here's what needs to be done:

### Current Implementation
The current OTP page has a placeholder that just redirects. You'll need to implement actual OTP verification.

### How Email OTP Works in Supabase

Supabase uses **Magic Links** by default, which are email links that automatically sign users in. However, you can also use **OTP codes**:

1. **Request OTP**:
```typescript
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    shouldCreateUser: true, // Create user if doesn't exist
  }
});
```

2. **Verify OTP**:
```typescript
const { data, error } = await supabase.auth.verifyOtp({
  email: 'user@example.com',
  token: '123456', // The OTP code
  type: 'email' // or 'signup', 'recovery', etc.
});
```

## 🎯 Step 5: Storage Buckets Setup

1. **Go to Storage**
   - Navigate to **Storage** in your Supabase dashboard
   - Click **New bucket**

2. **Create Buckets**
   Create these three buckets:

   **Bucket 1: `avatars`**
   - Name: `avatars`
   - Public: ✅ Yes
   - File size limit: 5 MB
   - Allowed MIME types: `image/*`

   **Bucket 2: `work-images`**
   - Name: `work-images`
   - Public: ✅ Yes
   - File size limit: 10 MB
   - Allowed MIME types: `image/*`

   **Bucket 3: `submission-files`**
   - Name: `submission-files`
   - Public: ❌ No (Private)
   - File size limit: 50 MB
   - Allowed MIME types: `application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document`

3. **Set Up Storage Policies** (Optional - for fine-grained control)
   - Click on each bucket → **Policies**
   - Add policies as needed (RLS is enabled by default)

## 🔑 Step 6: Get Your API Keys

1. **Go to Project Settings**
   - Click the gear icon ⚙️ in the left sidebar
   - Go to **API** section

2. **Copy Your Keys**
   - **Project URL** → Use for `PUBLIC_SUPABASE_URL`
   - **anon public** key → Use for `PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → Use for `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

3. **Add to `.env` File**
   ```env
   PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

## ✅ Verification Checklist

- [ ] Database tables created successfully
- [ ] RLS policies enabled
- [ ] Email provider enabled
- [ ] OTP/Magic Link enabled
- [ ] SMTP configured (for production)
- [ ] Storage buckets created
- [ ] API keys added to `.env`
- [ ] Test signup/login flow

## 🐛 Troubleshooting

### OTP Not Sending?
- Check **Authentication** → **Settings** → **SMTP Settings**
- Verify your email templates are configured
- Check spam folder
- For development, use Supabase's built-in email (limited to 3 emails/hour)

### Database Errors?
- Make sure you ran the entire `supabase-setup.sql` script
- Check that RLS is enabled on all tables
- Verify foreign key relationships are correct

### Storage Upload Issues?
- Verify bucket names match exactly
- Check bucket policies allow uploads
- Ensure file size is within limits

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🚀 Next Steps

After completing this setup:
1. Test the authentication flow (`/auth/sign-up`, `/auth/sign-in`)
2. Test OTP verification (`/auth/otp`)
3. Test file uploads to storage buckets
4. Create your first admin user (manually update `profiles` table to set `role = 'admin'`)

---

**Need Help?** Check the `architecture.md` file for detailed schema information and RLS policies.
