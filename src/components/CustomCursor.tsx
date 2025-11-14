import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateTouchPosition = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('touchmove', updateTouchPosition, { passive: true });
    window.addEventListener('touchstart', updateTouchPosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('touchmove', updateTouchPosition);
      window.removeEventListener('touchstart', updateTouchPosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Don't show cursor if no position yet
  if (mousePosition.x === 0 && mousePosition.y === 0) {
    return null;
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
          scale: isHovering ? 1.5 : 1,
          opacity: isMobile ? 0.6 : 0.8
        }}
        transition={{
          type: 'spring',
          stiffness: isMobile ? 300 : 500,
          damping: isMobile ? 20 : 28,
          mass: 0.5
        }}
      >
        <div className="w-5 h-5 rounded-full bg-[#38BDF8] opacity-80" />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.8 : 1,
          opacity: isMobile ? 0.5 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: isMobile ? 100 : 150,
          damping: isMobile ? 12 : 15,
          mass: 0.8
        }}
      >
        <div
          className="w-10 h-10 rounded-full border-2 border-[#38BDF8]"
          style={{
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.5)'
          }}
        />
      </motion.div>

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          opacity: isMobile ? 0.4 : 1
        }}
        transition={{
          type: 'spring',
          stiffness: isMobile ? 80 : 100,
          damping: 20
        }}
      >
        <div
          className="w-1 h-1 rounded-full bg-[#38BDF8]"
          style={{
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.8)'
          }}
        />
      </motion.div>
    </>
  );
}
