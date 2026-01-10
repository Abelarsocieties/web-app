# Page Screenshots Mapping

This document maps Figma screenshots to SvelteKit routes.

## Public Pages

| Figma Screen | Route | File Location |
|-------------|-------|---------------|
| Home | `/` | `/src/routes/+page.svelte` |
| Works Listing | `/works` | `/src/routes/works/+page.svelte` |
| Programs | `/programs` | `/src/routes/programs/+page.svelte` |
| About | `/about` | `/src/routes/about/+page.svelte` |
| Support | `/support` | `/src/routes/support/+page.svelte` |

## Auth Pages

| Figma Screen | Route | File Location |
|-------------|-------|---------------|
| Sign In | `/auth/sign-in` | `/src/routes/auth/sign-in/+page.svelte` |
| Sign Up | `/auth/sign-up` | `/src/routes/auth/sign-up/+page.svelte` |
| OTP Verify | `/auth/otp` | `/src/routes/auth/otp/+page.svelte` |
| Forgot Password | `/auth/forgot` | `/src/routes/auth/forgot/+page.svelte` |
| Reset Password | `/auth/reset` | `/src/routes/auth/reset/+page.svelte` |

## User App Pages

| Figma Screen | Route | File Location |
|-------------|-------|---------------|
| User Dashboard | `/app/home` | `/src/routes/app/home/+page.svelte` |
| User Profile | `/app/profile` | `/src/routes/app/profile/+page.svelte` |
| Submitted Works | `/app/submitted` | `/src/routes/app/submitted/+page.svelte` |
| Liked Works | `/app/liked` | `/src/routes/app/liked/+page.svelte` |
| Draft Works | `/app/drafted` | `/src/routes/app/drafted/+page.svelte` |
| Submit Work | `/app/submit` | `/src/routes/app/submit/+page.svelte` |

## Admin Pages

| Figma Screen | Route | File Location |
|-------------|-------|---------------|
| Admin Dashboard | `/admin/dashboard` | `/src/routes/admin/dashboard/+page.svelte` |
| Admin Home | `/admin/home` | `/src/routes/admin/home/+page.svelte` |
| Manage Works | `/admin/works` | `/src/routes/admin/works/+page.svelte` |
| Review Submissions | `/admin/submissions` | `/src/routes/admin/submissions/+page.svelte` |
| Manage Programs | `/admin/programs` | `/src/routes/admin/programs/+page.svelte` |
| Manage Admins | `/admin/admins` | `/src/routes/admin/admins/+page.svelte` |
| Admin Settings | `/admin/settings` | `/src/routes/admin/settings/+page.svelte` |

## Notes

- All pages should match Figma designs
- Use placeholder content initially, replace with real data as features are built
- Maintain responsive mobile-first layouts

