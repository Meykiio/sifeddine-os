# Project Overview

**Project Name:** Sifeddine OS (Terminal-style personal website)

**Stack**
- Front-end: React 18 + TypeScript, Vite bundler
- UI Kit: [shadcn/ui](https://ui.shadcn.com) on top of Radix UI & Tailwind CSS
- State / Data: @tanstack/react-query
- Back-end: Supabase (PostgreSQL + Edge Functions)
- AI Service: `chat-ai` Edge function calling OpenAI Chat Completions

## What the project does
An interactive, one-page, terminal-inspired website where visitors type commands (e.g. `home`, `projects`, `contact`) and receive instant in-page output. A sarcastic assistant (B.R.O.) can also be summoned for chat.

Major user flows:
1. **Command-line navigation** – Text input parses commands and renders relevant panels.
2. **Chat mode** – On `ai` / `help ai` the UI switches to a threaded chat that proxies requests to the `chat-ai` Supabase Edge Function, which in turn calls OpenAI.

## Key Features
- Terminal UI with input & scroll-back output (components `Terminal*`, `ChatMode`).
- Rich component library (buttons, accordions, modals, etc.) in `src/components/ui`.
- Real-time Supabase client already initialised in `src/integrations` (→ room for DB features).
- Vite hot-reload + Tailwind JIT for instant DX.

## Architectural Highlights
- **Front-end routes** handled by `react-router-dom` (`src/pages/*`).
- **Edge Function** `supabase/functions/chat-ai/index.ts` encapsulates all server logic – CORS, env, OpenAI streaming.
- **Environment isolation**: `.env.example` documents required keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `OPENAI_API_KEY`).

## Use cases
- Personal branding site
- Showcase projects with playful CLI UX
- Experiment ground for AI interactions and Supabase features

---
*Last updated: 2025-07-17*
