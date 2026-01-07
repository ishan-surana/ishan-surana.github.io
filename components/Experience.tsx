import React from 'react';
import { Briefcase, GraduationCap, ChevronRight, Puzzle, MapPin } from 'lucide-react';

interface ExperienceItem {
  id: number;
  type: 'work' | 'education' | 'activity';
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  logo: string;
  logoUrl: string;
}

const experienceData: ExperienceItem[] = [
  {
    id: 4,
    type: 'work',
    title: "SDE Intern - Client Analytics Team",
    organization: "AQR Capital",
    location: "Banglore, Karnataka",
    startDate: "May 2025",
    endDate: "Jul 2025",
    logo: "/assets/aqr.png",
    logoUrl: "https://www.aqr.com/",
    description: [
      "Developed an internal AI tool for simplified data access and visualization for non-technical stakeholders, aimed to eliminate need of building customized dashboards.",
      "Built a conversational chatbot interface that fetches, interprets and visualizes real-time business data based on natural language queries, and enabled session-based customisation of data and prompt, with response times averaging from 5 to 10 seconds.",
      "Implemented LLM integration strategies, including structured knowledge bases and customizable frameworks, successfully working with several large scale cross-database connected tabular data with hundreds of columns and millions of rows each."
    ]
  },
  {
    id: 3,
    type: 'work',
    title: "Machine Learning Intern",
    organization: "Brainvire Infotech",
    location: "Mumbai, Maharashtra",
    startDate: "May 2024",
    endDate: "Jul 2024",
    logo: "/assets/brainvire.png",
    logoUrl: "https://brainvire.com/",
    description: [
      "Developed scripts and applications to meet various needs of our clients, primarily focusing on sales prediction and forecasting (utilizing statistical and regressive ML models).",
      "Implemented and tested model pipelines, ensuring reproducibility of results with low latency. The best model had train and test accuracies (R2 score) of 91% and 84% respectively, on large datasets with 10M+ rows.",
      "Improved efficiency in projects involving social media data scraping, ID validation, chatbot testing and more."
    ]
  },
  {
    id: 2,
    type: 'activity',
    title: "Senior Core Team Member",
    organization: "Cryptonite",
    location: "Manipal, Karnataka",
    startDate: "Dec 2022",
    endDate: "PRESENT",
    logo: "/assets/cryptonite.jpeg",
    logoUrl: "https://cryptonite.in/",
    description: [
      "Participated in CTFs as part of the official cybersecurity team of MIT Manipal, mostly delving in web exploitation domain.",
      "Organized and helped host niteCTF 2023 and prepared 2 challenges (regarding SQLi and steganography)",
      "Active involvement in the AI/ML and research domains, with work on federated cyberattack analysis incorporating blockchain-based consensus mechanisms and ontology representation and reasoning incorporating knowledge graphs.",
    ]   
  },
  {
    id: 1,
    type: 'education',
    title: "B.Tech in Information Technology",
    organization: "Manipal Institute of Technology",
    location: "Manipal, Karnataka",
    startDate: "Aug 2022",
    endDate: "PRESENT",
    logo: "/assets/mit.png",
    logoUrl: "https://manipal.edu/mit",
    description: [
      "Pursuing B.Tech in Information Technology from Manipal Institute of Technology with a CGPA of 8.48.",
      "Pursuing Minor B.Tech in Computational Intelligence, working on research project involving fake news classification via heterogeneous graph neural networks.",
      "Pursuing Honours in AI/ML, working on research paper involving market basket analysis via ML-NLP-DL hybrid architecture.",
      "Worked on a total of 5 research papers across various domains like time series forecasting via Transformers, information retrieval via modified cosine similarity, and more as part of Cryptonite, the official cybersecurity team of MIT Manipal.",
    ]
  }
];

const toDate = (d: string) =>
    new Date(d === "PRESENT" ? Date.now() : /^[A-Za-z]{3}\s\d{4}$/.test(d) ? `${d.split(" ")[0]} 1, ${d.split(" ")[1]}`: d);

const Experience: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="mb-16 border-b border-gray-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="border-l-4 border-tron-orange pl-6">
          <h2 className="text-4xl font-orbitron text-white mb-2">
            RUNTIME HISTORY<span className="text-tron-orange animate-cursor-blink">_</span>
          </h2>
          <p className="text-tron-orange text-lg tracking-widest">CAREER & EDUCATION LOGS</p>
        </div>
        <div className="text-gray-500 hover:text-white transition-colors font-mono text-sm uppercase tracking-wider">
            Total Cycles: {((totalMonths: number) =>
            `${Math.floor(totalMonths / 12)} years, ${totalMonths % 12} months`)(
              experienceData.filter(e => e.type === "work").reduce((m, e) => {
                const s = toDate(e.startDate);
                const d = toDate(e.endDate);
                return m + (d.getFullYear() - s.getFullYear()) * 12 + (d.getMonth() - s.getMonth());
            }, 0))}
        </div>
      </div>

      <div className="relative">
        
        <div className="absolute left-6 md:left-64 top-0 bottom-0 w-px bg-gray-800"></div>
        <div className="absolute left-6 md:left-64 top-0 w-px h-full bg-gradient-to-b from-tron-cyan via-purple-500 to-tron-orange opacity-30"></div>

        <div className="space-y-16">
          {experienceData.map((item) => {
            let color: 'cyan' | 'orange' | 'purple';
            
            switch (item.type) {
              case 'education':
                color = 'orange';
                break;
              case 'activity':
                color = 'purple';
                break;
              case 'work':
              default:
                color = 'cyan';
                break;
            }

            const themeColor = color === 'cyan' ? 'text-tron-cyan border-tron-cyan shadow-neon-cyan' : 
                               color === 'orange' ? 'text-tron-orange border-tron-orange shadow-neon-orange' : 
                               'text-purple-400 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)]';
            
            const bgHover = color === 'cyan' ? 'group-hover:border-tron-cyan/50' : 
                            color === 'orange' ? 'group-hover:border-tron-orange/50' : 
                            'group-hover:border-purple-400/50';

            const bulletColor = color === 'cyan' ? 'text-tron-cyan' : 
                                color === 'orange' ? 'text-tron-orange' : 
                                'text-purple-400';
            
            const pingColor = color === 'cyan' ? 'bg-tron-cyan' : 
                              color === 'orange' ? 'bg-tron-orange' : 
                              'bg-purple-500';


            return (
              <div key={item.id} className="relative flex flex-col md:flex-row gap-8 group">
                
                <div className="md:w-64 flex-shrink-0 flex md:flex-col md:items-end md:text-right md:pr-12 pl-16 md:pl-0 pt-2 relative">
                   <div className="flex md:flex-col items-baseline md:items-end gap-2 md:gap-0">
                     <span className={`font-orbitron text-2xl font-bold tracking-widest ${themeColor.split(' ')[0]}`}>
                       {item.startDate}
                     </span>
                     
                     <div className="hidden md:flex flex-col items-end mr-[75px] my-2">
                        <div className={`w-0.5 h-6 ${pingColor} shadow-[0_0_8px_currentColor] opacity-80 rounded-full`}></div>
                     </div>
                     <div className="md:hidden mx-2 opacity-80">
                        <div className={`w-6 h-0.5 mb-2 ${pingColor} shadow-[0_0_8px_currentColor] opacity-80 rounded-full`}></div>
                     </div>

                     <span className={`font-orbitron text-2xl font-bold tracking-widest ${themeColor.split(' ')[0]} ${item.endDate === 'PRESENT' ? 'animate-pulse' : ''}`}>
                       {item.endDate || 'PRESENT'}
                     </span>
                   </div>
                </div>

                {/* Mobile: top-6 aligns with the single row. Desktop: top-14 aligns with the center of the vertical stack */}
                <div className="absolute left-6 md:left-64 -translate-x-1/2 top-6 md:top-14 w-4 h-4 bg-black border border-gray-500 rounded-full z-10 group-hover:scale-125 transition-transform duration-300 group-hover:border-white">
                   <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 animate-ping ${pingColor}`}></div>
                </div>

                <div className="flex-1 pl-12 md:pl-8">
                  <div className={`bg-gray-900/30 border border-gray-800 p-6 md:p-8 rounded-lg backdrop-blur-sm relative transition-all duration-300 hover:-translate-y-1 hover:bg-gray-900/50 ${bgHover}`}>
                    
                    <div className="absolute top-8 -left-8 w-8 h-px bg-gray-800 group-hover:bg-gray-600 transition-colors"></div>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                      <div className="flex items-start gap-4 flex-1">
                        <a href={item.logoUrl} target="_blank" rel="noreferrer">
                          <div className="w-14 h-14 rounded border border-gray-700 overflow-hidden bg-black flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-shadow">
                            <img src={item.logo} alt={item.organization} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </a>
                        
                        <div className="flex-1">
                          <h3 className={`text-2xl font-orbitron mb-2 ${themeColor.split(' ')[0]}`}>
                            {item.title}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm md:text-base">
                             <a href={item.logoUrl} target="_blank" rel="noreferrer">
                              <span className="text-gray-200 font-rajdhani font-bold text-lg tracking-wide">
                               {item.organization}
                             </span>
                             </a>
                             
                             <span className="hidden md:inline text-gray-700">|</span>
                             
                             <span className="flex items-center gap-1.5 text-gray-400 font-rajdhani">
                               <MapPin size={14} className={bulletColor} />
                               {item.location}
                             </span>

                             <span className="hidden md:inline text-gray-700">|</span>

                             <span className={`text-[10px] font-mono px-2 py-0.5 rounded border border-opacity-30 bg-opacity-5 bg-white uppercase tracking-wider ${themeColor.split(' ')[0].replace('text-', 'border-')}`}>
                               {item.type}
                             </span>
                          </div>
                        </div>
                      </div>

                      <div className={`hidden md:flex p-2 rounded bg-black/40 border border-gray-800 shrink-0 ${themeColor.split(' ')[0]}`}>
                         {item.type === 'work' ? <Briefcase size={20} /> : 
                          item.type === 'education' ? <GraduationCap size={20} /> : 
                          <Puzzle size={20} />}
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {item.description.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400 font-rajdhani text-base leading-relaxed group-hover:text-gray-300 transition-colors">
                          <ChevronRight size={16} className={`mt-1 shrink-0 ${bulletColor}`} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;