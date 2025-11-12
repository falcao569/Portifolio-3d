import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const codeSnippets = [
  'const portfolio = () => {',
  '  return <Amazing />',
  '}',
  'function createMagic() {',
  '  const design = "3D"',
  '  return design',
  '}',
  'if (performance > 95) {',
  '  deploy();',
  '}',
  'const speed = "blazing"',
  'render(<Portfolio />)',
  '// WordPress Expert',
  '// Elementor Pro',
  'export default Dev',
  'animation: true,',
  'responsive: true,',
  'optimized: true,',
  '<Component />',
  'useState()',
  'useEffect()',
  'className="..."',
  'transform: 3D'
];

interface CodeLine {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  rotation: number;
  scale: number;
}

export function AnimatedCodeBackground() {
  const [codeLines, setCodeLines] = useState<CodeLine[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Handle resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Initialize code lines with better distribution
    const initialLines: CodeLine[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      x: (i % 6) * (dimensions.width / 6) + Math.random() * (dimensions.width / 6),
      y: Math.random() * dimensions.height,
      speed: Math.random() * 0.3 + 0.15,
      opacity: Math.random() * 0.15 + 0.05,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.3 + 0.7
    }));

    setCodeLines(initialLines);

    // Animate code lines
    intervalRef.current = setInterval(() => {
      setCodeLines((prevLines) =>
        prevLines.map((line) => ({
          ...line,
          y: line.y + line.speed,
          rotation: line.rotation + 0.05,
          // Reset position when off screen with better distribution
          ...(line.y > dimensions.height + 100
            ? {
                y: -100,
                x: Math.random() * dimensions.width,
                text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
                opacity: Math.random() * 0.15 + 0.05,
                scale: Math.random() * 0.3 + 0.7
              }
            : {})
        }))
      );
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [dimensions]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {codeLines.map((line) => {
        // Calculate distance from mouse
        const dx = mousePosition.x - line.x;
        const dy = mousePosition.y - line.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;
        const influence = Math.max(0, 1 - distance / maxDistance);

        // Push away from cursor
        const pushX = influence * dx * -0.8;
        const pushY = influence * dy * -0.8;

        return (
          <motion.div
            key={line.id}
            className="absolute font-mono text-[#38BDF8] whitespace-nowrap"
            style={{
              left: line.x,
              top: line.y,
              opacity: line.opacity,
              transform: `rotate(${line.rotation}deg) scale(${line.scale})`,
              filter: 'blur(1px)',
              fontSize: '12px',
              textShadow: influence > 0.2 ? '0 0 8px rgba(56, 189, 248, 0.6)' : 'none',
              willChange: 'transform, opacity'
            }}
            animate={{
              x: pushX,
              y: pushY,
              opacity: line.opacity + influence * 0.2,
              filter: influence > 0.3 ? 'blur(0px)' : 'blur(1px)'
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 25
            }}
          >
            {line.text}
          </motion.div>
        );
      })}
    </div>
  );
}