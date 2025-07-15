
import { useEffect, useState } from 'react';
import { TerminalLine } from './Terminal';

interface TerminalOutputProps {
  line: TerminalLine;
  onContentUpdate?: () => void;
}

export const TerminalOutput = ({ line, onContentUpdate }: TerminalOutputProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (line.type === 'command') {
      setDisplayedText(line.content);
      setIsTyping(false);
      return;
    }

    let currentIndex = 0;
    const text = line.content;
    setDisplayedText('');
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        // Call scroll update on each character
        if (onContentUpdate) {
          onContentUpdate();
        }
      } else {
        setIsTyping(false);
        clearInterval(typeInterval);
      }
    }, 8); // Much faster typing speed (was 20ms, now 8ms)

    return () => clearInterval(typeInterval);
  }, [line.content, line.type, onContentUpdate]);

  const getLineStyles = () => {
    switch (line.type) {
      case 'command':
        return 'text-cyan-400';
      case 'welcome':
        return 'text-cyan-300 font-semibold';
      case 'output':
        return 'text-green-400/90';
      default:
        return 'text-cyan-400/80';
    }
  };

  const renderContent = () => {
    const lines = displayedText.split('\n');
    return lines.map((textLine, index) => (
      <div key={index} className="min-h-[1.2em]">
        {line.type === 'command' && (
          <span className="text-cyan-400 mr-2">$</span>
        )}
        <span className={getLineStyles()}>
          {textLine}
          {isTyping && index === lines.length - 1 && (
            <span className="animate-pulse text-cyan-400">█</span>
          )}
        </span>
      </div>
    ));
  };

  return (
    <div className="font-mono text-sm">
      {renderContent()}
    </div>
  );
};
