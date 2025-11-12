import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { Layers, ShoppingCart, Smartphone, Gauge, Paintbrush, Search } from 'lucide-react';

const services = [
  {
    icon: Layers,
    title: 'WordPress & Elementor',
    description: 'Desenvolvimento de sites corporativos e institucionais com WordPress e Elementor Pro, garantindo flexibilidade total.',
    gradient: 'from-[#1E3A8A] to-[#3B82F6]',
    image: 'https://images.unsplash.com/photo-1678341859828-bfb1a2bd527a?w=800'
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce WooCommerce',
    description: 'Lojas virtuais completas e otimizadas para conversão, com integrações de pagamento e gestão avançada.',
    gradient: 'from-[#059669] to-[#10B981]',
    image: 'https://images.unsplash.com/photo-1757301714935-c8127a21abc6?w=800'
  },
  {
    icon: Smartphone,
    title: 'Design Responsivo',
    description: 'Experiências perfeitas em todos os dispositivos, de smartphones a desktops de alta resolução.',
    gradient: 'from-[#7C3AED] to-[#A78BFA]',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800'
  },
  {
    icon: Gauge,
    title: 'Otimização de Performance',
    description: 'Análise e otimização completa para alcançar 90+ no Google PageSpeed e Core Web Vitals.',
    gradient: 'from-[#DC2626] to-[#F87171]',
    image: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?w=800'
  },
  {
    icon: Paintbrush,
    title: 'UI/UX Design',
    description: 'Interfaces modernas e intuitivas focadas em conversão e experiência do usuário.',
    gradient: 'from-[#DB2777] to-[#F472B6]',
    image: 'https://images.unsplash.com/photo-1676792519027-7c42006d7b4a?w=800'
  },
  {
    icon: Search,
    title: 'SEO & Analytics',
    description: 'Otimização para motores de busca e implementação de ferramentas de análise para crescimento.',
    gradient: 'from-[#EA580C] to-[#FB923C]',
    image: 'https://images.unsplash.com/photo-1603201667246-3c45012c6d17?w=800'
  }
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-150, 150], [2, -2]), {
    stiffness: 400,
    damping: 35
  });
  const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-2, 2]), {
    stiffness: 400,
    damping: 35
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-hover"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <motion.div
        className="relative h-full rounded-3xl overflow-hidden backdrop-blur-2xl border"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: 'rgba(255, 255, 255, 0.02)',
          borderColor: 'rgba(255, 255, 255, 0.05)'
        }}
        whileHover={{
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4)',
          borderColor: 'rgba(56, 189, 248, 0.2)'
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25
        }}
      >
        {/* Image background with overlay */}
        <div className="relative h-56 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60`}
          />
          
          {/* Animated glow */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: isHovered ? 0.4 : 0
            }}
            transition={{ duration: 0.4 }}
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.3), transparent 70%)`
            }}
          />

          {/* Icon floating */}
          <motion.div
            className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 10 }}
            animate={{
              y: isHovered ? -5 : 0
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <service.icon className="w-7 h-7 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <h3 className="text-2xl text-white mb-3">
            {service.title}
          </h3>
          <p className="text-gray-400 leading-relaxed">
            {service.description}
          </p>

          {/* Hover indicator */}
          <motion.div
            className="flex items-center gap-2 mt-4 text-[#38BDF8] text-sm"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -10
            }}
            transition={{ duration: 0.3 }}
          >
            <span>Saiba mais</span>
            <motion.span
              animate={{
                x: isHovered ? [0, 5, 0] : 0
              }}
              transition={{
                duration: 1,
                repeat: isHovered ? Infinity : 0,
                ease: 'easeInOut'
              }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient}`}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
          style={{
            transformOrigin: 'left',
            boxShadow: isHovered ? '0 0 20px rgba(56, 189, 248, 0.5)' : 'none'
          }}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: isHovered
              ? `linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)`
              : 'transparent'
          }}
          transition={{ duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#38BDF8] to-white bg-clip-text text-transparent">
            Serviços
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Soluções completas em desenvolvimento web e WordPress
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}