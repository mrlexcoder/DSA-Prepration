
import React, { useState, useEffect } from 'react';
import ProblemSidebar from './components/ProblemSidebar';
import Editor from './components/Editor';
import Console from './components/Console';
import { Problem, TabType, ExecutionResult } from './types';
import { DEFAULT_PROBLEMS } from './constants';
import { simulateExecution, getCodeHints } from './services/geminiService';
import { LayoutGrid, List, User, Bell, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [currentProblem, setCurrentProblem] = useState<Problem>(DEFAULT_PROBLEMS[0]);
  const [code, setCode] = useState<string>(currentProblem.starterCode);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DESCRIPTION);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [hint, setHint] = useState<string | null>(null);
  const [showConsole, setShowConsole] = useState<boolean>(true);

  useEffect(() => {
    setCode(currentProblem.starterCode);
    setExecutionResult(null);
    setHint(null);
  }, [currentProblem]);

  const handleRun = async () => {
    setIsExecuting(true);
    setShowConsole(true);
    try {
      const result = await simulateExecution(currentProblem, code);
      setExecutionResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = async () => {
    // For this prototype, Submit and Run use the same Gemini service
    handleRun();
  };

  const handleReset = () => {
    if (confirm('Reset code to default? Your current changes will be lost.')) {
      setCode(currentProblem.starterCode);
      setExecutionResult(null);
    }
  };

  const handleGetHint = async () => {
    const hintText = await getCodeHints(currentProblem, code);
    setHint(hintText);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-300 bg-[#1a1a1a]">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-4 py-2 bg-[#282828] border-b border-gray-800">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white italic">L</div>
            <span className="text-white font-bold tracking-tight text-lg">JavaLeed</span>
          </div>
          <div className="hidden md:flex items-center space-x-4 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Problems</a>
            <a href="#" className="text-gray-500 cursor-not-allowed">Contest</a>
            <a href="#" className="text-gray-500 cursor-not-allowed">Discuss</a>
            <a href="#" className="text-orange-400">Interview</a>
            <a href="#" className="text-gray-500 cursor-not-allowed">Store</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          <div className="flex items-center space-x-1 hover:bg-gray-700 px-2 py-1 rounded cursor-pointer group">
            <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
              <User size={16} />
            </div>
            <ChevronDown size={14} className="text-gray-500 group-hover:text-white" />
          </div>
          <button className="hidden sm:block text-xs bg-orange-500/10 text-orange-500 px-3 py-1.5 rounded font-bold hover:bg-orange-500 hover:text-white transition-all">
            Premium
          </button>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Problem Panel */}
        <div className="w-1/2 min-w-[300px]">
          <ProblemSidebar 
            problem={currentProblem} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onGetHint={handleGetHint}
            hint={hint}
          />
        </div>

        {/* Splitter Resize Handle (Visual Only) */}
        <div className="w-1 cursor-col-resize hover:bg-blue-500 bg-gray-800 transition-colors" />

        {/* Right Side: Editor and Console */}
        <div className="flex-1 flex flex-col min-w-[300px]">
          <div className={`flex-1 overflow-hidden ${showConsole ? 'h-2/3' : 'h-full'}`}>
            <Editor 
              code={code} 
              onChange={setCode} 
              onRun={handleRun} 
              onSubmit={handleSubmit}
              onReset={handleReset}
              isExecuting={isExecuting}
            />
          </div>
          
          {showConsole && (
            <div className="h-1/3">
              <Console result={executionResult} isExecuting={isExecuting} />
            </div>
          )}

          {/* Console Toggle Bar */}
          <div className="flex items-center justify-between px-4 py-1.5 bg-[#262626] border-t border-gray-800">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowConsole(!showConsole)}
                className="text-xs font-semibold text-gray-400 hover:text-white flex items-center"
              >
                {showConsole ? 'Hide Console' : 'Show Console'}
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center text-xs font-medium text-gray-400 hover:text-white">
                <List size={14} className="mr-1" /> Problems
              </button>
              <button className="flex items-center text-xs font-medium text-gray-400 hover:text-white">
                <LayoutGrid size={14} className="mr-1" /> Custom Testcase
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
