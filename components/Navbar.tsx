
import React, { useState } from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onSignOut: () => void;
  onNavigateHome: () => void;
  onStart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onSignOut, onNavigateHome, onStart }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-white/5 bg-[#0b0f1a]/50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={onNavigateHome}>
        <div className="w-10 h-10 bg-gradient-to-tr from-[#5b7cfa] to-[#7f5bfa] rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
          <i className="fa-solid fa-brain text-white text-xl"></i>
        </div>
        <span className="font-bold text-xl tracking-tight">Grex <span className="text-[#5b7cfa]">AI</span></span>
      </div>
      
      <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
        <a href="#" className="hover:text-white transition-colors">Features</a>
        <a href="#" className="hover:text-white transition-colors">Recruiters</a>
        <a href="#" className="hover:text-white transition-colors">Safety</a>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-10 h-10 rounded-full border border-white/10 overflow-hidden hover:border-[#5b7cfa] transition-all"
            >
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=5b7cfa&color=fff`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-[#151a2f] border border-white/10 rounded-2xl shadow-2xl p-4 animate-fade-in-up">
                <div className="pb-3 mb-3 border-b border-white/5">
                  <p className="text-sm font-bold text-white">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-user-gear"></i> Profile Settings
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 rounded-lg transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-clock-rotate-left"></i> Analysis History
                  </button>
                  <button 
                    onClick={() => {
                      onSignOut();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <i className="fa-solid fa-right-from-bracket"></i> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={onStart}
            className="px-5 py-2.5 bg-[#5b7cfa] rounded-full text-sm font-bold hover:bg-[#4a6be8] transition-all text-white"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
