# Quick Security Setup Guide

## 🚀 Quick Start (3 Steps)

### Step 1: Run Security SQL
```sql
-- In Supabase SQL Editor, run:
-- supabase-security-setup.sql
```
This enables RLS with NO policies = **DB is locked down** 🔒

### Step 2: Deploy Edge Functions
```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref YOUR_PROJECT_REF

# Set secrets
supabase secrets set SUPABASE_URL=https://your-project.supabase.co
supabase secrets set SUPABASE_ANON_KEY=your-anon-key
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Deploy functions
supabase functions deploy contact-message
supabase functions deploy create-work
```

### Step 3: Use Edge Functions in Code
```typescript
// ✅ DO THIS - Secure Edge Function call
import { submitContactMessage } from '$lib/supabase/edge-functions';

const { data, error } = await submitContactMessage({
  first_name: 'John',
  email: 'john@example.com',
  message: 'Hello'
});
```

```typescript
// ❌ DON'T DO THIS - Direct DB access (blocked by RLS)
import { createClient } from '$lib/supabase/client';

const supabase = createClient();
await supabase.from('contact_messages').insert([...]); // BLOCKED!
```

## 🔒 Security Model

```
Frontend → Edge Function → Service Role Key → Database
         (authenticates)   (bypasses RLS)
```

- **Frontend**: Can only call Edge Functions (no direct DB access)
- **Edge Function**: Authenticates user, validates input, uses service role
- **Service Role**: Only way to write to DB (bypasses RLS)
- **Database**: RLS enabled, no policies = locked down

## ✅ What's Protected

- ✅ Contact form submissions
- ✅ Work creation (coming soon)
- ✅ All future write operations

## 📝 Next Steps

1. Create more Edge Functions for other operations
2. Update all write operations to use Edge Functions
3. Test that direct client writes are blocked

See `SECURITY_SETUP.md` for detailed documentation.
