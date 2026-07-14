import React from 'react';
import { Sparkles } from 'lucide-react';

const skillsList = [
  'HTML',
  'CSS',
  'JAVASCRIPT',
  'PYTHON',
  'NUMPY',
  'PANDAS',
  'SCIKIT-LEARN',
  'C++',
  'FIGMA',
  'MACHINE LEARNING',
  'NLP',
  'SQL',
  'GIT',
  'GITHUB',
  'VS CODE',
  'JUPYTER NOTEBOOK',
];

export const InfiniteSkills = () => {
  return (
    <div className="w-full overflow-hidden bg-[#0a0a0a] py-6 md:py-10 border-y border-white/5 relative flex items-center">
      {/* Gradient masks for smooth fade-in/fade-out at edges */}
      <div className="absolute left-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div className="flex w-max animate-scroll items-center gap-10 md:gap-16 pr-10 md:pr-16">
        {/* We duplicate the array to ensure smooth seamless looping */}
        {[...skillsList, ...skillsList].map((skill, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className="hover-magnify font-black text-4xl md:text-6xl tracking-tighter uppercase whitespace-nowrap transition-all duration-300 cursor-default
                  text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.15)]
                  hover:text-blue-500 hover:[-webkit-text-stroke:0px] hover:drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]"
              >
                {skill}
              </div>
              
              <div className="text-blue-500/80">
                {/* 4-point star icon similar to the screenshot */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
                </svg>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
