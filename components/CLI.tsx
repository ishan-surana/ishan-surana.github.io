import React, { useState, useRef, useEffect } from 'react';
import { ViewState } from '../types';
import { X, Terminal as TerminalIcon, Minimize2, Maximize2 } from 'lucide-react';

interface CLIProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewState) => void;
}

interface CommandHistory {
  type: 'input' | 'output';
  content: string;
}

const CLI: React.FC<CLIProps> = ({ isOpen, onClose, onNavigate }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    { type: 'output', content: 'GRID_OS KERNEL [Version 2.0.0]' },
    { type: 'output', content: 'COPYRIGHT (C) 2024 SYSTEM CORE.' },
    { type: 'output', content: 'INITIALIZING USER SHELL...' },
    { type: 'output', content: 'READY. Type "help" for instructions.' }
  ]);
  const [isMaximized, setIsMaximized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
        endRef.current?.scrollIntoView();
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;
    
    const args = trimmedCmd.toLowerCase().split(' ');
    const command = args[0];

    let response = '';

    switch (command) {
      case 'help':
        response = `AVAILABLE COMMANDS:
  > ls          : List system directories
  > cd [dir]    : Change directory (navigate)
  > cat [file]  : Read file content
  > clear       : Clear terminal screen
  > whoami      : Identify user protocol
  > date        : Display system cycle
  > exit        : Terminate session`;
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'ls':
        response = `DIRECTORIES:
  /home
  /about
  /experience
  /portfolio
  /blog
  /contact

FILES:
  resume.pdf
  bio.txt
  credits.md`;
        break;
      case 'cd':
        if (args[1]) {
           const target = args[1].replace('/', '');
           if (['home', 'about', 'experience', 'portfolio', 'blog', 'contact'].includes(target)) {
             onNavigate(target as ViewState);
             response = `EXECUTING TRANSPORT TO SECTOR: /${target.toUpperCase()}...`;
           } else {
             response = `ERROR: SECTOR '/${target}' NOT FOUND OR RESTRICTED.`;
           }
        } else {
            response = 'USAGE: cd [directory_name]';
        }
        break;
      case 'cat':
        if (args[1] === 'bio.txt') {
            response = 'Full Stack Developer. Architect of digital frontiers. Obsessed with clean code and neon aesthetics.';
        } else if (args[1] === 'credits.md') {
            response = 'Built with React, Tailwind, and Gemini API. Inspired by TRON: Legacy.';
        } else if (args[1] === 'resume.pdf' || args[1] === 'resume') {
            response = 'INITIATING DOWNLOAD STREAM...';
            window.open('resume.pdf', '_blank');
        } else {
            response = `FILE '${args[1]}' NOT FOUND.`;
        }
        break;
      case 'whoami':
        response = 'USER_ID: GUEST_ENTITY\nACCESS_LEVEL: VISITOR\nLOCATION: UNKNOWN SECTOR';
        break;
      case 'date':
        response = `SYSTEM CYCLE: ${new Date().toISOString()}`;
        break;
      case 'exit':
        onClose();
        return;
      case 'sudo':
        response = 'ACCESS DENIED. YOU ARE NOT A USER.';
        break;
      default:
        response = `UNKNOWN COMMAND: '${command}'. TRY 'help'.`;
    }

    setHistory(prev => [
      ...prev, 
      { type: 'input', content: cmd },
      { type: 'output', content: response }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div 
        className={`bg-[#050505] border border-tron-cyan/50 shadow-[0_0_50px_rgba(0,240,255,0.2)] rounded overflow-hidden flex flex-col font-mono text-sm relative transition-all duration-300
          ${isMaximized ? 'w-full h-full' : 'w-full max-w-3xl h-[60vh]'}
        `}
      >
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>

        <div className="bg-tron-cyan/10 border-b border-tron-cyan/30 p-2 flex items-center justify-between z-30">
           <div className="flex items-center gap-3 px-2">
             <TerminalIcon size={16} className="text-tron-cyan" />
             <span className="text-tron-cyan font-orbitron tracking-widest text-xs">TERMINAL_ACCESS_V1.0</span>
           </div>
           <div className="flex items-center gap-2">
             <button onClick={() => setIsMaximized(!isMaximized)} className="text-tron-cyan hover:text-white p-1">
                {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
             </button>
             <button onClick={onClose} className="text-tron-cyan hover:text-white p-1">
               <X size={16} />
             </button>
           </div>
        </div>

        <div 
          className="flex-1 p-6 overflow-y-auto text-gray-300 space-y-2 scrollbar-thin scrollbar-thumb-tron-cyan/30 scrollbar-track-transparent z-30"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">
              {entry.type === 'input' ? (
                <div className="flex gap-2 text-white mt-4">
                  <span className="text-tron-cyan">guest@grid:~$</span>
                  <span>{entry.content}</span>
                </div>
              ) : (
                <div className="text-tron-cyan/80 pl-0 ml-0 animate-fadeIn">
                  {entry.content}
                </div>
              )}
            </div>
          ))}
          
          <div className="flex gap-2 text-white items-center mt-4">
            <span className="text-tron-cyan">guest@grid:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 text-white caret-tron-cyan"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
};

export default CLI;