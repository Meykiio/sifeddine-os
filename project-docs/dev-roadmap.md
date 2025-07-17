# Development Roadmap

## 🛠 Fix (0–2 weeks)
1. Handle missing `OPENAI_API_KEY` gracefully in UI (show toast).
2. Prevent `undefined` history error in `TerminalInput`.
3. Add scroll-to-bottom behaviour in terminal output.

## 🧹 Improve (2–4 weeks)
1. Abstract command parsing into its own hook (e.g., `useCommandRouter`).
2. Add React Error Boundary wrapper.
3. Introduce ESLint CI + Prettier hook.
4. Add Vitest + React Testing Library with sample tests.

## 🚀 Scale (1–2 months)
1. Design Supabase schema for user accounts & analytics.
2. Use RLS to protect private tables.
3. Deploy additional Edge Functions (e.g., email sending, project stats).
4. Set up GitHub Actions to preview deploy on PRs.
5. Consider migrating to Vercel Postgres if multi-region needed.
