# Dashboard and Permissions Setup Guide

## ✅ Completed Features

### 1. Dynamic Charts with Backend Data
- **Dashboard Stats**: Fetches real data from Supabase (visitors, authors, publications, pending works)
- **Publications Chart**: Line chart showing publications over the last 12 months
- **Traffic Chart**: Bar chart showing website traffic (based on likes) over the last 12 months
- **Submissions Table**: Displays real submissions from the database

### 2. Admin Comment Deletion
- Admins can delete any comment
- Users can delete their own comments
- RLS policies already support this (see `supabase-setup.sql` lines 346-351)

### 3. User Content Management Permissions
- Users can create and manage their own programs/opportunities
- Users can manage their own works (create, update, delete, publish)
- Admins can manage all content

## 📋 Setup Steps

### Step 1: Update Database Schema

Run this SQL in Supabase Dashboard → SQL Editor to add `created_by` column to programs table:

```sql
-- Add created_by column to programs table
ALTER TABLE programs ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- Update existing programs (set to first admin or leave null)
UPDATE programs SET created_by = (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1) WHERE created_by IS NULL;
```

### Step 2: Update RLS Policies

Run the entire `UPDATE_USER_PERMISSIONS.sql` file in Supabase SQL Editor. This will:
- Allow users to create programs/opportunities
- Allow users to update/delete their own programs
- Ensure users can manage their own works
- Keep admin permissions for all content

### Step 3: Test the Dashboard

1. Log in as admin at `/admin/login`
2. Navigate to `/admin/dashboard`
3. You should see:
   - Real stats from your database
   - Dynamic charts with your data
   - Real submissions in the table

## 🔧 How It Works

### Dashboard Data Flow

1. **Server Loader** (`+page.server.ts`):
   - Uses `createAdminClient()` to bypass RLS
   - Fetches stats, submissions, and chart data
   - Processes data for charts (groups by month)

2. **Dashboard Component** (`+page.svelte`):
   - Receives data from server loader
   - Uses Chart.js for interactive charts
   - Displays real submissions in table

### Chart Data Processing

- **Publications Chart**: Groups published works by month
- **Traffic Chart**: Groups likes by month (scaled for visualization)
- Charts update when you change time filters (future enhancement)

### Permissions Model

```
Users can:
✅ Create programs/opportunities
✅ Update/delete their own programs
✅ Create/update/delete their own works
✅ Delete their own comments

Admins can:
✅ Do everything users can do
✅ Manage all programs/opportunities
✅ Manage all works
✅ Delete any comment
```

## 📝 Next Steps

1. **Add Comment Deletion UI**: Update the comments section in `/works/[slug]` to show delete buttons for admins
2. **Add Program Creation UI**: Create forms for users to add programs/opportunities
3. **Enhance Charts**: Add time filter functionality to fetch different date ranges
4. **Add Real-time Updates**: Use Supabase subscriptions for live dashboard updates

## 🐛 Troubleshooting

### Charts Not Showing Data
- Check browser console for errors
- Verify database has data (works, likes, etc.)
- Check server logs for query errors

### Permissions Not Working
- Verify RLS policies are updated (run `UPDATE_USER_PERMISSIONS.sql`)
- Check user role in `profiles` table
- Ensure `created_by` column exists in `programs` table

### Dashboard Stats Show Zero
- Database might be empty - add some test data
- Check if queries are returning data in server logs
- Verify admin client has access (service role key)

## 📚 Files Created/Modified

- ✅ `/src/routes/admin/dashboard/+page.server.ts` - Server-side data loader
- ✅ `/src/routes/admin/dashboard/+page.svelte` - Updated to use real data
- ✅ `/src/routes/admin/comments/+page.server.ts` - Comment management
- ✅ `/UPDATE_USER_PERMISSIONS.sql` - RLS policy updates
- ✅ `/DASHBOARD_AND_PERMISSIONS_SETUP.md` - This guide
