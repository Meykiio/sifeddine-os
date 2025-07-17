# Incomplete & Planned Features

> Scanned on 2025-07-17 – mark completed items ✅ when done.

| Area | Description | Files | Status |
| ---- | ----------- | ----- | ------ |
| Data Layer | Supabase schema missing. Need tables `users`, `visits`, `commands`, `chat_messages` + RLS policies. | `supabase/`, `src/integrations/supabase.ts` | ⚪ TODO |
| Command Parser | Command list is hard-coded; consider a registry pattern to make new commands pluggable. | `src/components/TerminalInput.tsx` | ⚪ TODO |
| Mobile Layout | No explicit mobile styles; verify responsiveness. | CSS/Tailwind | ⚪ TODO |
| Accessibility | No a11y audits run; ARIA roles missing in some custom components. | `src/components/ui/*` | ⚪ TODO |
| Unit Tests | No test setup present. Add Vitest or Jest + React Testing Library. | — | ⚪ TODO |
| Error Boundaries | React error boundaries not implemented. | `src/main.tsx` | ⚪ TODO |
