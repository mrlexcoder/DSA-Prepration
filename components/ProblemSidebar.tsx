
import React from 'react';
import { Problem, TabType } from '../types';
import { BookOpen, CheckCircle, Clock, ChevronLeft, ChevronRight, MessageSquare, Lightbulb } from 'lucide-react';

interface Props {
  problem: Problem;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onGetHint: () => void;
  hint: string | null;
}

const ProblemSidebar: React.FC<Props> = ({ problem, activeTab, setActiveTab, onGetHint, hint }) => {
  const difficultyColors = {
    Easy: 'text-green-500 bg-green-500/10',
    Medium: 'text-yellow-500 bg-yellow-500/10',
    Hard: 'text-red-500 bg-red-500/10'
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-r border-gray-800">
      {/* Tab Navigation */}
      <div className="flex items-center px-4 pt-3 space-x-4 border-b border-gray-800">
        {[TabType.DESCRIPTION, TabType.SOLUTIONS, TabType.SUBMISSIONS].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 px-1 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab 
                ? 'text-white border-blue-500' 
                : 'text-gray-400 border-transparent hover:text-gray-200'
            }`}
          >
            {tab === TabType.DESCRIPTION && <BookOpen className="inline-block w-4 h-4 mr-2" />}
            {tab === TabType.SOLUTIONS && <MessageSquare className="inline-block w-4 h-4 mr-2" />}
            {tab === TabType.SUBMISSIONS && <Clock className="inline-block w-4 h-4 mr-2" />}
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-700 rounded"><ChevronLeft size={20} /></button>
            <button className="p-1 hover:bg-gray-700 rounded"><ChevronRight size={20} /></button>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-6">
          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${difficultyColors[problem.difficulty]}`}>
            {problem.difficulty}
          </span>
          <span className="flex items-center text-gray-400 text-sm">
            <CheckCircle size={14} className="mr-1 text-green-500" /> 1.2M Solved
          </span>
        </div>

        <div className="prose prose-invert prose-sm max-w-none">
          <div className="whitespace-pre-wrap leading-relaxed text-gray-300">
            {problem.description}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <button 
            onClick={onGetHint}
            className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            <Lightbulb size={16} className="mr-2" />
            Stuck? Get a hint
          </button>
          {hint && (
            <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg text-sm text-blue-100 animate-in fade-in slide-in-from-top-2 duration-300">
              {hint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemSidebar;
