# Bugs & Issues Log

| ID | Severity | File | Symptom | Reproduction Steps | Tags |
|----|----------|------|---------|--------------------|------|
| 1 | 🟠 Medium | `supabase/functions/chat-ai/index.ts` | Edge function returns `500 OpenAI API error: 401` when `OPENAI_API_KEY` env missing. | Call the function without setting env on Supabase local dev. | #api #auth |
| 2 | 🟢 Low | `TerminalInput.tsx` | Pressing **Up Arrow** after clearing history throws `undefined` error. | Type a command, clear output, then press ↑. | #ui #core-logic |

> Add new rows as you verify more issues. Severity legend: 🔴 Critical / 🟠 Medium / 🟢 Low.
