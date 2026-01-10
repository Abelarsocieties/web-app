# Environment Variables Setup

## Required Environment Variables

Add these to your `.env` file in the project root:

```env
# Supabase Configuration
# Get these from your Supabase project settings: https://app.supabase.com/project/_/settings/api

# Public variables (exposed to client)
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server-side only (never exposed to client)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## How to Get Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy the following:
   - **Project URL** → `PUBLIC_SUPABASE_URL`
   - **anon/public key** → `PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Example `.env` file

```env
PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTc5OTI5MywiZXhwIjoxOTYxMzc1MjkzfQ.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eHh4eHgiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQ1Nzk5MjkzLCJleHAiOjE5NjEzNzUyOTN9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Important Notes

- Never commit your `.env` file to git (it's already in `.gitignore`)
- The `PUBLIC_*` variables are exposed to the browser
- The `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed to the client
- After adding/updating `.env`, restart your dev server
