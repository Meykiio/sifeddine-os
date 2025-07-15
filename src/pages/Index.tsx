
import { Terminal } from "@/components/Terminal";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* First background image - tropical sunset */}
        <div 
          className="absolute inset-0 opacity-40 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/lovable-uploads/c2723f91-bf12-4c05-ab63-2045b769b702.png)'
          }}
        />
        {/* Second background image - cyberpunk street */}
        <div 
          className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat mix-blend-overlay"
          style={{
            backgroundImage: 'url(/lovable-uploads/021b1a33-0f31-49c6-b61b-48e24806eeea.png)'
          }}
        />
        {/* Gradient overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/80" />
      </div>
      
      {/* Enhanced particle effects */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(0,255,255,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,69,255,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,0,128,0.1)_0%,transparent_40%)]" />
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-24 h-24 bg-pink-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
      </div>
      
      {/* Main terminal container */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <Terminal />
      </div>
    </div>
  );
};

export default Index;
