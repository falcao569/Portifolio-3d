import { motion } from 'motion/react';
import { useState } from 'react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Ana Paula Silva',
    role: 'CEO, TechStart',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    content: 'Trabalho excepcional! O site ficou exatamente como imaginei, com performance incrível e design moderno. Recomendo muito!',
    rating: 5,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Carlos Mendes',
    role: 'Founder, E-Shop Brasil',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    content: 'Nossa loja virtual teve um aumento de 150% nas conversões após a otimização. Profissionalismo do início ao fim.',
    rating: 5,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Mariana Costa',
    role: 'Marketing Director, Style Co',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    content: 'A atenção aos detalhes e o comprometimento com prazos são impressionantes. O resultado superou nossas expectativas!',
    rating: 5,
    gradient: 'from-orange-500 to-red-500'
  },
  {
    name: 'Ricardo Alves',
    role: 'CTO, Digital Agency',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    content: 'Código limpo, site rápido e suporte excepcional. Um dos melhores profissionais com quem já trabalhei.',
    rating: 5,
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Juliana Santos',
    role: 'Owner, Boutique Luxe',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    content: 'Design elegante e funcionalidade impecável. Meus clientes adoraram a nova experiência de compra!',
    rating: 5,
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Fernando Lima',
    role: 'Director, Consultoria Pro',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    content: 'Transformou completamente nossa presença digital. O site transmite exatamente a credibilidade que precisávamos.',
    rating: 5,
    gradient: 'from-indigo-500 to-purple-500'
  }
];

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-hover"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
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
          y: -10,
          borderColor: 'rgba(56, 189, 248, 0.3)',
          boxShadow: '0 30px 60px rgba(56, 189, 248, 0.15)'
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20
        }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0`}
          animate={{
            opacity: isHovered ? 0.05 : 0
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Quote icon with glow */}
        <motion.div
          className="absolute top-6 right-6 opacity-10"
          animate={{
            scale: isHovered ? 1.2 : 1,
            opacity: isHovered ? 0.15 : 0.1
          }}
          transition={{ duration: 0.4 }}
        >
          <Quote className="w-20 h-20 text-[#38BDF8]" />
        </motion.div>

        <div className="relative z-10">
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
              >
                <Star
                  className="w-5 h-5 fill-[#FFD700] text-[#FFD700]"
                  style={{
                    filter: isHovered ? 'drop-shadow(0 0 4px #FFD700)' : 'none'
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">
            "{testimonial.content}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[#38BDF8]/30">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Glow ring on hover */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: isHovered
                    ? '0 0 20px rgba(56, 189, 248, 0.6)'
                    : '0 0 0px rgba(56, 189, 248, 0)'
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            <div>
              <div className="text-white mb-1">
                {testimonial.name}
              </div>
              <div className="text-sm text-gray-400">
                {testimonial.role}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner gradient */}
        <motion.div
          className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-0"
          animate={{
            opacity: isHovered ? 0.1 : 0,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ duration: 0.4 }}
          style={{
            background: `radial-gradient(circle, #38BDF8, transparent 70%)`,
            filter: 'blur(30px)',
            transform: 'translate(-40%, 40%)'
          }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, transparent, #38BDF8, transparent)`
          }}
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Floating sparkles on hover */}
        {isHovered && [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#38BDF8] rounded-full"
            style={{
              left: `${30 + i * 20}%`,
              top: `${20 + i * 15}%`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [-10, -30]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#38BDF8] opacity-10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#1E3A8A] opacity-15 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#38BDF8] to-white bg-clip-text text-transparent">
            Depoimentos
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            O que meus clientes dizem sobre o trabalho realizado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
