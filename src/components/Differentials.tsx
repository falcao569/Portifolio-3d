import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { Zap, Palette, Code2, Rocket } from 'lucide-react';

const differentials = [
  {
    icon: Zap,
    title: 'Performance',
    description: 'Sites otimizados com carregamento ultra-rápido e Core Web Vitals perfeitos',
    color: '#FFD700'
  },
  {
    icon: Palette,
    title: 'Design Premium',
    description: 'Interfaces modernas e intuitivas que convertem visitantes em clientes',
    color: '#FF6B9D'
  },
  {
    icon: Code2,
    title: 'Código Limpo',
    description: 'Desenvolvimento profissional seguindo as melhores práticas e padrões',
    color: '#38BDF8'
  },
  {
    icon: Rocket,
    title: 'Resultados',
    description: 'Soluções que geram impacto real no crescimento do seu negócio',
    color: '#A78BFA'
  }
];

function DifferentialCard({ item, index }: { item: typeof differentials[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-hover"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full p-8 rounded-3xl backdrop-blur-2xl border overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          borderColor: 'rgba(255, 255, 255, 0.05)'
        }}
        whileHover={{
          y: -8,
          borderColor: `${item.color}30`,
          boxShadow: `0 20px 60px ${item.color}20`
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: isHovered ? 0.15 : 0
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${item.color}30, transparent 40%)`
          }}
        />

        {/* Animated border glow */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: `linear-gradient(135deg, ${item.color}20, transparent 50%, ${item.color}10)`,
            filter: 'blur(20px)'
          }}
        />

        <div className="relative z-10">
          {/* Icon with animated background */}
          <motion.div
            className="relative mb-6 w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)`,
              border: `1px solid ${item.color}20`
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            {/* Icon glow pulse */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: isHovered ? [0.3, 0.6, 0.3] : 0.3,
                scale: isHovered ? [1, 1.2, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: isHovered ? Infinity : 0,
                ease: 'easeInOut'
              }}
              style={{
                background: `radial-gradient(circle, ${item.color}40, transparent 70%)`,
                filter: 'blur(10px)'
              }}
            />
            
            <item.icon
              className="w-8 h-8 relative z-10"
              style={{ color: item.color }}
            />
          </motion.div>

          {/* Content */}
          <h3 className="text-2xl mb-4 text-white">
            {item.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.2 : 0.1
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(circle, ${item.color}, transparent 70%)`,
            filter: 'blur(40px)',
            transform: 'translate(40%, -40%)'
          }}
        />

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
            transformOrigin: 'left'
          }}
        />

        {/* Floating particles */}
        {isHovered && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: item.color,
              left: `${20 + i * 15}%`,
              bottom: '20%'
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [-20, -60],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Differentials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);

  return (
    <section ref={sectionRef} className="relative py-32 px-6">
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto"
      >
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#38BDF8] to-white bg-clip-text text-transparent">
            Diferenciais
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Combinando criatividade, tecnologia e estratégia para entregar excelência
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((item, index) => (
            <DifferentialCard key={index} item={item} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
