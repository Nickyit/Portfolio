import React from 'react';
import { Section } from '../layout/Section';
import { motion, type Variants } from 'framer-motion';
import { BrainCircuit, Database, Code2, Cpu, Network, LineChart } from 'lucide-react';

const skills = [
  {
    category: 'Languages',
    icon: <Code2 className="w-5 h-5 text-blue-400" />,
    items: ['Python', 'C++', 'JavaScript', 'HTML', 'CSS'],
    bgGlow: 'bg-blue-600/15',
    iconBg: 'bg-blue-500/10 border-blue-500/20',
    imageBg: '/languages-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'ML / AI',
    icon: <BrainCircuit className="w-5 h-5 text-purple-400" />,
    items: ['Scikit-learn', 'TF-IDF', 'Logistic Regression', 'NLP', 'Text Classification', 'Sentiment Analysis', 'TensorFlow', 'PyTorch'],
    bgGlow: 'bg-purple-600/15',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    imageBg: '/ml-ai-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'Data & Libraries',
    icon: <LineChart className="w-5 h-5 text-pink-400" />,
    items: ['NumPy', 'Pandas', 'Data Preprocessing', 'Data Pipelines', 'Model Evaluation'],
    bgGlow: 'bg-pink-600/15',
    iconBg: 'bg-pink-500/10 border-pink-500/20',
    imageBg: '/data-libraries-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'Tools & Platforms',
    icon: <Cpu className="w-5 h-5 text-green-400" />,
    items: ['Git', 'GitHub', 'Jupyter Notebook', 'Google Colab', 'VS Code'],
    bgGlow: 'bg-green-600/15',
    iconBg: 'bg-green-500/10 border-green-500/20',
    imageBg: '/tools-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'Frameworks & APIs',
    icon: <Network className="w-5 h-5 text-yellow-400" />,
    items: ['Flask', 'FastAPI', 'REST APIs', 'Hugging Face Transformers'],
    bgGlow: 'bg-yellow-600/15',
    iconBg: 'bg-yellow-500/10 border-yellow-500/20',
    imageBg: '/frameworks-bg.png',
    imageFit: 'cover',
  },
  {
    category: 'Databases',
    icon: <Database className="w-5 h-5 text-red-400" />,
    items: ['SQL', 'SQLite'],
    bgGlow: 'bg-red-600/15',
    iconBg: 'bg-red-500/10 border-red-500/20',
    imageBg: '/databases-bg.png',
    imageFit: 'cover',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const Skills = () => {
  return (
    <Section
      id="skills"
      title="Technical Arsenal"
      subtitle="A comprehensive toolkit for building state-of-the-art AI systems."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-12 auto-rows-fr"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group h-full relative overflow-hidden rounded-2xl bg-[#111111] border border-white/5 p-6 hover:border-white/10 transition-colors duration-500"
          >
            {/* Soft Radial Gradient Background in top-right */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[80px] pointer-events-none transition-colors duration-700 ${skill.bgGlow} group-hover:opacity-100 opacity-70 z-0`} />
            
            {/* Optional Image Background */}
            {skill.imageBg && (
              <div 
                className="absolute inset-0 z-0 opacity-15 mix-blend-screen transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                style={{
                  backgroundImage: `url(${skill.imageBg})`,
                  backgroundSize: skill.imageFit || 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            )}
            
            <div className="relative z-10">
              <div className={`mb-6 p-3 rounded-xl border inline-flex items-center justify-center ${skill.iconBg}`}>
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-300 bg-white/5 rounded-md hover:bg-white/10 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};
