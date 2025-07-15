import { useState, useRef, useEffect } from 'react';

interface TerminalInputProps {
  onExecute: (command: string) => void;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  getSuggestions: (input: string) => string[];
}

export const TerminalInput = ({ 
  onExecute, 
  commandHistory, 
  historyIndex, 
  setHistoryIndex,
  getSuggestions 
}: TerminalInputProps) => {
  const [input, setInput] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Keep input focused
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onExecute(input);
      setInput('');
      setSuggestions([]);
      setSelectedSuggestion(0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => Math.max(0, prev - 1));
      } else if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedSuggestion(prev => Math.min(suggestions.length - 1, prev + 1));
      } else if (historyIndex !== -1) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : -1;
        setHistoryIndex(newIndex);
        setInput(newIndex === -1 ? '' : commandHistory[newIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[selectedSuggestion]);
        setSuggestions([]);
        setSelectedSuggestion(0);
      }
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedSuggestion(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    const newSuggestions = getSuggestions(value);
    setSuggestions(newSuggestions);
    setSelectedSuggestion(0);
  };

  return (
    <div className="relative">
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute bottom-full mb-2 left-0 bg-black/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg overflow-hidden">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                index === selectedSuggestion 
                  ? 'bg-cyan-400/20 text-cyan-400' 
                  : 'text-cyan-400/70 hover:bg-cyan-400/10'
              }`}
              onClick={() => {
                setInput(suggestion);
                setSuggestions([]);
                setSelectedSuggestion(0);
                inputRef.current?.focus();
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}

      {/* Input Line */}
      <div className="flex items-center text-cyan-400">
        <span className="text-cyan-400 mr-2">$</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none outline-none text-cyan-400 w-full placeholder-cyan-400/40"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck="false"
          />
          {/* Cursor */}
          <span 
            className={`absolute top-0 text-cyan-400 transition-opacity duration-100 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ left: `${input.length * 0.6}em` }}
          >
            █
          </span>
        </div>
      </div>
    </div>
  );
};
