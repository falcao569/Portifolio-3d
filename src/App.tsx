import { useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { Differentials } from './components/Differentials';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { AnimatedCodeBackground } from './components/AnimatedCodeBackground';
import { Toaster } from './components/ui/sonner';

export default function App() {
  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';
    document.querySelectorAll('*').forEach((el) => {
      (el as HTMLElement).style.cursor = 'none';
    });

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <div className="relative bg-[#0C1020] overflow-x-hidden">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Animated code background */}
      <AnimatedCodeBackground />

      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#1E3A8A] opacity-20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#38BDF8] opacity-15 blur-[120px] rounded-full" />
      </div>

      <HeroSection />
      <Differentials />
      <Services />
      <Projects />
      <About />
      <Testimonials />
      <Contact />

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
}