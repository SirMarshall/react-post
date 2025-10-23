
import React from 'react';

interface MainContentProps {
  isVisible: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ isVisible }) => {
  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="max-w-3xl text-center text-gray-200">
            <h1 className="text-5xl font-bold text-green-400 drop-shadow-[0_0_5px_rgba(50,255,50,0.7)] mb-4">SYSTEM ONLINE</h1>
            <p className="text-xl mb-2">Welcome, user.</p>
            <p className="text-lg text-gray-400 mb-6">
                The graphical user interface has been loaded successfully. All systems are operating within normal parameters. You can now proceed with your tasks.
            </p>
            <div className="flex justify-center gap-4">
                <button className="bg-green-600/80 hover:bg-green-500/80 border border-green-400 text-white font-bold py-2 px-6 transition-all duration-300">
                    Run Program
                </button>
                <button className="bg-gray-700/80 hover:bg-gray-600/80 border border-gray-500 text-white font-bold py-2 px-6 transition-all duration-300">
                    System Check
                </button>
            </div>
            <div className="mt-12 p-4 border border-green-900 bg-black/50">
                <p className="text-left text-green-500 font-mono">
                    &gt; Awaiting command...<span className="animate-blink">█</span>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
