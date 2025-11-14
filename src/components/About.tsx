import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Coffee, Award, Users, Calendar, Code2, Zap, Terminal } from 'lucide-react';

const stats = [
  { icon: Coffee, value: '100+', label: 'Projetos Entregues', color: '#FFD700' },
  { icon: Users, value: '50+', label: 'Clientes Satisfeitos', color: '#38BDF8' },
  { icon: Award, value: '98%', label: 'Taxa de Satisfação', color: '#FF6B9D' },
  { icon: Calendar, value: '7+', label: 'Anos de Experiência', color: '#A78BFA' }
];

const skills = [
  { name: 'WordPress', level: 95, color: '#38BDF8' },
  { name: 'Elementor Pro', level: 98, color: '#FF6B9D' },
  { name: 'WooCommerce', level: 90, color: '#A78BFA' },
  { name: 'Performance', level: 92, color: '#FFD700' },
  { name: 'UI/UX Design', level: 88, color: '#38BDF8' },
  { name: 'SEO', level: 85, color: '#10B981' }
];

// Avatar 3D - Boneco programando que olha para o cursor
function Programmer3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Normalizar posição do mouse em relação ao centro
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calcular rotação da cabeça baseado na posição do mouse
  const headRotateY = mousePosition.x * 15;
  const headRotateX = -mousePosition.y * 10;

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative w-80 h-80"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {/* Container do boneco */}
        <div className="relative w-full h-full">
          {/* Mesa/Desk */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 h-3 rounded-full"
            style={{
              background: 'linear-gradient(90deg, rgba(56, 189, 248, 0.3), rgba(30, 58, 138, 0.3))',
              boxShadow: '0 10px 40px rgba(56, 189, 248, 0.2)'
            }}
            animate={{
              scaleX: [1, 1.05, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Computador/Laptop */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            animate={{
              rotateX: [0, 2, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Tela do laptop */}
            <div
              className="w-40 h-24 rounded-lg border-2 border-[#38BDF8]/40 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(30, 58, 138, 0.2))',
                boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)'
              }}
            >
              {/* Linhas de código na tela */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 bg-[#38BDF8]/60 rounded-full mx-2 mb-1.5"
                  style={{ marginTop: i === 0 ? '8px' : '0' }}
                  initial={{ width: '0%' }}
                  animate={{
                    width: ['0%', `${60 + Math.random() * 30}%`, `${60 + Math.random() * 30}%`]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
              
              {/* Brilho da tela */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 to-transparent" />
            </div>

            {/* Base do laptop */}
            <div
              className="w-40 h-2 mt-0.5 rounded-b-lg"
              style={{
                background: 'rgba(56, 189, 248, 0.15)',
                borderLeft: '2px solid rgba(56, 189, 248, 0.3)',
                borderRight: '2px solid rgba(56, 189, 248, 0.3)',
                borderBottom: '2px solid rgba(56, 189, 248, 0.3)'
              }}
            />
          </motion.div>

          {/* Corpo do boneco */}
          <motion.div
            className="absolute bottom-32 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, -3, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Cabeça */}
            <motion.div
              className="relative w-20 h-20 rounded-full mb-2 mx-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.3), rgba(30, 58, 138, 0.3))',
                border: '2px solid rgba(56, 189, 248, 0.5)',
                boxShadow: '0 0 30px rgba(56, 189, 248, 0.4)',
                transformStyle: 'preserve-3d'
              }}
              animate={{
                rotateY: headRotateY,
                rotateX: headRotateX
              }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15
              }}
            >
              {/* Rosto - Olhos que seguem o cursor */}
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                {/* Olho esquerdo */}
                <motion.div
                  className="w-3 h-3 rounded-full bg-[#38BDF8]"
                  style={{
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)'
                  }}
                  animate={{
                    x: mousePosition.x * 3,
                    y: mousePosition.y * 3
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  }}
                />
                
                {/* Olho direito */}
                <motion.div
                  className="w-3 h-3 rounded-full bg-[#38BDF8]"
                  style={{
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.8)'
                  }}
                  animate={{
                    x: mousePosition.x * 3,
                    y: mousePosition.y * 3
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15
                  }}
                />
              </div>

              {/* Boca sorrindo */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-2 border-b-2 border-[#38BDF8] rounded-full" />
            </motion.div>

            {/* Torso */}
            <div
              className="w-24 h-28 rounded-2xl mx-auto"
              style={{
                background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.25), rgba(30, 58, 138, 0.25))',
                border: '2px solid rgba(56, 189, 248, 0.4)',
                boxShadow: '0 10px 40px rgba(56, 189, 248, 0.3)'
              }}
            />

            {/* Braços */}
            <motion.div
              className="absolute top-24 -left-6 w-6 h-20 rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.3), rgba(30, 58, 138, 0.3))',
                border: '2px solid rgba(56, 189, 248, 0.4)'
              }}
              animate={{
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            <motion.div
              className="absolute top-24 -right-6 w-6 h-20 rounded-full"
              style={{
                background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.3), rgba(30, 58, 138, 0.3))',
                border: '2px solid rgba(56, 189, 248, 0.4)'
              }}
              animate={{
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5
              }}
            />
          </motion.div>

          {/* Partículas de código flutuando */}
          {['<>', '{}', '/>', '( )'].map((symbol, i) => (
            <motion.div
              key={i}
              className="absolute font-mono text-[#38BDF8]/30 text-sm"
              style={{
                left: `${20 + (i % 2) * 60}%`,
                top: `${10 + Math.floor(i / 2) * 30}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2],
                rotate: [0, 360]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut'
              }}
            >
              {symbol}
            </motion.div>
          ))}

          {/* Efeito de brilho */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15), transparent 70%)',
              filter: 'blur(30px)'
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Stat card component
function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="p-6 rounded-2xl backdrop-blur-2xl border"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          borderColor: 'rgba(255, 255, 255, 0.05)'
        }}
        whileHover={{
          scale: 1.05,
          borderColor: `${stat.color}30`,
          boxShadow: `0 20px 40px ${stat.color}20`
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      >
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <stat.icon
            className="w-8 h-8 mb-3"
            style={{ color: stat.color }}
          />
        </motion.div>
        <div className="text-3xl text-white mb-1">
          {stat.value}
        </div>
        <div className="text-sm text-gray-300">
          {stat.label}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Skill bar component
function SkillBar({ skill, index }: { skill: typeof skills[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-white">{skill.name}</span>
        <span className="text-gray-300 text-sm">{skill.level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-xl">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}90)`,
            boxShadow: `0 0 10px ${skill.color}50`
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.2, duration: 1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 overflow-hidden">
      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#38BDF8] to-white bg-clip-text text-transparent">
            Sobre Mim
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Desenvolvedor apaixonado por criar experiências digitais únicas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Left side - Avatar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[400px] flex items-center justify-center mb-8">
              <Programmer3D />
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <StatCard key={index} stat={stat} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Right side - Description */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-10">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
                style={{
                  background: 'rgba(56, 189, 248, 0.1)',
                  borderColor: 'rgba(56, 189, 248, 0.3)'
                }}
              >
                <Terminal className="w-4 h-4 text-[#38BDF8]" />
                <span className="text-[#38BDF8] text-sm">Desenvolvedor Front-End Especializado</span>
              </motion.div>

              <h3 className="text-3xl text-white mb-6">
                Construindo o Futuro Digital
              </h3>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Com mais de 7 anos de experiência, sou especializado em criar sites e aplicações web de alta performance utilizando WordPress e Elementor Pro.
                </p>
                <p>
                  Minha paixão está em transformar designs em experiências digitais funcionais, elegantes e otimizadas, sempre focando em performance, SEO e conversão.
                </p>
                <p>
                  Cada projeto é uma oportunidade de superar expectativas e entregar soluções que realmente fazem a diferença no negócio dos meus clientes.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Code2 className="w-6 h-6 text-[#38BDF8]" />
                <h4 className="text-2xl text-white">Especialidades</h4>
              </div>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <SkillBar key={index} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional info cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[
            {
              icon: Zap,
              title: 'Performance First',
              description: 'Sites que carregam em menos de 2 segundos e pontuam 90+ no PageSpeed',
              color: '#FFD700'
            },
            {
              icon: Code2,
              title: 'Código Profissional',
              description: 'Desenvolvimento seguindo as melhores práticas e padrões da indústria',
              color: '#38BDF8'
            },
            {
              icon: Users,
              title: 'Foco no Cliente',
              description: 'Comunicação clara e suporte dedicado em todas as etapas do projeto',
              color: '#FF6B9D'
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-2xl backdrop-blur-2xl border cursor-hover"
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderColor: 'rgba(255, 255, 255, 0.05)'
              }}
              whileHover={{
                y: -5,
                borderColor: `${card.color}30`,
                boxShadow: `0 20px 40px ${card.color}20`
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
            >
              <card.icon
                className="w-10 h-10 mb-4"
                style={{ color: card.color }}
              />
              <h5 className="text-xl text-white mb-2">
                {card.title}
              </h5>
              <p className="text-gray-300 leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
