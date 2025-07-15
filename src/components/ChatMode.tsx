
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY || '<YOUR_OPENAI_API_KEY_HERE>';

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
      content: "Hey! I'm Sifeddine's AI assistant. Ask me anything about his work, projects, philosophy, or just chat about tech, automation, and digital chaos. What's on your mind?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      // Check if API key is properly set
      if (OPENAI_API_KEY === '<YOUR_OPENAI_API_KEY_HERE>' || !OPENAI_API_KEY) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are Sifeddine's AI assistant. You represent Sifeddine - a creative developer who builds systems that run without him. He's passionate about automation, systems thinking, and making technology work for humans. He has a witty, slightly sarcastic personality and measures success by problems solved while not working. He's built projects like Yuno (CAPTCHA meets gaming), Receipto (receipts to stock predictions), and Wishdrop (anonymous wish fulfillment). Respond in his voice - intelligent, humorous, and focused on elegant solutions. Keep responses conversational but insightful.`
            },
            ...messages.slice(-5).map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: input
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenAI');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.choices[0].message.content,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `Oops! ${error instanceof Error && error.message === 'API key not configured' 
          ? 'Looks like the OpenAI API key needs to be configured. Add your key to the environment variables and refresh!' 
          : 'Something went wrong with the AI connection. The digital gremlins are at it again!'} 

For now, feel free to explore the other commands or try again in a moment.`,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="backdrop-blur-[20px] bg-black/30 border border-purple-400/30 rounded-2xl shadow-2xl shadow-purple-400/20 overflow-hidden ring-1 ring-purple-400/10">
      {/* Chat Header */}
      <div className="bg-black/50 border-b border-purple-400/30 px-6 py-4 flex items-center gap-3 backdrop-blur-sm">
        <button
          onClick={onExit}
          className="flex items-center gap-2 text-purple-400/80 hover:text-purple-400 transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-mono">Back to Terminal</span>
        </button>
        <div className="flex-1 text-center">
          <span className="text-purple-400/90 text-sm font-mono font-medium flex items-center justify-center gap-2">
            <Bot size={16} />
            AI Chat Mode — Powered by GPT
          </span>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-black/40 backdrop-blur-sm h-[500px] overflow-y-auto p-6">
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
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about Sifeddine or just chat..."
            className="flex-1 bg-black/40 border border-purple-400/30 rounded-lg px-4 py-2 text-purple-100 placeholder-purple-400/60 focus:outline-none focus:border-purple-400/60 font-mono text-sm backdrop-blur-sm"
            disabled={isLoading}
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
