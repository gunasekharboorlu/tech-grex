
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onSuccess: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated successful auth
    onSuccess({
      email,
      name: isLogin ? email.split('@')[0] : name,
    });
  };

  const socialButtons = [
    { name: 'Google', icon: 'fa-google', color: 'hover:bg-red-500/10 hover:border-red-500/30' },
    { name: 'GitHub', icon: 'fa-github', color: 'hover:bg-white/10 hover:border-white/30' },
    { name: 'LinkedIn', icon: 'fa-linkedin-in', color: 'hover:bg-blue-600/10 hover:border-blue-600/30' },
  ];

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#151a2f] p-8 md:p-10 rounded-3xl border border-white/5 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#5b7cfa] to-[#7f5bfa] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/20">
            <i className="fa-solid fa-shield-halved text-white text-3xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400">Enter your details to access Grex AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl py-4 px-4 focus:ring-2 focus:ring-[#5b7cfa] focus:outline-none transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl py-4 px-4 focus:ring-2 focus:ring-[#5b7cfa] focus:outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl py-4 px-4 focus:ring-2 focus:ring-[#5b7cfa] focus:outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#5b7cfa] hover:bg-[#4a6be8] rounded-xl font-bold text-white shadow-lg shadow-blue-500/20 transition-all mt-4"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#151a2f] px-4 text-gray-500 font-bold tracking-widest">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {socialButtons.map((btn) => (
            <button 
              key={btn.name}
              onClick={() => onSuccess({ email: `${btn.name.toLowerCase()}@example.com`, name: `Social User (${btn.name})` })}
              className={`flex flex-col items-center justify-center p-3 rounded-xl border border-white/10 transition-all ${btn.color} group`}
            >
              <i className={`fa-brands ${btn.icon} text-xl text-gray-400 group-hover:text-white mb-1`}></i>
              <span className="text-[10px] text-gray-500 group-hover:text-gray-300 font-bold uppercase tracking-wider">{btn.name}</span>
            </button>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#5b7cfa] font-bold hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
