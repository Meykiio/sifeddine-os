
import { useEffect, useState, useRef } from 'react';
import { TerminalLine } from './Terminal';

interface TerminalOutputProps {
  line: TerminalLine;
  onContentUpdate?: () => void;
  shouldAnimate?: boolean;
  onTypingComplete?: () => void;
}

export const TerminalOutput = ({ line, onContentUpdate, shouldAnimate = false, onTypingComplete }: TerminalOutputProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // If this line has already been animated or shouldn't animate, show immediately
    if (hasAnimatedRef.current || !shouldAnimate || line.type === 'command') {
      setDisplayedText(line.content);
      setIsTyping(false);
      return;
    }

    // Mark as animated to prevent re-animation
    hasAnimatedRef.current = true;
    
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
        onTypingComplete?.();
        clearInterval(typeInterval);
      }
    }, 5); // Faster typing speed

    return () => clearInterval(typeInterval);
  }, [line.content, line.type, onContentUpdate, shouldAnimate]);

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
