# Data Integrations

## Supabase
- **Purpose**: Chat message storage and user authentication
- **Tables**:
  - `messages`: Stores chat history
  - `users`: User authentication (if implemented)
- **Policies**: Row-level security enabled
- **Real-time Subscriptions**: Used for live chat updates

## OpenAI API
- **Endpoint**: `https://api.openai.com/v1/chat/completions`
- **Model**: GPT-4
- **Rate Limiting**: Implemented
- **Caching**: Responses are cached using React Query

## Environment Variables
```
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Data Flow
1. User sends message
2. Message is saved to Supabase
3. OpenAI API is called
4. Response is saved to Supabase
5. UI updates in real-time
