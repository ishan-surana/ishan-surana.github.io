import React from 'react';
import { User, CodeXml, Cpu, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20">
      <div className="border-l-4 border-tron-cyan pl-6 mb-12">
        <h2 className="text-4xl font-orbitron text-white mb-2">
          IDENTITY DISC<span className="text-tron-cyan animate-cursor-blink">_</span>
        </h2>
        <p className="text-tron-cyan text-lg tracking-widest">USER PROFILE & SKILLS</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
        <div className="bg-tron-dark/50 border border-gray-800 p-8 rounded-lg backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <User size={120} className="text-tron-cyan" />
          </div>
          
          <h3 className="text-2xl font-orbitron text-tron-cyan mb-6 flex items-center gap-2">
            <span className="w-3 h-3 bg-tron-cyan rounded-sm"></span>
            BIO
          </h3>
          <div className="space-y-4 text-gray-300 font-rajdhani text-lg leading-relaxed">
            <p>I am currently a final year student at Manipal Institute of Technology, deeply passionate about computational intelligence and development. As a quick learner, I engage actively in local tech communities and often participate in AI/ML competitions, hackathons and Capture The Flag challenges. My technical interests also span across esoteric domains like quantum computing, alongside a keen enthusiasm for anime and movies.</p>
            <p>I am a technically driven problem solver with a strong foundation in machine learning, deep learning, web development and cybersecurity. My work consistently focuses on understanding why systems work the way they do: from the mathematical underpinnings of complex deep architectures to low level interactions with systems and primitives. I prioritize understanding and exhaustiveness over surface level implementations.</p>
            <p>Through projects, I have explored a wide spectrum of technical domains: building Android applications with adaptive NLP-driven behavior, designing complex ML-NLP hybrid architectures for recommendation and market basket analysis, implementing cryptographic systems without relying on black-box libraries, and designing full stack applications to solve real-world problems.</p>
          </div>
        </div>

        <div className="grid gap-9">
           <div className="border border-gray-800 bg-black/40 p-6 rounded-lg hover:border-tron-cyan/50 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-tron-cyan">
                <CodeXml size={40} />
                <h4 className="font-orbitron text-xl">PROGRAMMING LANGUAGES AND TECHNICAL SKILLS</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['C', 'Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'Rust', 'Bash', 'Data Structures and Algorithms', 'Object Oriented Programming', 'Web Development', 'Database Management', 'AI/ML', 'Networking', 'Cybersecurity', 'Software Engineering', 'Data Mining'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-tron-cyan/10 border border-tron-cyan/30 rounded text-sm text-tron-cyan">
                    {skill}
                  </span>
                ))}
              </div>
           </div>

           <div className="border border-gray-800 bg-black/40 p-6 rounded-lg hover:border-tron-orange/50 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-tron-orange">
                <Globe size={25} />
                <h4 className="font-orbitron text-xl">SOFTWARE DEVELOPMENT</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'JS', 'Bootstrap', 'Tailwind', 'React', 'Angular', 'MongoDB', 'MySQL', 'SQLite', 'PostgreSQL', 'Express', 'Django', 'Flask', 'Spring Boot', 'Neo4j', 'WebSockets', 'GitHub Actions CI/CD', 'Git', 'Microsoft Azure', 'AWS Suite', 'Jenkins', 'Docker'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-tron-orange/10 border border-tron-orange/30 rounded text-sm text-tron-orange">
                    {skill}
                  </span>
                ))}
              </div>
           </div>

           <div className="border border-gray-800 bg-black/40 p-6 rounded-lg hover:border-purple-400/50 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-purple-400">
                <Cpu size={25} />
                <h4 className="font-orbitron text-xl">OTHER TECHNICAL SKILLS</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Artificial Intelligence', 'Machine Learning', 'Natural Language Processing', 'Deep Learning', 'Image Processing', 'Computer Vision', 'Research', 'Time Series Analysis', 'Web Exploitation', 'Cryptography', 'Scraping'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded text-sm text-purple-400">
                    {skill}
                  </span>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;