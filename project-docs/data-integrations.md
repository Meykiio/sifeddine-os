# Data Integrations

## Supabase
- **Purpose**: Chat message storage, user authentication, and real-time synchronization
- **Tables**:
  - `chat_messages`: Stores AI chat conversations
    - `id` (uuid, primary key)
    - `content` (text, message content)
    - `role` (text, 'user' or 'assistant')
    - `session_id` (text, groups messages by session)
    - `created_at` (timestamptz)
    - `updated_at` (timestamptz)
- **Policies**: Row-level security enabled with public access for portfolio visitors
- **Real-time Subscriptions**: Used for live chat updates and synchronization
- **Indexes**: Optimized for session_id, created_at, and role queries

## OpenAI API
- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Model**: GPT-4o-mini (optimized for cost and performance)
- **Rate Limiting**: Implemented in edge function
- **Caching**: Responses are cached using React Query
- **Integration**: Via Supabase Edge Functions for secure API key handling

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key (server-side only)
```

## Data Flow
1. User sends message in chat interface
2. Message is immediately saved to Supabase `chat_messages` table
3. OpenAI API is called via Supabase Edge Function
4. AI response is saved to Supabase
5. Real-time subscription updates UI instantly
6. Chat history persists across sessions

## Real-time Features
- **Live Chat Updates**: Messages appear instantly across all connected clients
- **Session Management**: Messages grouped by session for organization
- **Automatic Synchronization**: No manual refresh needed
- **Error Handling**: Graceful fallbacks for connection issues

## Database Schema
```sql
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant')),
  session_id text NOT NULL DEFAULT gen_random_uuid()::text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## Security Features
- Row Level Security (RLS) enabled
- Public access policies for portfolio site
- Session-based data isolation
- Secure API key handling via edge functions
- Input validation and sanitization

## Performance Optimizations
- Database indexes for efficient queries
- Real-time subscriptions for instant updates
- Optimized message loading (last 10 messages for context)
- Efficient session management