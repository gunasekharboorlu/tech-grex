
import React, { useState } from 'react';
import Hero from './components/Hero';
import AnalysisForm from './components/AnalysisForm';
import ResultsDashboard from './components/ResultsDashboard';
import Loader from './components/Loader';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import { AnalysisResult, AnalysisFormState, User } from './types';
import { analyzeResume } from './services/geminiService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  // Start with 'hero' as the main landing page
  const [view, setView] = useState<'auth' | 'hero' | 'form' | 'loading' | 'results'>('hero');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAuthSuccess = (authUser: User) => {
    setUser(authUser);
    setView('hero');
  };

  const handleStart = () => {
    if (!user) {
      setView('auth');
    } else {
      setView('form');
      setTimeout(() => {
        document.getElementById('formSection')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSubmit = async (formData: AnalysisFormState) => {
    if (!formData.resumeFile) return;

    setError(null);
    setView('loading');
    
    try {
      if (formData.resumeFile.type !== 'application/pdf') {
        throw new Error("Currently, only PDF files are processed for technical analysis. Please use PDF format.");
      }

      const pdfBase64 = await fileToBase64(formData.resumeFile);
      const analysis = await analyzeResume(pdfBase64, formData.linkedinProfile);
      setResult(analysis);
      setView('results');
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
      setView('form');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setResult(null);
    setError(null);
    setView('auth');
  };

  const handleNavigateHome = () => {
    // Redirect to the hero (main page) regardless of state
    setView('hero');
    // Clear transient states to allow a fresh start
    setError(null);
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setView('form');
  };

  return (
    <div className="min-h-screen selection:bg-[#5b7cfa]/30">
      <Navbar 
        user={user} 
        onSignOut={handleSignOut} 
        onNavigateHome={handleNavigateHome}
        onStart={handleStart}
      />

      <div className="pt-20">
        {view === 'auth' && <Auth onSuccess={handleAuthSuccess} />}
        
        {view === 'hero' && <Hero onStart={handleStart} />}
        
        {view === 'form' && (
          <div className="min-h-screen">
            {error && (
              <div className="max-w-2xl mx-auto mt-20 px-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl flex items-center gap-3 text-red-400 animate-fade-in">
                  <i className="fa-solid fa-circle-exclamation text-xl"></i>
                  <p>{error}</p>
                </div>
              </div>
            )}
            <AnalysisForm onSubmit={handleSubmit} isLoading={false} />
          </div>
        )}

        {view === 'loading' && (
          <div className="min-h-[80vh] flex items-center justify-center p-4">
            <Loader />
          </div>
        )}

        {view === 'results' && result && (
          <ResultsDashboard result={result} onReset={handleReset} />
        )}
      </div>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-gray-500 text-sm">
        <div className="flex flex-col items-center gap-6 max-w-4xl mx-auto">
          <div className="flex gap-6">
            <i className="fa-brands fa-github text-2xl hover:text-white cursor-pointer transition-colors"></i>
            <i className="fa-brands fa-twitter text-2xl hover:text-white cursor-pointer transition-colors"></i>
            <i className="fa-brands fa-linkedin text-2xl hover:text-white cursor-pointer transition-colors"></i>
          </div>
          <p>© 2025 Grex AI Auditing Systems. All rights reserved.</p>
          <div className="flex gap-4 text-xs opacity-50">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
