import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Certifications } from './components/Certifications';
import { Connect } from './components/Connect';
import { Footer } from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 selection:bg-cyan selection:text-navy-950 transition-colors duration-300 relative">
        {/* Subtle Ambient Background Grid & Noise */}
        <div className="fixed inset-0 bg-noise pointer-events-none opacity-40 -z-20" />
        
        {/* Custom subtle desktop cursor */}
        <CustomCursor />

        {/* Navigation Bar */}
        <Navbar />

        {/* Page Content Sections */}
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certifications />
          <Connect />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
