import { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { ArrowLeft, Send, Bot, User, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useChatMessages } from '@/hooks/useChatMessages';

interface ChatModeProps {
  onExit: () => void;
}

export const ChatMode = ({ onExit }: ChatModeProps) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState('local-session');
  const { messages, loading: messagesLoading, addMessage, clearMessages } = useChatMessages(sessionId);
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

  // Add welcome message if no messages exist
  useEffect(() => {
    if (messages.length === 0) {
      addMessage(
        "Hey! I'm B.R.O. (Barely Responding Optimally) — Sifeddine's sarcastic digital sidekick. Ask me anything about his work, projects, or just chat about tech and automation. What's on your mind?",
        'assistant'
      );
    }
  }, []);

  const exitChatMode = async () => {
    onExit();
    const background = document.getElementById('background-1');
    const background2 = document.getElementById('background-2');
    if (background && background2) {
      background.style.opacity = '1';
      background2.style.opacity = '0';
    }
  };

  const handleClearChat = async () => {
    await clearMessages();
    // Re-add welcome message
    setTimeout(() => {
      addMessage(
        "Chat cleared! I'm still here though. What would you like to know about Sifeddine or his projects?",
        'assistant'
      );
    }, 100);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to chat
    await addMessage(userMessage, 'user');

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
              content: userMessage
            }
          ]
        }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to get AI response');
      }

      // Add assistant response to chat
      await addMessage(response.data.reply || 'Sorry, I had trouble generating a response. Please try again.', 'assistant');
    } catch (error) {
      // Toast for missing key or other API error
      if (error instanceof Error && error.message.includes('OpenAI API key not configured')) {
        toast.error('OpenAI API key is missing. Add it in project settings.');
      }
      const errorMessage = `Oops! ${error instanceof Error ? error.message : 'Something went wrong with the AI connection. The digital gremlins are at it again!'} 

For now, feel free to explore the other commands or try again in a moment.`;
      
      await addMessage(errorMessage, 'assistant');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl w-full mx-auto bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 transition-all duration-500">
      {/* Header */}
      <div className="bg-black/60 border-b border-cyan-400/20 p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={exitChatMode}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors group"
            aria-label="Exit chat mode"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
          </button>
          <div className="flex items-center space-x-2">
            <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-cyan-400 font-mono text-xs sm:text-sm">B.R.O. AI Assistant</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors group"
            aria-label="Clear chat"
          >
            <Trash2 className="w-4 h-4 text-cyan-400/60 group-hover:text-cyan-400 transition-colors" />
          </button>
          <div className="text-xs text-cyan-400/60 font-mono hidden sm:block">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 custom-scrollbar"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))',
          backdropFilter: 'blur(4px)'
        }}
      >
        {messagesLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-cyan-400/60 font-mono text-sm">Loading chat history...</div>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="sm:w-4 sm:h-4 text-purple-400" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg font-mono text-xs sm:text-sm ${
                    message.role === 'user'
                      ? 'bg-cyan-400/20 text-cyan-100 backdrop-blur-sm border border-cyan-400/30'
                      : 'bg-purple-400/20 text-purple-100 backdrop-blur-sm border border-purple-400/30'
                  }`}
                >
                  <div className="whitespace-pre-wrap break-words">{message.content}</div>
                </div>
                {message.role === 'user' && (
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="sm:w-4 sm:h-4 text-cyan-400" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 sm:gap-3 justify-start">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-400/20 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="sm:w-4 sm:h-4 text-purple-400" />
                </div>
                <div className="bg-purple-400/20 text-purple-100 backdrop-blur-sm border border-purple-400/30 p-2 sm:p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="bg-black/50 border-t border-purple-400/30 p-3 sm:p-4 backdrop-blur-sm">
        <div className="flex gap-2 sm:gap-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about Sifeddine or just chat..."
            className="flex-1 bg-black/40 border border-purple-400/30 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-purple-400/60 font-mono text-xs sm:text-sm backdrop-blur-sm resize-none min-h-[40px] max-h-[120px] overflow-y-auto"
            disabled={isLoading}
            rows={1}
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(168, 85, 247, 0.5) transparent' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-purple-400/20 border border-purple-400/30 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-purple-400 hover:bg-purple-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm min-w-[44px] flex items-center justify-center"
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