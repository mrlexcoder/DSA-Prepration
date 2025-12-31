
import React from 'react';
import { ExecutionResult } from '../types';
import { Terminal, Check, X, AlertCircle, Zap } from 'lucide-react';

interface Props {
  result: ExecutionResult | null;
  isExecuting: boolean;
}

const Console: React.FC<Props> = ({ result, isExecuting }) => {
  if (isExecuting) {
    return (
      <div className="flex flex-col h-full bg-[#1a1a1a] border-t border-gray-800 p-4">
        <div className="flex items-center text-blue-400 space-x-2 animate-pulse">
          <Zap size={18} />
          <span className="text-sm font-medium">Executing code in virtual JVM...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col h-full bg-[#1a1a1a] border-t border-gray-800 p-4">
        <div className="flex items-center text-gray-500 space-x-2">
          <Terminal size={18} />
          <span className="text-sm">Run your code to see results here.</span>
        </div>
      </div>
    );
  }

  const statusColors = {
    'Accepted': 'text-green-500',
    'Wrong Answer': 'text-red-500',
    'Runtime Error': 'text-red-400',
    'Compile Error': 'text-red-400'
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] border-t border-gray-800 overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-2 bg-[#262626] border-b border-gray-800 sticky top-0">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-bold ${statusColors[result.status]}`}>
            {result.status}
          </span>
          {result.status === 'Accepted' && <Check size={16} className="text-green-500" />}
          {(result.status === 'Wrong Answer' || result.status === 'Runtime Error') && <X size={16} className="text-red-500" />}
        </div>
        <div className="text-xs text-gray-500">
          Runtime: <span className="text-gray-300">{result.runtime}ms</span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Error Output */}
        {(result.stderr || result.status === 'Compile Error') && (
          <div className="bg-red-900/10 border border-red-500/20 rounded p-3">
            <div className="flex items-center text-red-400 text-xs font-bold mb-2 uppercase tracking-wider">
              <AlertCircle size={14} className="mr-2" /> Error Output
            </div>
            <pre className="font-mono text-xs text-red-300 whitespace-pre-wrap">
              {result.stderr}
            </pre>
          </div>
        )}

        {/* Stdout */}
        {result.stdout && (
          <div>
            <div className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wider">Standard Output</div>
            <pre className="font-mono text-sm text-gray-300 bg-gray-900/50 p-3 rounded">
              {result.stdout}
            </pre>
          </div>
        )}

        {/* Test Cases */}
        {result.testResults.length > 0 && (
          <div className="space-y-4">
            <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">Test Cases</div>
            {result.testResults.map((test, idx) => (
              <div key={idx} className={`border rounded overflow-hidden ${test.passed ? 'border-gray-800' : 'border-red-900/30'}`}>
                <div className="flex items-center justify-between px-3 py-2 bg-[#262626] border-b border-gray-800">
                  <span className="text-xs font-medium text-gray-400">Case {idx + 1}</span>
                  {test.passed 
                    ? <span className="text-[10px] text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded font-bold">PASSED</span>
                    : <span className="text-[10px] text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded font-bold">FAILED</span>
                  }
                </div>
                <div className="p-3 space-y-2 text-xs font-mono">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-gray-500 mb-1">Input</div>
                      <div className="text-gray-300 bg-black/30 p-2 rounded">{test.input}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Output</div>
                      <div className={`p-2 rounded ${test.passed ? 'text-green-400 bg-green-950/20' : 'text-red-400 bg-red-950/20'}`}>
                        {test.actual}
                      </div>
                    </div>
                  </div>
                  {!test.passed && (
                    <div className="pt-2">
                      <div className="text-gray-500 mb-1">Expected</div>
                      <div className="text-gray-300 bg-black/30 p-2 rounded">{test.expected}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Console;
