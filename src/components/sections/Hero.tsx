import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { motion, type Variants, useInView } from 'framer-motion';
import { AIFloatingObject } from '../3d/AIFloatingObject';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const isInView = useInView(heroRef, { margin: '200px' });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Glows (GPU-friendly single-pass radial gradients, zero heavy blur filter passes) */}
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(37, 99, 235, 0.18) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none" 
        style={{ background: 'radial-gradient(circle, rgba(147, 51, 234, 0.18) 0%, transparent 70%)' }}
      />

      {/* Full-Screen 3D Background - Frameloop pauses when hero is scrolled out of view */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 45 }}
          frameloop={isInView ? 'always' : 'never'}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <AIFloatingObject />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.2}
              minPolarAngle={Math.PI / 2 - 0.2}
            />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-6 md:px-12 flex items-center relative z-10 min-h-screen pointer-events-none">

        {/* Text Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 w-full max-w-4xl bg-black/40 backdrop-blur-md p-6 sm:p-8 lg:p-12 rounded-2xl border border-white/5 shadow-2xl pointer-events-auto"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block py-1 px-3 rounded-full glass border border-blue-500/30 text-blue-400 text-sm font-medium transition-all duration-300 hover:border-blue-400/60 hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]">
              Junior AI/ML Engineer | Python Developer
            </span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tighter"
          >
            Building the <br />
            <span className="text-gradient">Intelligent Future</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg"
          >
            Python developer and Machine Learning engineer specializing in NLP pipelines, text classification models, and chatbot systems.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-6 mt-2"
          >
            <motion.a 
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              href="https://www.linkedin.com/in/nikita-digodiya-67a93b303/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn linkedin" 
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="icon" />
            </motion.a>
            <motion.a 
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              href="https://leetcode.com/u/nikita_digodiya/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn leetcode" 
              aria-label="LeetCode"
            >
              <SiLeetcode className="icon" />
            </motion.a>
            <motion.a 
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              href="https://github.com/Nickyit" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn github" 
              aria-label="GitHub"
            >
              <FaGithub className="icon" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
