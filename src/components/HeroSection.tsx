import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#38BDF8] opacity-30"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              filter: 'blur(1px)'
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Floating icons background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {[
          { icon: '⚡', x: 10, y: 20, z: -200 },
          { icon: '🎨', x: 80, y: 30, z: -150 },
          { icon: '💻', x: 20, y: 70, z: -100 },
          { icon: '🚀', x: 85, y: 60, z: -180 },
          { icon: '⚙️', x: 50, y: 15, z: -120 }
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl opacity-10"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translateZ(${item.z}px)`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut'
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        style={{
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Main title with glass effect */}
        <motion.h1
          className="relative mb-6"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        >
          <span
            className="block text-[clamp(3rem,12vw,9rem)] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#38BDF8] to-white relative"
            style={{
              WebkitTextStroke: '2px rgba(255,255,255,0.1)',
              paintOrder: 'stroke fill',
              textShadow: '0 0 80px rgba(56, 189, 248, 0.5), 0 0 40px rgba(56, 189, 248, 0.3)'
            }}
          >
            FRONTEND
          </span>
          <span
            className="block text-[clamp(2rem,8vw,6rem)] tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#38BDF8] via-white to-[#1E3A8A]"
            style={{
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              textShadow: '0 0 60px rgba(30, 58, 138, 0.5)'
            }}
          >
            DEVELOPER
          </span>
        </motion.h1>

        <motion.p
          className="text-[#38BDF8] text-xl md:text-2xl mb-4 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Especialista em WordPress & Elementor
        </motion.p>

        <motion.p
          className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          Criando experiências digitais de alta performance com design moderno e código otimizado
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="relative group overflow-hidden rounded-2xl px-8 py-6 text-lg bg-gradient-to-r from-[#1E3A8A] to-[#38BDF8] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300"
            style={{
              transform: 'translateZ(50px)'
            }}
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10">Explorar Portfólio</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#38BDF8] to-[#1E3A8A]"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-8 h-8 text-[#38BDF8] opacity-60" />
      </motion.div>
    </section>
  );
}
