# Authentication System

**Current state:** No auth flow implemented yet on front-end. Supabase client is initialised, so:

1. **Anonymous** browsing is default.
2. **Planned** – Supabase Auth (email/password or OAuth) once project requires user accounts.

## Recommended Flow (future)
1. Sign-up with magic link (Supabase `email` provider).
2. Store JWT in `supabase.auth`; react-query hooks for session state.
3. Protect rows via Row-Level Security (RLS) with `auth.uid()`.
4. Role-based UI guards (Admin vs Visitor) via context provider.

---
*TODO: revisit after schema creation.*
