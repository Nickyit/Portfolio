import React, { useEffect, useState, useRef } from 'react';
import { Section } from '../layout/Section';
import { motion, useInView } from 'framer-motion';
import { TiltCard } from '../ui/TiltCard';
import { Brain, MessageSquare, Sparkles, GraduationCap, Briefcase, Code2, FolderGit2, Calendar } from 'lucide-react';

const AnimatedCounter = ({ to, duration = 2 }: { to: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const steps = duration * 60;
      const increment = to / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= to) {
          setCount(to);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(current));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}</span>;
};

export const About = () => {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Passionate about applying ML and NLP to solve real-world problems."
    >
      <div className="flex flex-col gap-12 md:gap-20 mt-12">
        {/* Top Section: Image and Text */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left: Image & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group w-full max-w-sm mx-auto lg:ml-auto lg:mr-12 order-1 lg:order-1"
          >
            {/* Subtle glowing background behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition duration-700"></div>
            
            {/* Image Container with floating animation */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <TiltCard className="relative aspect-[4/5] rounded-3xl overflow-hidden glass shadow-2xl shadow-blue-500/10">
                <img 
                  src="/profile.jpg" 
                  alt="Nikita Digodiya" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </TiltCard>
            </motion.div>

            {/* Replacement for Graduation Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-8 -left-4 lg:-left-12 glass p-4 rounded-2xl shadow-xl border border-white/10 flex flex-col gap-3 backdrop-blur-xl bg-black/40"
            >
              <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                <Brain className="w-4 h-4 text-blue-400" /> Machine Learning
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                <MessageSquare className="w-4 h-4 text-purple-400" /> Natural Language Processing
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300 font-medium">
                <Sparkles className="w-4 h-4 text-pink-400" /> Generative AI
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8 order-2 lg:order-2"
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Building Intelligent Applications with AI & Python
              </h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
            
            <div className="space-y-5 text-gray-400 text-base sm:text-lg leading-relaxed max-w-prose">
              <p>
                I am a Junior AI/ML Engineer and Python Developer with a strong foundation in building robust data pipelines, text classification models, and NLP-powered chatbot systems. Through my professional internship at Persevex, I transformed real-world problem statements into supervised learning models using Scikit-learn and Pandas.
              </p>
              <p>
                Currently pursuing my Bachelor of Engineering in Computer Science, I possess an avid learning mindset. Whether participating in competitive programming on LeetCode or expanding my skills in TensorFlow and Hugging Face, I am committed to engineering elegant, production-ready AI solutions.
              </p>
            </div>

            {/* Information Cards (Education & Internship) */}
            <div className="grid sm:grid-cols-2 gap-6 mt-4">
              <div className="relative group/card h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent opacity-0 group-hover/card:opacity-100 rounded-2xl transition-opacity duration-500 blur-md" />
                <div className="relative h-full p-6 glass rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-white/5 to-transparent">
                  <GraduationCap className="w-8 h-8 text-blue-400 mb-4" />
                  <h4 className="font-bold text-white mb-1">Education</h4>
                  <p className="text-sm text-gray-400">B.E. Computer Science</p>
                  <p className="text-xs text-gray-500 mt-2">RGPV, Indore (2023 - 2027)</p>
                </div>
              </div>

              <div className="relative group/card h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent opacity-0 group-hover/card:opacity-100 rounded-2xl transition-opacity duration-500 blur-md" />
                <div className="relative h-full p-6 glass rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-b from-white/5 to-transparent">
                  <Briefcase className="w-8 h-8 text-purple-400 mb-4" />
                  <h4 className="font-bold text-white mb-1">Internship</h4>
                  <p className="text-sm text-gray-400">AI Intern at Persevex</p>
                  <p className="text-xs text-gray-500 mt-2">Applied ML & NLP</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8"
        >
          {/* Stat 1 */}
          <div className="p-6 glass rounded-2xl text-center flex flex-col items-center justify-center border border-white/5 hover:border-white/10 transition-colors">
            <FolderGit2 className="w-6 h-6 text-gray-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter to={2} />+
            </div>
            <div className="text-sm text-gray-500 font-medium">Projects</div>
          </div>

          {/* Stat 2 */}
          <div className="p-6 glass rounded-2xl text-center flex flex-col items-center justify-center border border-white/5 hover:border-white/10 transition-colors">
            <Briefcase className="w-6 h-6 text-gray-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter to={1} />
            </div>
            <div className="text-sm text-gray-500 font-medium">Internship</div>
          </div>

          {/* Stat 3 */}
          <div className="p-6 glass rounded-2xl text-center flex flex-col items-center justify-center border border-white/5 hover:border-white/10 transition-colors">
            <Calendar className="w-6 h-6 text-gray-400 mb-3" />
            <div className="text-3xl font-bold text-white mb-1">
              <AnimatedCounter to={2027} duration={1} />
            </div>
            <div className="text-sm text-gray-500 font-medium">Graduation</div>
          </div>

          {/* Stat 4 */}
          <div className="p-6 glass rounded-2xl text-center flex flex-col items-center justify-center border border-white/5 hover:border-white/10 transition-colors">
            <Code2 className="w-6 h-6 text-gray-400 mb-3" />
            <div className="text-2xl font-bold text-white mb-1 mt-1">Python</div>
            <div className="text-sm text-gray-500 font-medium">Primary Language</div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
};
