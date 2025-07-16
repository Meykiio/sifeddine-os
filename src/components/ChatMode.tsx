
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatModeProps {
  onExit: () => void;
}

export const ChatMode = ({ onExit }: ChatModeProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey! I'm B.R.O. (Barely Responding Optimally) — Sifeddine's sarcastic digital sidekick. Ask me anything about his work, projects, or just chat about tech and automation. What's on your mind?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading, messages]);

  const exitChatMode = async () => {
    setIsExiting(true);
    
    // Wait for the fade out transition
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onExit();
    const background = document.getElementById('background-image');
    if (background) {
      background.style.backgroundImage = 'url(/background-images/background.png)';
      background.style.filter = 'none';
    }
    
    // Reset the exiting state after the transition
    setTimeout(() => setIsExiting(false), 100);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await supabase.functions.invoke('chat-ai', {
        body: {
          messages: [
            ...messages.slice(-10).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: input
            }
          ]
        }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to get AI response');
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.data.reply,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `Oops! ${error instanceof Error ? error.message : 'Something went wrong with the AI connection. The digital gremlins are at it again!'} 

For now, feel free to explore the other commands or try again in a moment.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } else if (e.key === 'Enter' && e.shiftKey) {
      // Allow Shift+Enter for new line
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      const start = target.selectionStart || 0;
      const end = target.selectionEnd || 0;
      const value = target.value;
      
      setInput(value.substring(0, start) + '\n' + value.substring(end));
      
      // Move cursor to after the newline
      requestAnimationFrame(() => {
        if (target) {
          target.selectionStart = target.selectionEnd = start + 1;
        }
      });
      
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl w-full mx-auto bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 transition-all duration-500">
      {/* Header */}
      <div className="bg-black/60 border-b border-cyan-400/20 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => {
              onExit();
              // Reset background when exiting chat mode
              const background = document.getElementById('background-image');
              if (background) {
                background.style.backgroundImage = 'url(/background-images/background.png)';
                background.style.filter = 'none';
              }
            }}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors group"
            aria-label="Exit chat mode"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
          </button>
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-sm">B.R.O. AI Assistant</span>
          </div>
        </div>
        <div className="text-xs text-cyan-400/60 font-mono">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
          backdropFilter: 'blur(4px)'
        }}
      >
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={16} className="text-purple-400" />
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-lg font-mono text-sm ${
                  message.role === 'user'
                    ? 'bg-cyan-400/20 text-cyan-100 backdrop-blur-sm border border-cyan-400/30'
                    : 'bg-purple-400/20 text-purple-100 backdrop-blur-sm border border-purple-400/30'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-cyan-400" />
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-purple-400" />
              </div>
              <div className="bg-purple-400/20 text-purple-100 backdrop-blur-sm border border-purple-400/30 p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input */}
      <div className="bg-black/50 border-t border-purple-400/30 p-4 backdrop-blur-sm">
        <div className="flex gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about Sifeddine or just chat..."
            className="flex-1 bg-black/40 border border-purple-400/30 rounded-lg px-4 py-2 text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-purple-400/60 font-mono text-sm backdrop-blur-sm resize-none min-h-[40px] max-h-[120px] overflow-y-auto"
            disabled={isLoading}
            rows={1}
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(168, 85, 247, 0.5) transparent' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-purple-400/20 border border-purple-400/30 rounded-lg px-4 py-2 text-purple-400 hover:bg-purple-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
          >
            <Send size={16} />
          </button>
        </div>
        <div className="text-xs text-purple-400/60 mt-2 font-mono text-center">
          Press Enter to send • Shift+Enter for new line
        </div>
      </div>
    </div>
  );
};
