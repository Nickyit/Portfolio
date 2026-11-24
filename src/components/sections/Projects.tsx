import React, { useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { motion } from 'framer-motion';
import { Code, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    title: 'ATS Resume Analyzer',
    description: 'An AI-powered web application that analyzes resumes against target roles, providing an ATS compatibility report and actionable feedback using NLP.',
    tags: ['Python', 'Flask', 'React', 'NLP', 'AI'],
    image: 'Resume Analyzer',
    imagePath: '/ats-resume-analyzer.png',
    link: '#',
    github: 'https://github.com/Nickyit/ATS-Resume-Analyzer.git',
  },
  {
    title: 'Sentiment Analysis using NLP',
    description: 'Engineered a TF-IDF + Logistic Regression text classification pipeline in Python, achieving ~87% accuracy on a real-world sentiment dataset. Built a data preprocessing pipeline automating tokenization and vectorization.',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'NLP'],
    image: 'Sentiment Analysis',
    link: '#',
    github: 'https://github.com/Nickyit/Sentiment-analyze-app.git',
  },
  {
    title: 'NLP-Powered Chatbot',
    description: 'Developed an NLP-powered chatbot capable of handling 20+ intent categories using text preprocessing and pattern-matching logic. Implemented modular Python code with regex-based parsing.',
    tags: ['Python', 'Flask', 'FastAPI', 'NLP'],
    image: 'NLP Chatbot',
    link: '#',
    github: 'https://github.com/Nickyit/E-commerce-Chatbot.git',
  },
  {
    title: 'YouTube Video Summary Notes',
    description: 'An intelligent web application that generates concise summary notes from YouTube videos using AI. It processes transcripts and distills them into readable formats.',
    tags: ['Python', 'AI', 'NLP', 'React'],
    image: 'YouTube Summary',
    link: '#',
    github: 'https://github.com/Nickyit/YouTube-Video-Summary-notes.git',
  },
  {
    title: 'Expense Tracker Lite',
    description: 'Built a web-based expense tracker to record and review expenses by description, amount, category, and date. Implemented Flask routes and SQLAlchemy models to validate form submissions and persist expense data in SQLite.',
    tags: ['Python', 'Flask', 'Flask-SQLAlchemy', 'SQLite', 'Tailwind CSS'],
    image: 'Expense Tracker',
    imagePath: '/expense-tracker-lite.png',
    link: '#',
    github: '#',
  },
];

const ProjectCard = ({ project, isCenter }: { project: any, isCenter: boolean }) => {
  return (
    <div className={`group relative rounded-3xl overflow-hidden border border-white/10 flex flex-col h-full w-full transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:border-white/20 ${isCenter ? 'bg-[#050505]' : 'glass-card'}`}>
      {/* Project Image */}
      <div className="relative h-48 md:h-56 shrink-0 overflow-hidden bg-gray-900 border-b border-white/5">
          {project.imagePath ? (
            <img 
              src={project.imagePath} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium z-0">
              {project.image}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60 z-10 md:hidden" />
          {/* Hover effect on image placeholder */}
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        </div>
        
        {/* Project Content */}
        <div className="p-6 flex flex-col flex-1 relative z-20">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-medium text-white/70 bg-white/5 rounded-full border border-white/10 transition-colors duration-200 hover:bg-white/10 hover:border-white/20 hover:text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <a
              href={project.link}
              className="group/link flex items-center gap-1.5 text-sm font-bold text-white hover:text-blue-400 transition-colors duration-200"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
              Live Demo
            </a>
            <a
              href={project.github}
              className="group/code flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Code className="w-4 h-4 transition-transform duration-300 group-hover/code:scale-110" />
              Source Code
            </a>
          </div>
        </div>
    </div>
  );
};

export const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : projects.length - 1);
    } else {
      setCurrentIndex(currentIndex < projects.length - 1 ? currentIndex + 1 : 0);
    }
  };

  return (
    <Section
      id="projects"
      title="Featured Work"
      subtitle="Selected projects showcasing expertise in complex ML architectures and scalable deployments."
    >
      <div className="relative mt-12 mb-0 group/slider h-[480px] md:h-[580px] flex items-center justify-center perspective-[1200px]">
        {/* Slider Controls */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('left')}
          className="absolute left-0 md:left-4 z-40 p-3 rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/10 hidden md:block"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('right')}
          className="absolute right-0 md:right-4 z-40 p-3 rounded-full bg-black/60 border border-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/10 hidden md:block"
          aria-label="Next Project"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </motion.button>

        {/* Coverflow Cards */}
        {projects.map((project, index) => {
          const N = projects.length;
          let offset = (index - currentIndex + N) % N;
          if (offset > Math.floor(N / 2)) {
            offset -= N;
          }
          
          const isCenter = offset === 0;
          
          let x = 0;
          let scale = 1;
          let zIndex = 30;
          let opacity = 1;
          
          // Adjust position based on screen size
          const xOffset = windowWidth < 768 ? 60 : 300;
          const xFarOffset = windowWidth < 768 ? 120 : 500;
          
          if (offset === -1) {
            x = -xOffset;
            scale = 0.85;
            zIndex = 20;
            opacity = 0.5;
          } else if (offset === 1) {
            x = xOffset;
            scale = 0.85;
            zIndex = 20;
            opacity = 0.5;
          } else if (offset < -1) {
            x = -xFarOffset;
            scale = 0.7;
            zIndex = 10;
            opacity = 0;
          } else if (offset > 1) {
            x = xFarOffset;
            scale = 0.7;
            zIndex = 10;
            opacity = 0;
          }

          return (
            <motion.div
              key={index}
              onClick={() => setCurrentIndex(index)}
              drag={isCenter ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, { offset: dragOffset, velocity }) => {
                if (dragOffset.x < -50 || velocity.x < -300) {
                  scroll('right');
                } else if (dragOffset.x > 50 || velocity.x > 300) {
                  scroll('left');
                }
              }}
              initial={false}
              animate={{ x, scale, zIndex, opacity }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className={`absolute w-[85vw] sm:w-[450px] md:w-[600px] h-[450px] md:h-[550px] cursor-pointer transition-shadow duration-300 touch-pan-y ${
                isCenter ? 'shadow-[0_0_60px_rgba(56,189,248,0.2)] rounded-3xl' : ''
              }`}
            >
              {/* Overlay for non-center items to enhance depth (lighter) */}
              <div className={`absolute inset-0 bg-white/5 z-30 rounded-3xl pointer-events-none transition-opacity duration-500 ${isCenter ? 'opacity-0' : 'opacity-100'}`} />
              <ProjectCard project={project} isCenter={isCenter} />
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
