import { useState, useEffect, useRef } from 'react';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';
import { ChatMode } from './ChatMode';

export interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'welcome';
  content: string;
  timestamp: number;
  shouldAnimate?: boolean;
}

const surpriseFacts = [
  "💥 Surprise! The first neural network was built in 1958 and ran on vacuum tubes. Today we run billions of parameters in the cloud... on demand! Talk about Moore's Law on steroids.",
  "🤯 Plot twist: The entire internet weighs about 50 grams. That's lighter than a strawberry, yet it contains all of human knowledge. Physics is wild, my friend.",
  "⚡ Mind = blown: A single Google search uses more computing power than it took to send Apollo 11 to the moon. We literally carry rocket science in our pockets.",
  "🔮 Reality check: AI models today have more 'neurons' than some animals have brain cells. We're basically training digital brains that never sleep.",
  "🚀 Fun fact: The code that landed on the moon had less storage than a single tweet. Now we need gigabytes just to show you this text. Progress is beautiful chaos.",
  "💡 Brain teaser: Rubber duck debugging is a real thing because explaining code to an inanimate object actually works. Sometimes the duck is smarter than Stack Overflow."
];

const commands: Record<string, string | (() => string)> = {
  help: `These are your options:
 • home      – Kick things off
 • about     – Peek inside my head
 • projects  – See my caffeine‑free curiosities
 • lab       – Enter the distraction workshop
 • mindset   – Steal my brain hacks
 • contact   – Slide into my DMs
 • surprise  – Get a mind‑blowing AI fact
 • help ai   – Talk to my AI alter‑ego`,
  home: `Hey, I'm Sifeddine.
I get bored fast, so I build things to stay entertained.
Welcome to my little corner of the internet—no fluff, all vibe.
Think of this as the front door to my digital Space.`,
  about: `I'm allergic to doing the same thing twice. Repetition = Headaches.
Some people meditate; I build. Some people journal; I provoke AI debates.

Based in Algiers, living rent‑free in my own head.
My entourage: too many browser tabs, half‑baked side quests, and a digital doppelgänger that judges my code.

Pro tip: I judge success by how little I have to lift a finger after I build something.`,
  projects: `🔥 On my shelf:
 • Yuno      – CAPTCHA meets micro‑adventure ("Are you human?" now feels like fun)
 • Receipto  – Making receipts stop being paper nightmares
 • Wishdrop  – A wish‑granting wall for good vibes

Each started as a dumb "what if" and became something people actually use.`,
  lab: `Welcome to the Lab—a glorious distraction zone:

 • I grab random "what ifs" and duct‑tape them into prototypes
 • I dare AI to finish my punchlines (and sometimes it does)
 • I break my own projects just to see if I can outsmart myself

It's chaotic, impulsive, and oddly satisfying.`,
  mindset: `Mindset: Keep It Real  
I don't claim to know it all, I'm just someone who gives things a shot.  

• When something breaks, I learn more than I grumble.  
• I dive into weird ideas because you never know what sticks.  
• I move fast, make mistakes, and own them.  
• Progress beats perfection—small steps still count.  

Friendly reminder:  
Stay curious, stay humble, and let your work do the talking.`,
  contact: `No forms. No newsletters. Zero spam.

Hit me up if you:
 • Have a half‑baked idea that's actually cool
 • Want to offload the boring stuff to a bot
 • Just need someone who codes like a poet with issues

Instagram: @sifeddine.m
GitHub: Meykiio
TikTok: @sifeddine_meb
Email: sifeddine.meb96@gmail.com`,
  surprise: () => surpriseFacts[Math.floor(Math.random() * surpriseFacts.length)],
  clear: "",
  "help ai": "AI mode activated…\n[Terminal morphs into ChatGPT interface—speak your mind.]"
};

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'welcome',
      content: "Hello, World !\nType 'help' for commands or 'help ai' to chat with my AI sidekick.\n$",
      timestamp: Date.now(),
      shouldAnimate: true
    }
  ]);
  
  // Track the latest line ID to determine which lines should animate
  const [latestLineId, setLatestLineId] = useState<string>('1');
  
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
      timestamp: Date.now(),
      shouldAnimate: false
    };

    if (trimmedCommand === 'clear') {
      setLines([commandLine]);
      setLatestLineId(commandLine.id);
      return;
    }

    if (trimmedCommand === 'help ai') {
      setLines(prev => [...prev, commandLine]);
      setLatestLineId(commandLine.id);
      setIsAIMode(true);
      return;
    }

    const commandHandler = commands[trimmedCommand];
    const response = typeof commandHandler === 'function' 
      ? commandHandler()
      : commandHandler || `Command not found.\nType 'help' to see what actually works—or try 'surprise' if you dare.`;
    
    const outputLineId = `out-${Date.now()}`;
    const outputLine: TerminalLine = {
      id: outputLineId,
      type: 'output',
      content: response,
      timestamp: Date.now(),
      shouldAnimate: true
    };

    setLines(prev => [...prev, commandLine, outputLine]);
    setLatestLineId(outputLineId);
  };

  const getCommandSuggestions = (input: string): string[] => {
    if (!input) return [];
    const commandKeys = Object.keys(commands);
    return commandKeys.filter(cmd => cmd.startsWith(input.toLowerCase()));
  };

  const exitAIMode = () => {
    setIsAIMode(false);
    const exitLineId = `ai-exit-${Date.now()}`;
    const exitLine: TerminalLine = {
      id: exitLineId,
      type: 'output',
      content: "Exited AI chat mode. Type 'help ai' to return or continue with regular commands.",
      timestamp: Date.now(),
      shouldAnimate: true
    };
    setLines(prev => [...prev, exitLine]);
    setLatestLineId(exitLineId);
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
      {/* Terminal Window - New glassmorphism with sharp edges */}
      <div style={{
        backdropFilter: 'blur(7px) saturate(200%)',
        WebkitBackdropFilter: 'blur(7px) saturate(200%)',
        backgroundColor: 'rgba(93, 93, 93, 0.18)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.125)',
        boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)'
      }} className="overflow-hidden ring-2 ring-cyan-400/20">
        {/* Terminal Header */}
        <div className="bg-black/60 border-b-2 border-cyan-400/40 px-6 py-4 flex items-center gap-3 backdrop-blur-sm">
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
          className="bg-black/30 backdrop-blur-sm min-h-[500px] max-h-[600px] overflow-y-auto p-6 font-mono text-sm"
        >
          {/* Terminal Lines */}
          <div className="space-y-2 mb-4">
            {lines.map((line) => (
              <TerminalOutput 
                key={line.id} 
                line={line} 
                onContentUpdate={scrollToBottom}
                shouldAnimate={line.shouldAnimate}
              />
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
        Press <kbd className="px-2 py-1 bg-black/60 backdrop-blur-sm border border-cyan-400/40 shadow-lg" style={{ borderRadius: '2px' }}>Tab</kbd> for autocomplete • <kbd className="px-2 py-1 bg-black/60 backdrop-blur-sm border border-cyan-400/40 shadow-lg" style={{ borderRadius: '2px' }}>help ai</kbd> for chat mode
      </div>
    </div>
  );
};
