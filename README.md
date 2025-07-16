
# Sifeddine.xyz — Terminal OS Experience

A futuristic terminal interface with glassmorphism design, featuring interactive commands and AI chat integration.

## 🚀 Live Demo

**URL**: https://sifeddine.xyz

> 💡 **Note**: For the best experience, please view this portfolio on a desktop device.

## ✨ Features

- **Glassmorphic Terminal**: Pixel-perfect glass design with neon accents
- **Interactive Commands**: Navigate through Sifeddine's world with typed commands
- **AI Chat Mode**: ChatGPT-powered assistant integration
- **Typewriter Effects**: Smooth text animations and blinking cursor
- **Tab Autocomplete**: Command suggestions and completion
- **Responsive Design**: Works beautifully on all devices

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

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism
- **UI Components**: [Lovable](https://lovable.dev/) (shadcn/ui based)
- **Icons**: Lucide React
- **AI Integration**: OpenAI GPT-4 API
- **Build Tool**: Vite
- **Deployment**: Vercel-ready

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```
   NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔧 Environment Setup

### OpenAI API Key Setup

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your environment variables:
   
   **For local development:**
   ```bash
   # .env.local
   NEXT_PUBLIC_OPENAI_API_KEY=sk-your-key-here
   ```
   
   **For Vercel deployment:**
   ```bash
   # In Vercel dashboard > Settings > Environment Variables
   NEXT_PUBLIC_OPENAI_API_KEY=sk-your-key-here
   ```

3. The AI chat mode will automatically work once the key is configured

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
   
   # Set environment variables in Vercel dashboard
   # Add NEXT_PUBLIC_OPENAI_API_KEY with your OpenAI key
   ```

### Other Platforms

The project works on any static hosting platform:
- **Netlify**: `npm run build` → deploy `dist` folder
- **GitHub Pages**: Use GitHub Actions with build workflow
- **Railway/Render**: Connect GitHub repo and deploy

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

### AI Personality

Customize the AI assistant in `src/components/ChatMode.tsx`:

```typescript
const systemPrompt = `You are Sifeddine's AI assistant...`;
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
│   └── Index.tsx          # Main page with background
└── index.css             # Global styles and design system
```

## 🐛 Troubleshooting

### AI Chat Not Working
- Verify OpenAI API key is set correctly
- Check browser console for API errors
- Ensure you have OpenAI credits available

### Commands Not Responding
- Check console for JavaScript errors
- Verify command names in `Terminal.tsx`
- Refresh the page to reset state

### Styling Issues
- Clear browser cache
- Check if Tailwind classes are loading
- Verify CSS custom properties in `index.css`

## 🤝 Contributing

## Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Credits

Built by [Sifeddine Mebarki](https://github.com/Meykiio)

### Inspiration

This site was inspired by a creative CV I saw online that used actual HTML-like tags to tell their story. That raw, code-is-content vibe stayed with me — so I made something that felt just as personal, playful, and weirdly functional.

### Special Thanks

- **[Lovable](https://lovable.dev/)**: For the beautiful, accessible, and customizable UI components that power this portfolio's interface.
- **The open-source community**: For continuously pushing the boundaries of what's possible and sharing knowledge generously.

Big love to all the vibe coders pushing weird, fun, and beautiful things into the world. You inspire me daily.

### Connect with Me

- **Instagram**: [sifeddine.m](https://www.instagram.com/sifeddine.m/)
- **GitHub**: [Meykiio](https://github.com/Meykiio)
- **LinkedIn**: [Sifeddine Mebarki](https://www.linkedin.com/in/sifeddine-mebarki-a3883a18b/?originalSubdomain=dz)
- **TikTok**: [sifeddine_meb](https://tiktok.com/@sifeddine_meb)
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

---

**Made with ❤️ by Sifeddine using Lovable**
