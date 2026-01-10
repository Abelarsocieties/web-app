# Abelar Project

Content submission and management platform built with SvelteKit, TypeScript, Tailwind CSS, shadcn-svelte, and Supabase.

## Tech Stack

- **SvelteKit** (TypeScript) - Framework
- **Tailwind CSS** - Styling
- **shadcn-svelte** - Component library
- **Supabase** - Auth + Postgres + Storage

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
PUBLIC_SUPABASE_URL=your_supabase_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── lib/
│   ├── components/     # Shared layout components (Header, Footer)
│   ├── ui/            # Reusable UI primitives (Button, Card, etc.)
│   ├── supabase/      # Supabase client setup
│   └── utils.ts       # Utility functions
├── routes/            # SvelteKit routes
│   ├── (public)/      # Public pages
│   ├── auth/          # Auth pages
│   ├── app/           # User app pages (protected)
│   └── admin/         # Admin pages (protected)
└── app.css            # Global styles
```

## Database Setup

See `architecture.md` for the complete database schema. Run the SQL in your Supabase SQL editor to create tables and RLS policies.

## Development Guidelines

1. **Architecture**: Always update `/architecture.md` when adding routes/tables/policies
2. **Components**: Create reusable UI primitives in `/src/lib/ui/` - no duplicate code
3. **Mobile-first**: Keep all layouts responsive
4. **SSR**: Use SvelteKit SSR for public pages, server actions for forms
5. **Routes**: Do NOT invent new pages outside the route list in `architecture.md`

## Available Routes

### Public
- `/` - Home
- `/works` - Browse works
- `/programs` - Programs
- `/about` - About
- `/support` - Support

### Auth
- `/auth/sign-in` - Sign in
- `/auth/sign-up` - Sign up
- `/auth/otp` - OTP verification
- `/auth/forgot` - Forgot password
- `/auth/reset` - Reset password

### User App (Protected)
- `/app/home` - Dashboard
- `/app/profile` - Profile
- `/app/submitted` - Submitted works
- `/app/liked` - Liked works
- `/app/drafted` - Draft works
- `/app/submit` - Submit work

### Admin (Protected - Admin/Editor role)
- `/admin/dashboard` - Admin dashboard
- `/admin/home` - Admin home
- `/admin/works` - Manage works
- `/admin/submissions` - Review submissions
- `/admin/programs` - Manage programs
- `/admin/admins` - Manage admins
- `/admin/settings` - Admin settings

## Building for Production

```bash
npm run build
npm run preview
```

## Documentation

- `/architecture.md` - Architecture, routes, data model, RBAC
- `/docs/ui/components.md` - Component inventory
- `/docs/ui/pages/README.md` - Page route mapping
