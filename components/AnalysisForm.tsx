
import React, { useState } from 'react';
import { AnalysisFormState } from '../types';

interface AnalysisFormProps {
  onSubmit: (state: AnalysisFormState) => void;
  isLoading: boolean;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, isLoading }) => {
  const [form, setForm] = useState<AnalysisFormState>({
    linkedinProfile: '',
    resumeFile: null
  });
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, resumeFile: e.target.files[0] });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validTypes.includes(file.type)) {
        setForm({ ...form, resumeFile: file });
      } else {
        alert("Please upload PDF or DOC format");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.resumeFile && form.linkedinProfile) {
      onSubmit(form);
    }
  };

  return (
    <div id="formSection" className="max-w-2xl mx-auto py-20 px-4">
      <div className="bg-[#151a2f] p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center text-white">Upload Resume</h2>
        <p className="text-gray-400 mb-10 text-center">Support for PDF and DOC formats. Gemini will authenticate technical claims.</p>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider block">
              LinkedIn Profile Link
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                <i className="fa-brands fa-linkedin-in text-lg"></i>
              </span>
              <input 
                type="url" 
                placeholder="https://linkedin.com/in/username"
                className="w-full bg-[#0b0f1a] border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#5b7cfa] focus:border-transparent transition-all"
                value={form.linkedinProfile}
                onChange={(e) => setForm({ ...form, linkedinProfile: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 uppercase tracking-wider block">
              Resume (PDF or DOC)
            </label>
            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all ${
                dragActive ? 'border-[#5b7cfa] bg-[#5b7cfa]/10' : 'border-white/10 hover:border-white/20'
              } ${form.resumeFile ? 'bg-green-500/5 border-green-500/30' : ''}`}
            >
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
              
              <div className="text-center">
                {form.resumeFile ? (
                  <>
                    <i className="fa-solid fa-file-circle-check text-5xl text-green-400 mb-4"></i>
                    <p className="text-white font-medium">{form.resumeFile.name}</p>
                    <p className="text-xs text-gray-500 mt-2">Click or drag to replace</p>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-cloud-arrow-up text-5xl text-[#5b7cfa] mb-4"></i>
                    <p className="text-gray-300 font-medium">Drag & drop your PDF/DOC here</p>
                    <p className="text-xs text-gray-500 mt-2">or browse your files (Max 5MB)</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={!form.resumeFile || !form.linkedinProfile || isLoading}
            className="w-full py-5 bg-[#5b7cfa] hover:bg-[#4a6be8] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-white text-lg shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <i className="fa-solid fa-circle-notch animate-spin"></i>
            ) : (
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            )}
            Start Analysis
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnalysisForm;
