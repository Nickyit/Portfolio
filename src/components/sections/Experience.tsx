import React, { useRef } from 'react';
import { Section } from '../layout/Section';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const experiences = [
  {
    role: 'Artificial Intelligence Intern',
    company: 'Persevex',
    period: 'Nov 2025 – Jan 2026',
    description: 'Applied machine learning and NLP techniques to real-world problem statements. Developed and evaluated supervised learning models using Python and Scikit-learn, implementing text preprocessing and feature engineering workflows.',
  },
];

export const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'center center'],
  });

  const rawPathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pathLength = useSpring(rawPathLength, { stiffness: 90, damping: 25, restDelta: 0.001 });

  return (
    <Section id="experience" title="Experience" subtitle="My professional journey in building intelligent systems.">
      <div ref={containerRef} className="relative mt-20 max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block">
          <motion.div
            style={{ scaleY: pathLength, transformOrigin: 'top' }}
            className="absolute top-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
          />
        </div>

        <div className="flex flex-col gap-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative flex flex-col md:flex-row justify-between items-center w-full">
              
              {/* Left Content (or right depending on index) */}
              <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'} mb-4 md:mb-0 relative`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  className="glass-card p-8 group hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
                >
                  <span className="text-blue-400 font-medium mb-2 block">{exp.period}</span>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-300">{exp.role}</h3>
                  <h4 className="text-gray-400 text-lg mb-4">{exp.company}</h4>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {exp.description}
                  </p>
                </motion.div>
              </div>

              {/* Center Dot */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                  className="relative flex items-center justify-center"
                >
                  <div className="absolute w-6 h-6 rounded-full bg-blue-500/25 animate-ping pointer-events-none" />
                  <div className="w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-blue-500 z-10 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                </motion.div>
              </div>

              {/* Empty Space for layout */}
              <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:order-2' : ''} hidden md:block`} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
