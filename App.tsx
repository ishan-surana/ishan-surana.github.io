import React, { useState } from 'react';
import { NavItem, ViewState } from './types';
import { Home, User, GraduationCap, Briefcase, Newspaper, Mail, FileText, Terminal, Loader2 } from 'lucide-react';
import { Hero } from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Blog from './components/Blog';
import SystemMonitor from './components/SystemMonitor';
import CLI from './components/CLI';
import AudioPlayer from './components/AudioPlayer';

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home size={18} /> },
  { id: 'about', label: 'About', icon: <User size={18} /> },
  { id: 'experience', label: 'Experience', icon: <GraduationCap size={18} /> },
  { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={18} /> },
  { id: 'blog', label: 'Blog', icon: <Newspaper size={18} /> },
  { id: 'contact', label: 'Contact', icon: <Mail size={18} /> },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCLIOpen, setIsCLIOpen] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionLabel, setTransitionLabel] = useState('');

  const handleNavigate = (view: ViewState) => {
    if (view === currentView || isTransitioning) return;
    
    setTransitionLabel(view.toUpperCase());
    setIsTransitioning(true);
    setMobileMenuOpen(false);

    setTimeout(() => {
      setCurrentView(view);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }, 500);
  };

  const renderView = () => {
    switch(currentView) {
      case 'home': 
        return (
          <Hero 
            onNavigate={(view) => handleNavigate(view)} 
          />
        );
      case 'about': return <About />;
      case 'experience': return <Experience />;
      case 'portfolio': return <Projects />;
      case 'blog': return <Blog />;
      case 'contact': return <Contact />;
      default: return (
        <Hero 
          onNavigate={(view) => handleNavigate(view)} 
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-tron-black text-gray-200 selection:bg-tron-cyan selection:text-black flex flex-col relative overflow-hidden">
      
      <div 
        className={`fixed inset-x-0 top-0 bg-black z-[110] transition-transform duration-500 ease-in-out will-change-transform border-b border-tron-cyan/50 shadow-[0_0_50px_rgba(0,240,255,0.2)]
          ${isTransitioning ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ height: '50vh' }}
      >
         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
         <div className="absolute bottom-0 w-full h-[2px] bg-tron-cyan shadow-[0_0_15px_#00f0ff]"></div>
      </div>

      <div 
        className={`fixed inset-x-0 bottom-0 bg-black z-[110] transition-transform duration-500 ease-in-out will-change-transform border-t border-tron-cyan/50 shadow-[0_0_50px_rgba(0,240,255,0.2)] flex items-start justify-center pt-8
          ${isTransitioning ? 'translate-y-0' : 'translate-y-full'}`}
        style={{ height: '50vh' }}
      >
         <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
         <div className="absolute top-0 w-full h-[2px] bg-tron-cyan shadow-[0_0_15px_#00f0ff]"></div>
         
         <div className={`flex flex-col items-center gap-4 transition-opacity duration-300 delay-300 ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin text-tron-cyan" size={24} />
              <span className="font-orbitron text-xl tracking-[0.2em] text-white">
                INITIALIZING SECTOR <span className="text-tron-cyan">// {transitionLabel}</span>
              </span>
            </div>
            <div className="w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
               <div className="h-full bg-tron-cyan animate-[grid-flow_1s_linear_infinite]" style={{ width: '60%' }}></div>
            </div>
         </div>
      </div>

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-30 z-10" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 z-20" />
      </div>

      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          <div 
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-tron-cyan blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <div className="w-8 h-8 rounded-full border-2 border-tron-cyan flex items-center justify-center animate-spin-slow group-hover:shadow-neon-cyan transition-all">
                 <div className="w-2 h-2 bg-tron-cyan rounded-full"></div>
              </div>
            </div>
            <span className="font-orbitron text-2xl font-bold tracking-widest text-white group-hover:text-tron-cyan transition-colors">
              GRID<span className="text-gray-600">.OS</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id as ViewState)}
                className={`flex items-center gap-2 text-sm uppercase tracking-widest font-rajdhani font-semibold transition-all duration-300 relative py-2
                  ${currentView === item.id 
                    ? 'text-tron-cyan shadow-[0_1px_0_0_#00f0ff]' 
                    : 'text-gray-400 hover:text-white hover:shadow-[0_1px_0_0_rgba(255,255,255,0.5)]'
                  }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            
            <div className="h-6 w-px bg-gray-700 mx-2"></div>

            <button
              onClick={() => setIsCLIOpen(true)}
              className="text-gray-400 hover:text-tron-cyan transition-colors"
              title="Open Terminal"
            >
              <Terminal size={20} />
            </button>

            <a 
              href="/assets/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="cybr-btn cybr-btn-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FileText size={16} />
                RESUME
              </span>
              <span aria-hidden className="cybr-btn__glitch">RESUME_</span>
            </a>
          </nav>

          <button 
            className="md:hidden text-tron-cyan"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
             <div className="space-y-2">
                <span className={`block w-8 h-0.5 bg-tron-cyan transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-tron-cyan transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-8 h-0.5 bg-tron-cyan transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
             </div>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-b border-gray-800">
            <div className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id as ViewState)}
                  className={`flex items-center gap-4 p-3 rounded transition-colors
                    ${currentView === item.id 
                      ? 'bg-tron-cyan/10 text-tron-cyan' 
                      : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {item.icon}
                  <span className="font-orbitron uppercase">{item.label}</span>
                </button>
              ))}
              
              <button
                  onClick={() => {
                    setIsCLIOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-4 p-3 rounded transition-colors text-gray-400 hover:text-white"
                >
                  <Terminal size={18} />
                  <span className="font-orbitron uppercase">TERMINAL</span>
                </button>

               <a 
                  href="#"
                  className="flex items-center gap-4 p-3 text-tron-orange border border-tron-orange/30 bg-tron-orange/5 rounded"
                >
                  <FileText size={18} />
                  <span className="font-orbitron uppercase">ACCESS RESUME</span>
                </a>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-20 relative min-h-screen flex flex-col">
        <div key={currentView} className="flex-grow flex flex-col relative z-10 animate-slide-up origin-top">
          {renderView()}
        </div>
      </main>

      <SystemMonitor />
      <AudioPlayer />

      <CLI 
        isOpen={isCLIOpen} 
        onClose={() => setIsCLIOpen(false)} 
        onNavigate={(view) => {
          setIsCLIOpen(false);
          handleNavigate(view);
        }}
      />

      <footer className="border-t border-gray-900 bg-black/90 py-8 mt-auto z-10 relative backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 font-mono text-sm">
            © {new Date().getFullYear()} THE GRID. SYSTEM INTEGRITY OPTIMAL.
          </p>
          <div className="flex gap-6">
             <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e] animate-pulse"></span>
             <span className="text-xs text-gray-500 tracking-widest">SERVER STATUS: ONLINE</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;