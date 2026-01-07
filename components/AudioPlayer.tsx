import React, { useState, useRef, useEffect } from 'react';
import { Disc, VolumeX } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const AUDIO_SOURCE = "/assets/tron.mp3"; 

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Autoplay prevented:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-fadeIn">
      <audio 
        ref={audioRef} 
        src={AUDIO_SOURCE} 
        loop 
        preload="auto"
      />

      <button 
        onClick={togglePlay}
        className="group relative flex items-center gap-3 bg-black/80 backdrop-blur-md border border-gray-800/50 rounded-full p-2 pr-5 hover:border-tron-cyan/50 transition-all shadow-lg"
      >

        <div className={`
          relative w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500
          ${isPlaying 
            ? 'border-tron-cyan bg-tron-cyan/10 shadow-[0_0_15px_rgba(0,240,255,0.6)]' 
            : 'border-gray-700 bg-black/50 group-hover:border-gray-500'}
        `}>

           <Disc 
             size={20} 
             className={`transition-all duration-700
               ${isPlaying 
                 ? 'text-tron-cyan animate-spin-slow' 
                 : 'text-gray-600'}
             `} 
           />
           
           {isPlaying && (
             <div className="absolute inset-0 rounded-full border border-tron-cyan opacity-40 animate-ping"></div>
           )}
        </div>

        <div className="flex flex-col items-start">
           <span className={`text-[10px] font-orbitron tracking-widest uppercase transition-colors duration-300
             ${isPlaying ? 'text-tron-cyan' : 'text-gray-500'}`}>
             Audio Core
           </span>
           
           <div className="flex items-end gap-1 h-3 mt-1">
             {isPlaying ? (
               <>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-1 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-2 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-3 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-4 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-5 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-6 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-7 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-8 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-9 rounded-sm"></div>
                 <div className="w-1 bg-tron-cyan/80 animate-equalizer-10 rounded-sm"></div>
               </>
             ) : (
               <div className="flex items-center gap-2 text-gray-600">
                  <div className="h-[1px] w-6 bg-gray-700"></div>
                  <VolumeX size={10} />
                  <div className="h-[1px] w-6 bg-gray-700"></div>
               </div>
             )}
           </div>
        </div>
      </button>
    </div>
  );
};

export default AudioPlayer;