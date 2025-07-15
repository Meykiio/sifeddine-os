
import { Terminal } from "@/components/Terminal";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {/* New cyberpunk street background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/lovable-uploads/3222f058-6cee-48f2-bc2d-0f5e69df579d.png)'
          }}
        />
        {/* Minimal overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
      
      {/* Main terminal container */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <Terminal />
      </div>
    </div>
  );
};

export default Index;
