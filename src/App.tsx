import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { InfiniteSkills } from './components/sections/InfiniteSkills';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { CustomCursor } from './components/ui/CustomCursor';

function App() {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen selection:bg-blue-500/30">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <InfiniteSkills />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
