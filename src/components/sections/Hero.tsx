import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { AIFloatingObject } from '../3d/AIFloatingObject';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradient */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Full-Screen 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
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
        <div className="flex flex-col gap-6 w-full max-w-4xl bg-black/40 backdrop-blur-md p-8 lg:p-12 rounded-2xl border border-white/5 shadow-2xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="inline-block py-1 px-3 rounded-full glass border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
              Junior AI/ML Engineer | Python Developer
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tighter mb-4">
              Building the <br />
              <span className="text-gradient">Intelligent Future</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
              Python developer and Machine Learning engineer specializing in NLP pipelines, text classification models, and chatbot systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-6 mt-4"
          >
            <a href="https://www.linkedin.com/in/nikita-digodiya-67a93b303/" target="_blank" rel="noopener noreferrer" className="social-btn linkedin" aria-label="LinkedIn">
              <FaLinkedinIn className="icon" />
            </a>
            <a href="https://leetcode.com/u/nikita_digodiya/" target="_blank" rel="noopener noreferrer" className="social-btn leetcode" aria-label="LeetCode">
              <SiLeetcode className="icon" />
            </a>
            <a href="https://github.com/Nickyit" target="_blank" rel="noopener noreferrer" className="social-btn github" aria-label="GitHub">
              <FaGithub className="icon" />
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
