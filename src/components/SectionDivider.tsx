import { motion } from 'motion/react';

export function SectionDivider() {
  return (
    <div className="relative h-32 overflow-hidden">
      {/* Gradient divider */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#38BDF8]/10 to-transparent" />
      
      {/* Animated wave line */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,60 C300,10 600,110 900,60 C1050,35 1200,60 1200,60 L1200,120 L0,120 Z"
          fill="url(#gradient1)"
          opacity="0.3"
          animate={{
            d: [
              "M0,60 C300,10 600,110 900,60 C1050,35 1200,60 1200,60 L1200,120 L0,120 Z",
              "M0,60 C300,110 600,10 900,60 C1050,85 1200,60 1200,60 L1200,120 L0,120 Z",
              "M0,60 C300,10 600,110 900,60 C1050,35 1200,60 1200,60 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.path
          d="M0,70 C400,20 800,100 1200,70 L1200,120 L0,120 Z"
          fill="url(#gradient2)"
          opacity="0.2"
          animate={{
            d: [
              "M0,70 C400,20 800,100 1200,70 L1200,120 L0,120 Z",
              "M0,70 C400,100 800,20 1200,70 L1200,120 L0,120 Z",
              "M0,70 C400,20 800,100 1200,70 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#38BDF8] rounded-full"
          style={{
            left: `${(i * 100) / 8}%`,
            top: '50%'
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
