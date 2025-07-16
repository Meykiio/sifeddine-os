# Authentication System

## Current Implementation
- Basic authentication flow using Supabase Auth
- Session management with JWT
- Protected routes for admin functionality

## User Roles
- **Guest**: Can use basic commands and chat
- **Admin**: Can access admin commands and settings

## Authentication Flow
1. User enters credentials
2. Request sent to Supabase Auth
3. JWT token received and stored in localStorage
4. Token included in subsequent API requests
5. Server verifies token on protected routes

## Security Considerations
- JWT tokens are stored securely
- Password hashing handled by Supabase
- Rate limiting on authentication endpoints
- CSRF protection enabled

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Future Enhancements
- Add social login (Google, GitHub)
- Implement 2FA
- Add session management
- Implement refresh tokens
