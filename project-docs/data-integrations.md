# Data Integrations

## Supabase
- **Project URL / anon key** read from `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- **Additional secrets configured:** `OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_DB_URL` (see Supabase dashboard screenshot).
- **Tables to create (planned):** `users`, `visits`, `commands`, `chat_messages` (store chat history per session).
- Migrations folder currently empty ➜ will be populated via Supabase CLI in Sprint 2.
- Current function: `chat-ai` (Edge Function) – proxies to OpenAI.
- All secrets must exist both in the Supabase Project and locally via `.env` for development tests.

## External APIs
- OpenAI Chat Completions (model `gpt-4o-mini`).
  - Called server-side from Edge Function.
  - Temperature `0.7`, `max_tokens` 500.

---
*TODO: run `supabase db push` after migrations and update this doc with table schemas & bucket details.*
