# Sifeddine.xyz — Terminal OS Experience

A futuristic terminal interface with glassmorphism design, featuring interactive commands and AI chat integration.

## 🚀 Live Demo

**URL**: https://sifeddine-os.vercel.app/

> 💡 **Note**: Now fully responsive! Enjoy the complete experience on desktop, tablet, and mobile devices.

## ✨ Features

### Core Terminal Experience
- **Glassmorphic Terminal**: Pixel-perfect glass design with neon accents
- **Interactive Commands**: Navigate through Sifeddine's world with typed commands
- **Typewriter Effects**: Smooth text animations and blinking cursor
- **Tab Autocomplete**: Command suggestions and completion
- **Fully Responsive Design**: Optimized for all devices (320px to desktop)

### AI Chat System
- **AI Chat Mode**: ChatGPT-powered assistant integration (B.R.O.)
- **Mobile-Optimized Chat**: Touch-friendly interface for mobile devices

### Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices (320px+)
- **Touch-Friendly Interface**: Proper touch targets (44px minimum)
- **Responsive Typography**: Scaling text system across all devices
- **Optimized Scrolling**: Smooth scrolling experience on all platforms
- **Adaptive Backgrounds**: Optimized background handling for mobile

## 🎮 Available Commands

- `help` - Show all available commands
- `home` - Introduction and welcome message
- `about` - Learn about Sifeddine's philosophy and approach
- `projects` - Explore featured projects (Yuno, Receipto, Wishdrop)
- `lab` - Discover experimental playground projects
- `mindset` - Operating principles and methodology
- `contact` - Get in touch across various platforms
- `surprise` - Random mind-blowing programming/AI facts
- `help ai` - Switch to AI chat mode
- `clear` - Clear the terminal

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism
- **UI Components**: [Lovable](https://lovable.dev/) (shadcn/ui based)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Query

### Backend & Database
- **Database**: Supabase PostgreSQL
- **Real-time**: Supabase real-time subscriptions
- **AI Integration**: OpenAI GPT-4o-mini API via Supabase Edge Functions
- **Edge Functions**: Supabase Edge Functions for OpenAI API proxy
- **Authentication**: Supabase Auth (configured)

### Deployment
- **Hosting**: Vercel
- **CDN**: Vercel Edge Network
- **Environment**: Node.js runtime

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Meykiio/sifeddine-os
   cd sifeddine-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```



5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔧 Environment Setup

### Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. The chat system will automatically work with OpenAI API proxy via Edge Functions

**Note**: This project only uses Supabase Edge Functions for OpenAI API proxying. No database tables or RLS policies are required.

### OpenAI API Key Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your environment variables:
   
   **For local development:**
   ```bash
   # .env.local
   OPENAI_API_KEY=sk-your-key-here
   ```
   
   **For Vercel deployment:**
   ```bash
   # In Vercel dashboard > Settings > Environment Variables
   OPENAI_API_KEY=sk-your-key-here
   ```

3. The AI chat mode will automatically work with OpenAI API proxy via Supabase Edge Functions

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Using Lovable**
   - Click "Share" → "Publish" in the Lovable interface
   - Your site is instantly live with a custom URL

2. **Manual Deployment**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   
   # Set environment variables in Vercel dashboard:
   # - NEXT_PUBLIC_SUPABASE_URL
   # - NEXT_PUBLIC_SUPABASE_ANON_KEY  
   # - OPENAI_API_KEY
   ```

### Other Platforms

The project works on any static hosting platform:
- **Netlify**: `npm run build` → deploy `dist` folder
- **GitHub Pages**: Use GitHub Actions with build workflow
- **Railway/Render**: Connect GitHub repo and deploy

## 📱 Responsive Design

### Mobile Experience (320px+)
- Touch-optimized terminal interface
- Mobile-friendly chat experience
- Proper touch target sizes (44px minimum)
- Optimized scrolling and navigation
- Responsive typography scaling

### Tablet Experience (768px+)
- Balanced layout between mobile and desktop
- Touch-friendly interactions maintained
- Optimized spacing and sizing

### Desktop Experience (1024px+)
- Full desktop experience with all features
- Enhanced hover states and interactions
- Optimal use of screen real estate

## 🎨 Customization

### Modifying Commands

Edit `src/components/Terminal.tsx`:

```typescript
const commands: Record<string, string> = {
  "your-command": "Your response here",
  // Add more commands...
};
```

### Styling Changes

The design uses Tailwind CSS with custom glassmorphism effects:
- Main styles: `src/index.css`
- Component styles: Individual component files
- Colors: Defined in `tailwind.config.ts`
- Responsive breakpoints: 320px, 640px, 768px, 1024px

### AI Personality

Customize the AI assistant in `supabase/functions/chat-ai/index.ts`:

```typescript
const systemPrompt = `You are B.R.O., Sifeddine's AI assistant...`;
```



## 🔍 Project Structure

```
src/
├── components/
│   ├── Terminal.tsx        # Main terminal interface
│   ├── TerminalInput.tsx   # Command input handling
│   ├── TerminalOutput.tsx  # Response display
│   └── ChatMode.tsx        # AI chat interface
├── pages/
│   └── Index.tsx          # Main page with responsive background
├── integrations/
│   └── supabase/          # Edge Functions configuration
└── index.css             # Global styles and responsive design
```

## 🐛 Troubleshooting

### AI Chat Not Working
- Verify OpenAI API key is set correctly in environment variables
- Check browser console for API errors
- Ensure you have OpenAI credits available
- Verify Supabase connection is working

### Edge Function Issues
- Ensure Supabase project is set up correctly
- Check that environment variables are set properly
- Verify Edge Function deployment is successful

### Commands Not Responding
- Check console for JavaScript errors
- Verify command names in `Terminal.tsx`
- Refresh the page to reset state

### Mobile Issues
- Clear browser cache
- Ensure viewport meta tag is present
- Check if touch events are working properly
- Verify responsive CSS is loading

### Styling Issues
- Clear browser cache
- Check if Tailwind classes are loading
- Verify CSS custom properties in `index.css`
- Test across different browsers

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

### Development Guidelines
- Follow the existing code patterns
- Maintain responsive design principles
- Test across multiple devices and browsers
- Ensure backward compatibility
- Update documentation for new features

## 📊 Initial Open Source Release

### Version 1.0 - Terminal OS Experience
- ✅ **Glassmorphic Terminal**: Pixel-perfect glass design with neon accents
- ✅ **AI Chat Integration**: OpenAI API proxy via Supabase Edge Functions
- ✅ **Command System**: Interactive command-based navigation
- ✅ **Mobile-First Design**: Fully responsive interface
- ✅ **Performance Optimizations**: Smooth animations and quick responses

### Key Features
- **Interactive Terminal Interface**: Type commands to explore content
- **AI Chat Integration**: Chat with B.R.O. using OpenAI
- **Responsive Design**: Works on all devices
- **Clean Architecture**: Modular and maintainable codebase

## Credits

Built by [Sifeddine Mebarki](https://github.com/Meykiio)

### Inspiration

This site was inspired by a creative CV I saw online that used actual HTML-like tags to tell their story. That raw, code-is-content vibe stayed with me — so I made something that felt just as personal, playful, and weirdly functional.

### Special Thanks

- **[Lovable](https://lovable.dev/)**: For the beautiful, accessible, and customizable UI components that power this portfolio's interface.
- **[Supabase](https://supabase.com/)**: For the robust database and real-time infrastructure that powers the chat system.
- **[OpenAI](https://openai.com/)**: For the GPT-4 API that brings B.R.O. to life.
- **The open-source community**: For continuously pushing the boundaries of what's possible and sharing knowledge generously.

Big love to all the vibe coders pushing weird, fun, and beautiful things into the world. You inspire me daily.

### Connect with Me

- **Instagram**: [sifeddine.m](https://www.instagram.com/sifeddine.m/)
- **GitHub**: [Meykiio](https://github.com/Meykiio)
- **LinkedIn**: [Sifeddine Mebarki](https://www.linkedin.com/in/sifeddine-mebarki-a3883a18b/?originalSubdomain=dz)
- **Hugging Face**: [sifeddine](https://huggingface.co/sifeddine)
- **Facebook**: [sifeddinemeb](https://web.facebook.com/sifeddinemeb)

## 📝 License

This project is open source. Feel free to use the code for your own terminal interface!

## 🌟 Inspiration

Built for developers who appreciate:
- Clean, futuristic interfaces
- Interactive command-line experiences  
- AI-powered interactions
- Pixel-perfect glassmorphism design
- Real-time collaborative features
- Mobile-first responsive design

---

**Made with ❤️ by Sifeddine using Lovable, Supabase, and OpenAI**