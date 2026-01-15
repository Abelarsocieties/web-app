# Security Setup Guide - Abelar Project

This guide explains how to secure your Supabase database to prevent unauthorized access and ensure all writes go through authenticated Edge Functions.

## 🔒 Security Architecture

### Current Setup (Secure)
1. **RLS Enabled** - Row Level Security is enabled on all tables
2. **No Policies** - No RLS policies = all direct client access is BLOCKED
3. **Service Role Only** - Only service role key can access DB directly
4. **Edge Functions** - All writes go through authenticated Edge Functions
5. **Backend Decision Making** - Edge Functions validate and authorize before writing

### Why This Is Secure
- ✅ Frontend console cannot write to DB (RLS blocks it)
- ✅ Postman cannot write to DB (RLS blocks it)
- ✅ Random API calls cannot write to DB (RLS blocks it)
- ✅ Only Edge Functions with service role key can write
- ✅ Edge Functions authenticate users before processing

## 📋 Setup Steps

### Step 1: Run Secure SQL Setup

1. **Open Supabase SQL Editor**
2. **Run `supabase-security-setup.sql`**
   - This removes all existing RLS policies
   - Enables RLS on all tables (blocks all access)
   - Creates secure functions if needed

### Step 2: Deploy Edge Functions

Edge Functions are serverless functions that run on Supabase's edge network. They have access to the service role key and can bypass RLS.

#### Install Supabase CLI (if not already installed)

```bash
npm install -g supabase
```

#### Login to Supabase

```bash
supabase login
```

#### Link Your Project

```bash
supabase link --project-ref your-project-ref
```

#### Deploy Functions

```bash
# Deploy contact message function
supabase functions deploy contact-message

# Deploy create work function
supabase functions deploy create-work
```

### Step 3: Set Environment Variables

Edge Functions need access to your Supabase credentials:

```bash
# Set secrets for Edge Functions
supabase secrets set SUPABASE_URL=https://your-project.supabase.co
supabase secrets set SUPABASE_ANON_KEY=your-anon-key
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Step 4: Update Frontend Code

Replace direct Supabase client calls with Edge Function calls.

#### Before (Insecure - Direct DB Access)
```typescript
// ❌ DON'T DO THIS - Direct client write
const { error } = await supabase
  .from('contact_messages')
  .insert([{ first_name, email, message }]);
```

#### After (Secure - Edge Function)
```typescript
// ✅ DO THIS - Edge Function call
const { data, error } = await fetch(
  `${SUPABASE_URL}/functions/v1/contact-message`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`, // Or user token if authenticated
    },
    body: JSON.stringify({ first_name, email, message }),
  }
);
```

## 🛡️ Edge Functions Available

### 1. Contact Message (`contact-message`)
- **Purpose**: Handle contact form submissions
- **Auth**: Optional (can accept anonymous submissions)
- **Method**: POST
- **Body**: `{ first_name, email, message }`

### 2. Create Work (`create-work`)
- **Purpose**: Create new work submissions
- **Auth**: Required (user must be authenticated)
- **Method**: POST
- **Headers**: `Authorization: Bearer <user-token>`
- **Body**: `{ title, slug, content_json, cover_image_url, category, tags, status }`

## 📝 Updating Your Code

### Example: Contact Form

Update `src/routes/support/+page.svelte`:

```typescript
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';

async function handleSubmit() {
  // ... validation code ...
  
  try {
    const response = await fetch(
      `${PUBLIC_SUPABASE_URL}/functions/v1/contact-message`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ first_name, email, message }),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send message');
    }
    
    // Success
    success = true;
    // ... rest of success handling ...
  } catch (err) {
    error = 'Failed to send message. Please try again later.';
  }
}
```

### Example: Creating a Work

```typescript
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '$lib/supabase/client';

async function createWork(workData) {
  const supabase = createClient();
  
  // Get user session token
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Not authenticated');
  }

  const response = await fetch(
    `${PUBLIC_SUPABASE_URL}/functions/v1/create-work`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(workData),
    }
  );

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(result.error || 'Failed to create work');
  }
  
  return result.work;
}
```

## 🔍 Testing Security

### Test 1: Direct Client Write (Should Fail)
```typescript
// This should FAIL - RLS blocks it
const supabase = createClient();
const { error } = await supabase
  .from('contact_messages')
  .insert([{ first_name: 'Test', email: 'test@test.com', message: 'Test' }]);
// Error: new row violates row-level security policy
```

### Test 2: Edge Function Write (Should Succeed)
```typescript
// This should SUCCEED - Edge Function bypasses RLS
const response = await fetch(`${SUPABASE_URL}/functions/v1/contact-message`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ANON_KEY}`,
  },
  body: JSON.stringify({ first_name: 'Test', email: 'test@test.com', message: 'Test' }),
});
// Success: Message saved
```

## 🚨 Important Security Notes

1. **Never expose service role key** - Only use in Edge Functions (server-side)
2. **Always validate input** - Edge Functions should validate all inputs
3. **Authenticate users** - Check user tokens before processing sensitive operations
4. **Rate limiting** - Consider adding rate limiting to Edge Functions
5. **Logging** - Log all write operations for audit trail

## 📚 Additional Edge Functions Needed

You'll need to create Edge Functions for:
- ✅ Contact messages (created)
- ✅ Create work (created)
- ⬜ Update work
- ⬜ Delete work
- ⬜ Like/unlike work
- ⬜ Create comment
- ⬜ Update comment
- ⬜ Delete comment
- ⬜ Submit work for review
- ⬜ Admin operations

## 🔗 Resources

- [Supabase Edge Functions Docs](https://supabase.com/docs/guides/functions)
- [RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Service Role Key Security](https://supabase.com/docs/guides/auth/row-level-security#service-role-key)

---

**Remember**: With RLS enabled and no policies, your database is locked down. Only Edge Functions with service role key can write. This is the most secure configuration! 🔒
