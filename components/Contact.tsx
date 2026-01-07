import React, { useState } from 'react';
import { Github, MapPin, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mail service not yet implemented. Please contact via other channels!');
    // TODO: Integrate email service here
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-orbitron text-white mb-4">
          ESTABLISH CONNECTION<span className="text-tron-orange animate-cursor-blink">_</span>
        </h2>
        <div className="h-1 w-24 bg-tron-orange mx-auto shadow-neon-orange"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 bg-black/50 border border-gray-800 p-8 rounded-xl backdrop-blur-md">
        
        <div className="space-y-8">
          <h3 className="text-2xl font-orbitron text-white">CONTACT CHANNELS</h3>
          <p className="text-gray-400">
            Available for freelance contracts, full-time opportunities or collaborative grid missions.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-gray-300 group hover:text-tron-orange transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-tron-orange group-hover:shadow-neon-orange transition-all">
                <Github size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">GitHub</p>
                <a href="https://github.com/ishan-surana/" target="_blank" className="font-mono underline">ishan-surana</a>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300 group hover:text-tron-cyan transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-tron-cyan group-hover:shadow-neon-cyan transition-all">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Location</p>
                <p className="font-mono">Mumbai, India / Remote</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-gray-300 group hover:text-purple-500 transition-colors cursor-pointer">
              <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center border border-gray-700 group-hover:border-purple-500 group-hover:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition-all">
                <Linkedin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Linkedin</p>
                <a href="https://linkedin.com/in/ishansurana/" target="_blank" className="font-mono underline">Ishan Surana</a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs text-tron-cyan uppercase tracking-wider ml-1">User ID / Name</label>
            <input 
              type="text" 
              // required
              className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-tron-cyan focus:shadow-neon-cyan transition-all font-mono"
              placeholder="Enter name..."
              value={formState.name}
              onChange={e => setFormState({...formState, name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-tron-cyan uppercase tracking-wider ml-1">Digital Address</label>
            <input 
              type="email" 
              // required
              className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-tron-cyan focus:shadow-neon-cyan transition-all font-mono"
              placeholder="Enter email..."
              value={formState.email}
              onChange={e => setFormState({...formState, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-tron-cyan uppercase tracking-wider ml-1">Data Packet</label>
            <textarea 
              rows={4}
              // required
              className="w-full bg-gray-900/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-tron-cyan focus:shadow-neon-cyan transition-all font-mono"
              placeholder="Enter your message..."
              value={formState.message}
              onChange={e => setFormState({...formState, message: e.target.value})}
            />
          </div>

          <div className="flex justify-center pt-4">
            <button 
              type="submit"
              className="cybr-btn w-full"
            >
              <span className="relative z-10 flex items-center gap-2">
                Transmit Data <Send size={16} />
              </span>
              <span aria-hidden className="cybr-btn__glitch">Transmit Data_</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Contact;