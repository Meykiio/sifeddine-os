
import { useState, useEffect, useRef } from 'react';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import { ChatMode } from './ChatMode';

export interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'welcome';
  content: string;
  timestamp: number;
}

const surpriseFacts = [
  "💥 Surprise! The first neural network was built in 1958 and ran on vacuum tubes. Today we run billions of parameters in the cloud... on demand! Talk about Moore's Law on steroids.",
  "🤯 Plot twist: The entire internet weighs about 50 grams. That's lighter than a strawberry, yet it contains all of human knowledge. Physics is wild, my friend.",
  "⚡ Mind = blown: A single Google search uses more computing power than it took to send Apollo 11 to the moon. We literally carry rocket science in our pockets.",
  "🔮 Reality check: AI models today have more 'neurons' than some animals have brain cells. We're basically training digital brains that never sleep.",
  "🚀 Fun fact: The code that landed on the moon had less storage than a single tweet. Now we need gigabytes just to show you this text. Progress is beautiful chaos.",
  "💡 Brain teaser: Rubber duck debugging is a real thing because explaining code to an inanimate object actually works. Sometimes the duck is smarter than Stack Overflow."
];

const commands: Record<string, string> = {
  help: "Available commands: home, about, projects, lab, mindset, contact, surprise, help ai – type one to explore my digital soul.",
  home: `Hey, I'm Sifeddine. I build systems that run without me. Not lazy—smart. 

Welcome to my corner of the internet where automation meets artistry. I don't just write code; I craft digital experiences that solve real problems while I sleep. 

Think of me as your friendly neighborhood system architect with a caffeine addiction and an unhealthy obsession with making things work perfectly... automatically.`,
  about: `I build tools because I'm allergic to doing the same thing twice. Seriously, repetition gives me hives.

My philosophy? If I have to do it more than once, I'll spend 10 hours automating what takes 10 minutes manually. It's not about being lazy—it's about being strategically efficient.

I'm passionate about systems thinking, elegant automation, and making technology work FOR humans instead of the other way around. Currently obsessed with AI, generative interfaces, and finding the perfect balance between chaos and order.

Pro tip: I measure success not by hours worked, but by problems solved while I'm not working.`,
  projects: `Here's what happens when curiosity meets caffeine:

🎯 Yuno — CAPTCHA meets gaming. Because proving you're human shouldn't feel like punishment. It's a puzzle game that actually makes bot detection... fun? Revolutionary, I know.

📊 Receipto — Turn your shopping receipts into live stock predictions. Upload a grocery receipt, watch it predict market trends. It's either genius or complete nonsense. Probably both.

💝 Wishdrop — Anonymous wish fulfillment meets chaotic kindness. People drop wishes, strangers fulfill them. It's like Secret Santa but year-round and slightly unhinged.

Each project started as a "what if" and evolved into a "why not." The best kind of problem-solving happens when you're not taking yourself too seriously.`,
  lab: `Welcome to my digital playground where weird ideas come to life:

🧪 Generosity Games — Experiments in human kindness powered by code
🎨 AI-Prompted Interfaces — UIs that redesign themselves based on user behavior  
⚡ Systems That Misbehave — Intentionally unpredictable automation that somehow works better
🎲 Chaos Engineering — Breaking things on purpose to make them unbreakable

This is where I test the boundaries between logic and creativity. Some experiments fail spectacularly. Others accidentally change how I think about everything.

The lab motto: "If it's not at least 73% ridiculous, it's not worth building."`,
  mindset: `I don't chase hustle—I chase leverage. Here's my operating system:

🎯 Principle #1: If it repeats, I systemize it. Manual labor is for emergencies only.

🧠 Principle #2: If it's weird but works, I keep it. Conventional wisdom is often conventionally wrong.

⚡ Principle #3: Efficiency through intelligent laziness. Work smarter, not harder, not longer.

🎨 Principle #4: Systems should be beautiful, even if no one sees them. Ugly code creates ugly problems.

🚀 Principle #5: Build for the future you, who won't remember why you did things this way.

My secret weapon? I treat every problem like a puzzle that can be solved once and automated forever. It's not about avoiding work—it's about making work work for you.`,
  contact: `Ready to slide into my DMs? Here's where you can find me causing digital mayhem:

📸 Instagram: @sifeddine.m — Behind-the-scenes chaos and coffee updates
🐙 GitHub: Meykiio — Where the magic happens (and bugs get squashed)
📱 TikTok: @sifeddine_meb — Quick wins and automation hacks
📧 Email: hello@sifeddine.xyz — For serious inquiries and wild collaboration ideas

Fair warning: I respond faster to interesting problems than small talk. Come with a challenge, leave with a solution (or at least a really good story).

P.S. If you're a recruiter, please include the word "automation" in your subject line so I know you actually read this. 😉`,
  surprise: () => surpriseFacts[Math.floor(Math.random() * surpriseFacts.length)],
  clear: "",
  "help ai": "Initializing AI chat mode... Welcome to the future of conversation! 🤖"
};

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'welcome',
      content: "Welcome to Sifeddine's Shell v2.0\nType 'help' for commands or 'help ai' to chat with my AI assistant.",
      timestamp: Date.now()
    }
  ]);
  
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAIMode, setIsAIMode] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    // Add command to history
    if (trimmedCommand) {
      setCommandHistory(prev => [...prev, trimmedCommand]);
      setHistoryIndex(-1);
    }

    // Add command line
    const commandLine: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      content: command,
      timestamp: Date.now()
    };

    if (trimmedCommand === 'clear') {
      setLines([commandLine]);
      return;
    }

    if (trimmedCommand === 'help ai') {
      setLines(prev => [...prev, commandLine]);
      setIsAIMode(true);
      return;
    }

    const response = typeof commands[trimmedCommand] === 'function' 
      ? (commands[trimmedCommand] as () => string)()
      : commands[trimmedCommand] || `Command not found: ${trimmedCommand}. Type 'help' for available commands.`;
    
    const outputLine: TerminalLine = {
      id: `out-${Date.now()}`,
      type: 'output',
      content: response,
      timestamp: Date.now()
    };

    setLines(prev => [...prev, commandLine, outputLine]);
  };

  const getCommandSuggestions = (input: string): string[] => {
    if (!input) return [];
    const commandKeys = Object.keys(commands);
    return commandKeys.filter(cmd => cmd.startsWith(input.toLowerCase()));
  };

  const exitAIMode = () => {
    setIsAIMode(false);
    const exitLine: TerminalLine = {
      id: `ai-exit-${Date.now()}`,
      type: 'output',
      content: "Exited AI chat mode. Type 'help ai' to return or continue with regular commands.",
      timestamp: Date.now()
    };
    setLines(prev => [...prev, exitLine]);
  };

  if (isAIMode) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <ChatMode onExit={exitAIMode} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Terminal Window */}
      <div className="backdrop-blur-[20px] bg-black/30 border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-400/20 overflow-hidden ring-1 ring-cyan-400/10">
        {/* Terminal Header */}
        <div className="bg-black/50 border-b border-cyan-400/30 px-6 py-4 flex items-center gap-3 backdrop-blur-sm">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/90 shadow-lg shadow-red-400/30"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/90 shadow-lg shadow-yellow-400/30"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/90 shadow-lg shadow-green-400/30"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-cyan-400/90 text-sm font-mono font-medium">Sifeddine.xyz — Terminal v2.0</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="bg-black/40 backdrop-blur-sm min-h-[500px] max-h-[600px] overflow-y-auto p-6 font-mono text-sm"
        >
          {/* Terminal Lines */}
          <div className="space-y-2 mb-4">
            {lines.map((line) => (
              <TerminalOutput key={line.id} line={line} />
            ))}
          </div>

          {/* Input Line */}
          <TerminalInput 
            onExecute={executeCommand}
            commandHistory={commandHistory}
            historyIndex={historyIndex}
            setHistoryIndex={setHistoryIndex}
            getSuggestions={getCommandSuggestions}
          />
        </div>
      </div>

      {/* Bottom hint */}
      <div className="text-center mt-6 text-cyan-400/70 text-sm">
        Press <kbd className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded border border-cyan-400/30 shadow-lg">Tab</kbd> for autocomplete • <kbd className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded border border-cyan-400/30 shadow-lg">help ai</kbd> for chat mode
      </div>
    </div>
  );
};
