import React, { useState, useEffect } from 'react';
import { Github, Linkedin, FileText, Search } from 'lucide-react';
import { ViewState } from '../types';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [subtitle, setSubtitle] = useState('');
  const fullSubtitle = "Ishan Surana — Full Stack Developer | AI/ML Engineer & Researcher | Cybersecurity and Quantum computing enthusiast.";

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullSubtitle.length) {
        setSubtitle(fullSubtitle.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative w-full min-h-[calc(100vh-50px)] flex items-center justify-center overflow-hidden">
      
      <div className="relative z-10 text-center max-w-4xl px-4 mt-[-50px]">
        <div className="mb-6 inline-flex items-center space-x-2 border border-tron-cyan/30 px-4 py-1 rounded-full bg-black/40 backdrop-blur-md">
          <span className="w-2 h-2 bg-tron-cyan rounded-full animate-pulse shadow-neon-cyan" />
          <span className="text-tron-cyan text-sm tracking-widest uppercase font-orbitron">System Online</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white font-orbitron tracking-wider mb-6 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]">
          WELCOME TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-tron-cyan to-white">THE GRID, USER</span>
        </h1>

        <div className="text-xl text-gray-300 mb-10 font-rajdhani max-w-2xl mx-auto leading-relaxed drop-shadow-md min-h-[3.5rem]">
          {subtitle}
          <span className="inline-block w-0.5 h-5 ml-1 bg-tron-cyan animate-cursor-blink align-middle shadow-neon-cyan"></span>
        </div>

        <div className="flex flex-col items-center gap-8">
          <button 
            onClick={() => onNavigate('about')}
            className="cybr-btn w-72"
            style={{ '--primary': '#00f0ff', '--color': '#00f0ff' } as React.CSSProperties}
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">
              PROBE PROFILE <Search size={18} />
            </span>
            <span aria-hidden className="cybr-btn__glitch">ACCESS_DATA</span>
          </button>
          
          <span className="text-[10px] text-tron-cyan/60 font-orbitron tracking-[0.3em] animate-pulse">
            ACCESS FULL BIO & SKILL MATRIX
          </span>

          <div className="flex items-center gap-6 mt-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gray-700"></div>
            
            <a href="https://github.com/ishan-surana" target="_blank" className="text-gray-500 hover:text-purple-400 transition-colors hover:scale-110 transform duration-200 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] rounded-full" title="GitHub Database">
              <Github size={24} />
            </a>
            
            <a href="https://www.linkedin.com/in/ishansurana/" target="_blank" className="text-gray-500 hover:text-blue-400 transition-colors hover:scale-110 transform duration-200 hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] rounded-full" title="LinkedIn Network">
              <Linkedin size={24} />
            </a>

            <a href="/assets/resume.pdf" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-tron-orange transition-colors hover:scale-110 transform duration-200 hover:shadow-neon-orange rounded-full" title="Download Source File (Resume)">
              <FileText size={24} />
            </a>

            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};