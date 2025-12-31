
import React, { useRef, useEffect } from 'react';
import { Play, Send, Settings, RotateCcw } from 'lucide-react';

interface Props {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isExecuting: boolean;
}

const Editor: React.FC<Props> = ({ code, onChange, onRun, onSubmit, onReset, isExecuting }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simple line numbers
  const lines = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lines, 30) }, (_, i) => i + 1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textareaRef.current?.selectionStart || 0;
      const end = textareaRef.current?.selectionEnd || 0;
      const newValue = code.substring(0, start) + '    ' + code.substring(end);
      onChange(newValue);
      
      // Reset cursor position after React re-renders
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a]">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#262626]">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded">
            Java 21
          </div>
          <button onClick={onReset} className="text-gray-400 hover:text-white transition-colors" title="Reset to default code">
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex overflow-hidden font-mono text-sm">
        {/* Line Numbers */}
        <div className="w-12 pt-4 bg-[#1a1a1a] text-right pr-4 text-gray-600 select-none border-r border-gray-800">
          {lineNumbers.map(n => (
            <div key={n} className="leading-6">{n}</div>
          ))}
        </div>
        
        {/* Code Input */}
        <div className="relative flex-1 group">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="absolute inset-0 w-full h-full p-4 leading-6 bg-transparent text-gray-300 resize-none outline-none caret-blue-500 z-10"
            spellCheck={false}
          />
          {/* Static highlighting placeholder (could be improved with PrismJS) */}
          <div 
            className="absolute inset-0 w-full h-full p-4 leading-6 pointer-events-none text-transparent whitespace-pre overflow-hidden"
            aria-hidden="true"
          >
            {code}
          </div>
        </div>
      </div>

      {/* Editor Footer */}
      <div className="flex items-center justify-end px-4 py-3 border-t border-gray-800 space-x-3 bg-[#1e1e1e]">
        <button
          onClick={onRun}
          disabled={isExecuting}
          className="flex items-center px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-all disabled:opacity-50"
        >
          {isExecuting ? 'Running...' : (
            <><Play size={14} className="mr-2" /> Run</>
          )}
        </button>
        <button
          onClick={onSubmit}
          disabled={isExecuting}
          className="flex items-center px-4 py-1.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-500 rounded transition-all disabled:opacity-50 shadow-lg shadow-green-900/20"
        >
          <Send size={14} className="mr-2" /> Submit
        </button>
      </div>
    </div>
  );
};

export default Editor;
