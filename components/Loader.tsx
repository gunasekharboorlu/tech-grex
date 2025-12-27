
import React, { useState, useEffect } from 'react';

const messages = [
  "Extracting candidate metadata...",
  "Scanning resume for technical signals...",
  "Cross-referencing claims with career patterns...",
  "Identifying potential skill exaggeration...",
  "Generating authenticity report...",
  "Finalizing AI score calculation..."
];

const Loader: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-[#1a1f35]/50 rounded-2xl border border-white/5 backdrop-blur-md shadow-2xl">
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-t-[#5b7cfa] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-[#7f5bfa] border-r-transparent border-b-transparent border-l-transparent animate-spin-slow"></div>
        <div className="absolute inset-4 rounded-full border-4 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin-fast"></div>
      </div>
      <p className="text-xl font-medium text-white mb-2 animate-pulse">
        {messages[msgIndex]}
      </p>
      <p className="text-sm text-gray-400">This usually takes about 10-15 seconds</p>
    </div>
  );
};

export default Loader;
