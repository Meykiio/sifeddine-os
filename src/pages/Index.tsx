
import { useState, useEffect } from 'react';
import { Terminal } from "@/components/Terminal";

interface TerminalProps {
  onBackgroundTransition: (isTransitioning: boolean) => void;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Simulate loading time for the background image
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Initial loading overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-1000 ${
          isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />
      {/* Background Images with crossfade transition */}
      <div className="fixed inset-0 z-0 w-screen h-screen">
        {/* First Background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: 'url(/background-images/bg1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            width: '100vw',
            height: '100vh',
            opacity: isTransitioning ? 0 : 1,
            transition: 'opacity 1s ease-in-out',
            willChange: 'opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          id="background-1"
        />
        
        {/* Second Background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: 'url(/background-images/bg2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            width: '100vw',
            height: '100vh',
            opacity: isTransitioning ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
            willChange: 'opacity',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
          id="background-2"
        />
        
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Main terminal container */}
      <div className={`relative z-20 min-h-screen flex items-center justify-center p-4 transition-opacity duration-1000 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        <Terminal onBackgroundTransition={setIsTransitioning} />
      </div>
    </div>
  );
};

export default Index;
