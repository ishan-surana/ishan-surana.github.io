import React from 'react';
import { Project } from '../types';
import { ExternalLink, Github, Folder } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "FederaNet",
    description: "A multimodal cyberattack classification CNN model, built as a component of a federated framework utilizing a custom blockchain system complete with consensus, smart contracts and zero knowledge proofs.",
    techStack: ["Cryptography", "Post Quantum Cryptography", "PyCryptodome", "Blockchain", "Smart Contracts", "TensorFlow", "ScikitLearn", "Streamlit", "Flask"],
    imageUrl: "/assets/federanet.jpg",
    repoUrl: "https://github.com/ishan-surana/FederaNet",
    demoUrl: "https://multimodal-cyberattack-detection.streamlit.app/"
  },
  {
    id: 2,
    title: "cryptosystems",
    description: "The cryptosystems Python package offers classes for both symmetric and asymmetric cryptography, signature & verification, hashing, key exchange protocols and utility functions implemented from scratch in C.",
    techStack: ["Python Package", "Cryptography", "CTypes", "GMP", "Hashlib"],
    imageUrl: "/assets/cryptosystems.jpg",
    repoUrl: "https://github.com/ishan-surana/cryptosystems",
    demoUrl: "https://pypi.org/project/cryptosystems/"
  },
  {
    id: 3,
    title: "ChessMate",
    description: "A full-stack chess web application that allows users to use accounts and play chess with move validation in real-time rooms, view stored match history and receive worst move analysis with dynamic match data storage. It is built using MERN stack implementing webpages with API endpoints for the above functionalities along with Bootstrap, Redux and WebSockets for room creation.",
    techStack: ["MongoDB", "Express.js", "React", "WebSockets"],
    imageUrl: "/assets/chess-board.jpg",
    repoUrl: "https://github.com/ishan-surana/ChessMate",
    demoUrl: "#"
  },
  {
    id: 4,
    title: "RhythmRecommend",
    description: "An adaptive e-reader mobile application with music changing based on current text context. Uses AI and NLP to dynamically adjust ongoing soundtrack for enhanced reading immersion.",
    techStack: ["Java", "Android SDK", "PDFView", "PDFBox", "Picasso", "Gemini API"],
    imageUrl: "/assets/rr.jpg",
    repoUrl: "https://github.com/ishan-surana/RhythmRecommend",
    demoUrl: "#"
  },
  {
    id: 5,
    title: "MetaDataScraper",
    description: "MetaDataScraper is a Python package designed to automate the extraction of follower counts and post details from a public Facebook page. It uses Selenium WebDriver for web automation and scraping, without any API key.",
    techStack: ["Python Package", "Web Scraper", "Facebook/Meta", "Selenium", "Automation"],
    imageUrl: "/assets/mds.jpg",
    repoUrl: "https://github.com/ishan-surana/MetaDataScraper",
    demoUrl: "https://pypi.org/project/MetaDataScraper/"
  },
  {
    id: 6,
    title: "ClassRoom Allotment System",
    description: "Project developed with the purpose of automation and streamlining the process of room reservation and allocation within academic institutions, made as part of project for the course Database Systems. The backend is a Flask app with sqlite3 database, and uses HTML, CSS and JS for frontend.",
    techStack: ["HTML", "CSS", "JS", "Flask", "sqlite3"],
    imageUrl: "/assets/cras.jpg",
    repoUrl: "https://github.com/ishan-surana/ClassRoom-Allotment-System",
    demoUrl: "https://classroom-allotment-system.onrender.com/"
  }
];

const Projects: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="flex items-end justify-between mb-12 border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-4xl font-orbitron text-white mb-2">
            USER CONSTRUCTS
            <span className="text-tron-cyan animate-cursor-blink">_</span>
          </h2>
          <p className="text-tron-cyan text-lg tracking-widest">
            PROJECT GALLERY
          </p>
        </div>
        <div className="hidden md:block text-gray-500 font-mono text-sm">
          DIR: /ROOT/PROJECTS/PUBLIC
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {projects.map(project => (
          <div
            key={project.id}
            className="group bg-gray-900 border border-gray-800 overflow-hidden flex flex-col hover:border-tron-cyan transition-all duration-300 hover:shadow-neon-cyan hover:-translate-y-1"
          >
            <div className="relative h-72 overflow-hidden">
              <div className="absolute inset-0 bg-tron-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-tron-cyan to-transparent opacity-0 group-hover:opacity-100" />
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-orbitron text-white group-hover:text-tron-cyan transition-colors">
                    {project.title}
                  </h3>
                  <Folder
                    size={18}
                    className="text-gray-500 group-hover:text-tron-cyan"
                  />
                </div>

                <p className="text-gray-400 text-sm">
                  {project.description}
                </p>
              </div>

              <div className="flex-grow" />

              <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {project.techStack.map(tech => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-tron-cyan bg-tron-cyan/10 px-2 py-1 rounded border border-tron-cyan/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-800">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    <Github size={16} />
                    <span>CODE</span>
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="flex items-center gap-2 text-sm text-tron-cyan hover:text-white transition-colors ml-auto"
                  >
                    <ExternalLink size={16} />
                    <span>LAUNCH</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;