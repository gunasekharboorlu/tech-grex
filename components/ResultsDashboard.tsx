
import React from 'react';
import { AnalysisResult, RiskLevel, SkillStatus } from '../types';

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ result, onReset }) => {
  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case RiskLevel.LOW: return 'bg-green-500/20 text-green-400 border-green-500/30';
      case RiskLevel.MEDIUM: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case RiskLevel.HIGH: return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: SkillStatus) => {
    switch (status) {
      case SkillStatus.GENUINE: return <i className="fa-solid fa-check-circle text-green-400"></i>;
      case SkillStatus.EXAGGERATED: return <i className="fa-solid fa-circle-exclamation text-yellow-400"></i>;
      case SkillStatus.FAKE: return <i className="fa-solid fa-triangle-exclamation text-red-400"></i>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Score Card */}
        <div className="flex-1 bg-[#151a2f] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 flex items-center justify-center mb-6">
            <svg className="w-full h-full -rotate-90">
              <circle 
                cx="80" cy="80" r="70" 
                fill="transparent" 
                stroke="#2a2f45" 
                strokeWidth="12" 
              />
              <circle 
                cx="80" cy="80" r="70" 
                fill="transparent" 
                stroke="#5b7cfa" 
                strokeWidth="12" 
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * result.score) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col">
              <span className="text-4xl font-bold text-white">{result.score}</span>
              <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Score</span>
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Authenticity Rating</h3>
          <div className={`px-4 py-1.5 rounded-full border text-sm font-bold ${getRiskColor(result.riskLevel)}`}>
            {result.riskLevel} Risk Detected
          </div>
        </div>

        {/* Overview Card */}
        <div className="flex-[2] bg-[#151a2f] p-8 rounded-3xl border border-white/5">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <i className="fa-solid fa-magnifying-glass-chart text-[#5b7cfa]"></i>
            AI Audit Summary
          </h3>
          <div className="prose prose-invert max-w-none text-gray-400">
            <p className="leading-relaxed">
              Analysis for <span className="text-white font-semibold">{result.candidateName || "the candidate"}</span> reveals an authenticity score of {result.score}/100.
            </p>
            <p className="mt-4 leading-relaxed">
              {result.explanation}
            </p>
          </div>
          <div className="mt-8 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              <span className="text-gray-400">Genuine</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="text-gray-400">Exaggerated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="text-gray-400">Fake</span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-8">Technical Skill Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {result.skills.map((skill, idx) => (
          <div key={idx} className="bg-[#151a2f] p-6 rounded-2xl border border-white/5 hover:border-[#5b7cfa]/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg text-white group-hover:text-[#5b7cfa] transition-colors">{skill.name}</h4>
              <div className="text-xl">
                {getStatusIcon(skill.status)}
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-widest">
                <span>Confidence</span>
                <span>{skill.confidence}%</span>
              </div>
              <div className="w-full bg-[#0b0f1a] h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 delay-300 ${
                    skill.status === SkillStatus.GENUINE ? 'bg-green-500' : 
                    skill.status === SkillStatus.EXAGGERATED ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${skill.confidence}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed italic">
              "{skill.reason}"
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onReset}
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-white hover:bg-white/10 transition-all"
        >
          <i className="fa-solid fa-rotate-left mr-2"></i>
          Analyze Another Resume
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s ease-out; }
      `}</style>
    </div>
  );
};

export default ResultsDashboard;
