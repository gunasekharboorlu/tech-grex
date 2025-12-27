
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>
      
      <div className="max-w-4xl animate-fade-in-up">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-400/10 rounded-full border border-cyan-400/20">
          Powered by Gemini 3 Flash
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 leading-tight">
          Verify Skills with <br />
          <span className="text-[#5b7cfa]">AI Precision</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          VeriSkill AI detects exaggerated claims and authenticates resume skills by analyzing technical patterns, 
          project consistency, and GitHub footprints.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-gradient-to-r from-[#5b7cfa] to-[#7f5bfa] rounded-full font-bold text-white shadow-lg shadow-blue-500/25 hover:scale-105 transition-transform duration-300"
          >
            Start Analysis
          </button>
          <a 
            href="#how-it-works"
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-full font-bold text-white hover:bg-white/10 transition-all duration-300"
          >
            How it Works
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
        <i className="fa-solid fa-chevron-down text-2xl"></i>
      </div>
      
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin 3s linear infinite; }
        .animate-spin-fast { animation: spin 1s linear infinite; }
      `}</style>
    </header>
  );
};

export default Hero;
