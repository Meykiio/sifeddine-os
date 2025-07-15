
import { useState, useEffect, useRef } from 'react';
import { TerminalInput } from './TerminalInput';
import { TerminalOutput } from './TerminalOutput';

export interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'welcome';
  content: string;
  timestamp: number;
}

const commands: Record<string, string> = {
  help: "Available commands: hero, about, projects, lab, mindset, contact, help ai – type one to explore.",
  hero: "Hey, I'm Sifeddine. I build systems that run without me. Not lazy—smart. Welcome to my world.",
  about: "I build tools because I'm allergic to doing the same thing twice. Passionate about automation, systems thinking, and making technology work for humans instead of the other way around.",
  projects: `Yuno — CAPTCHA meets game.
Receipto — receipts typed into live stock.
Wishdrop — wishes + anonymous givers = chaos & kindness.`,
  lab: "Playground: generosity games, AI-prompted interfaces, systems that misbehave and still surprise. This is where I experiment with wild ideas that somehow work.",
  mindset: "I don't chase hustle—I chase leverage. If it repeats, I systemize it. If it's weird but works, I keep it. Efficiency through intelligent laziness.",
  contact: `Slide into my DMs:
Instagram: @sifeddine.m
GitHub: Meykiio
TikTok: @sifeddine_meb
Email: hello@sifeddine.xyz`,
  clear: "",
  "help ai": "AI chat mode coming soon! For now, enjoy exploring with these commands."
};

export const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'welcome',
      content: "Welcome to Sifeddine's Shell\nType 'help' for commands or 'help ai' to chat.",
      timestamp: Date.now()
    }
  ]);
  
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
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

    const response = commands[trimmedCommand] || `Command not found: ${trimmedCommand}. Type 'help' for available commands.`;
    
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

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Terminal Window */}
      <div className="bg-black/20 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl shadow-cyan-400/10 overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-black/40 border-b border-cyan-400/20 px-6 py-4 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-cyan-400/80 text-sm font-mono">Sifeddine.xyz — Terminal</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="bg-black/60 backdrop-blur-sm min-h-[500px] max-h-[600px] overflow-y-auto p-6 font-mono text-sm"
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
      <div className="text-center mt-6 text-cyan-400/60 text-sm">
        Press <kbd className="px-2 py-1 bg-black/30 rounded border border-cyan-400/30">Tab</kbd> for autocomplete
      </div>
    </div>
  );
};
