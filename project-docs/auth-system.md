# Authentication System

## Current Implementation
- Basic authentication flow using Supabase Auth
- Session management with JWT
- Protected routes for admin functionality
- **NEW**: Chat message storage with session-based organization

## User Roles
- **Guest**: Can use basic commands and chat (messages stored by session)
- **Admin**: Can access admin commands and settings

## Authentication Flow
1. User enters credentials
2. Request sent to Supabase Auth
3. JWT token received and stored in localStorage
4. Token included in subsequent API requests
5. Server verifies token on protected routes

## Chat Message Storage
- Messages are stored with session IDs for organization
- Public access policies allow portfolio visitors to use chat
- Real-time synchronization for live chat updates
- Session-based message persistence

## Security Considerations
- JWT tokens are stored securely
- Password hashing handled by Supabase
- Rate limiting on authentication endpoints
- CSRF protection enabled
- Row Level Security (RLS) on chat messages table

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key (for edge functions)
```

## Database Tables
- `chat_messages`: Stores AI chat conversations with session management

## Future Enhancements
- Add social login (Google, GitHub)
- Implement 2FA
- Add session management
- Implement refresh tokens
- User-specific chat history (when authentication is added)