import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Minimize2, Terminal, Activity, Zap } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SystemMonitor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'SYSTEM ONLINE. AWAITING INPUT.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const res = await fetch('https://ishan-surana.vercel.app/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });

      const data = await res.json();
      const botMsg = data.response || 'ERROR: NO RESPONSE';

      setMessages(prev => [...prev, { role: 'model', text: botMsg }]);
    } catch (err) {
      console.error('Transmission Error:', err);
      setMessages(prev => [...prev, { role: 'model', text: 'ERROR: SIGNAL INTERRUPTED.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) =>
      part.startsWith('**') && part.endsWith('**') ? (
        <strong key={index} className="text-white font-bold text-base">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="absolute inset-0 bg-tron-cyan rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
        <div className="relative w-14 h-14 bg-black border-2 border-tron-cyan shadow-[0_0_15px_rgba(0,240,255,0.4)] rounded-full flex items-center justify-center transition-transform hover:scale-110 hover:rotate-12">
           <Cpu size={24} className="text-tron-cyan" />
        </div>
        <div className="absolute -top-10 right-0 bg-black/80 text-tron-cyan text-xs font-orbitron px-2 py-1 border border-tron-cyan/30 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          SYSTEM MONITOR
        </div>
      </button>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="fixed z-50 bg-black/95 border border-tron-cyan shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col font-rajdhani backdrop-blur-xl overflow-hidden animate-fadeIn
        bottom-0 left-0 right-0 h-[75vh] w-full rounded-t-xl
        md:bottom-6 md:right-6 md:left-auto md:w-[400px] md:h-[550px] md:rounded-xl"
    >
      {/* Header */}
      <div className="bg-tron-dark/80 p-3 border-b border-gray-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
           <Activity size={16} className="text-tron-cyan animate-pulse" />
           <span className="text-tron-cyan font-orbitron tracking-wider text-sm">SYSTEM MONITOR_AI</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-1">
          <Minimize2 size={18} />
        </button>
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-tron-cyan to-transparent opacity-50 shrink-0"></div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded text-sm leading-relaxed border whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-tron-cyan/10 border-tron-cyan/30 text-tron-cyan rounded-br-none' 
                  : 'bg-gray-900/80 border-gray-700 text-gray-300 rounded-bl-none shadow-[0_0_10px_rgba(0,0,0,0.5)]'
            }`}>
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-1 text-[10px] uppercase tracking-widest text-gray-500 font-orbitron">
                   <Terminal size={10} /> System
                </div>
              )}
              {msg.role === 'model' ? renderFormattedText(msg.text) : msg.text}
              
              {msg.role === 'model' && idx === messages.length - 1 && isTyping && (
                <span className="inline-block w-1.5 h-3 ml-1 bg-tron-cyan animate-pulse align-middle" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-3 bg-black border-t border-gray-800 flex items-center gap-2 shrink-0 pb-6 md:pb-3">
        <div className="relative flex-1">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter command..."
            className="w-full bg-gray-900 border border-gray-700 text-white px-3 py-2 text-sm rounded focus:outline-none focus:border-tron-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all font-mono"
            autoFocus
          />
        </div>
        <button 
          type="submit" 
          disabled={!input.trim() || isTyping}
          className="p-2 bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan rounded hover:bg-tron-cyan hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isTyping ? <Zap size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </form>
    </div>
  );
};

export default SystemMonitor;
