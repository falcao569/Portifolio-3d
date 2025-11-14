import { useState, useRef } from 'react';
import { motion, AnimatePresence, useDragControls, PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

const projects = [
  {
    id: 1,
    title: 'E-commerce Premium',
    category: 'WooCommerce',
    description: 'Loja virtual de alta performance com integração completa de pagamentos, sistema de cupons e painel administrativo personalizado.',
    image: 'https://images.unsplash.com/photo-1757301714935-c8127a21abc6?w=1200',
    tech: ['WordPress', 'WooCommerce', 'Elementor', 'Custom CSS'],
    metrics: {
      performance: '95',
      conversion: '+180%',
      loading: '1.2s'
    }
  },
  {
    id: 2,
    title: 'Site Corporativo Tech',
    category: 'WordPress',
    description: 'Website institucional moderno para empresa de tecnologia, com animações suaves e design responsivo premium.',
    image: 'https://images.unsplash.com/photo-1676792519027-7c42006d7b4a?w=1200',
    tech: ['WordPress', 'Elementor Pro', 'GSAP', 'Custom Plugins'],
    metrics: {
      performance: '98',
      conversion: '+150%',
      loading: '0.9s'
    }
  },
  {
    id: 3,
    title: 'App Landing Page',
    category: 'Design',
    description: 'Landing page para aplicativo mobile com foco em conversão, integrada com ferramentas de analytics e marketing.',
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=1200',
    tech: ['Elementor', 'Custom Code', 'Animations', 'SEO'],
    metrics: {
      performance: '96',
      conversion: '+220%',
      loading: '1.0s'
    }
  },
  {
    id: 4,
    title: 'Portal de Notícias',
    category: 'WordPress',
    description: 'Portal de conteúdo otimizado para SEO com sistema de categorias avançado e área de membros.',
    image: 'https://images.unsplash.com/photo-1678341859828-bfb1a2bd527a?w=1200',
    tech: ['WordPress', 'Custom Theme', 'ACF', 'Membership'],
    metrics: {
      performance: '92',
      conversion: '+130%',
      loading: '1.4s'
    }
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    category: 'UI/UX',
    description: 'Interface administrativa completa com gráficos interativos e visualização de dados em tempo real.',
    image: 'https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?w=1200',
    tech: ['React', 'WordPress API', 'Chart.js', 'REST API'],
    metrics: {
      performance: '94',
      conversion: '+165%',
      loading: '1.1s'
    }
  },
  {
    id: 6,
    title: 'Creative Agency',
    category: 'Portfolio',
    description: 'Site de portfólio para agência criativa com galeria interativa e animações cinematográficas.',
    image: 'https://images.unsplash.com/photo-1603201667246-3c45012c6d17?w=1200',
    tech: ['Elementor', 'Custom Animations', 'WebGL', 'GSAP'],
    metrics: {
      performance: '97',
      conversion: '+200%',
      loading: '0.8s'
    }
  }
];

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const dragControls = useDragControls();

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevProject();
    } else if (info.offset.x < -threshold) {
      nextProject();
    }
  };

  const getVisibleProjects = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + projects.length) % projects.length;
      visible.push({ ...projects[index], position: i });
    }
    return visible;
  };

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#38BDF8] to-white bg-clip-text text-transparent">
            Projetos
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Trabalhos recentes que demonstram qualidade e inovação
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
          <motion.div 
            className="relative w-full max-w-5xl h-full flex items-center justify-center touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            {getVisibleProjects().map((project) => {
              const isCenter = project.position === 0;
              const isLeft = project.position === -1;
              const isRight = project.position === 1;

              return (
                <motion.div
                  key={project.id}
                  className="absolute cursor-pointer"
                  initial={false}
                  animate={{
                    x: project.position * (window.innerWidth < 768 ? 280 : 400),
                    z: isCenter ? 100 : 0,
                    scale: isCenter ? 1 : 0.75,
                    opacity: isCenter ? 1 : 0.5,
                    rotateY: project.position * 15
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: isCenter ? 10 : 1
                  }}
                  onClick={() => {
                    if (isCenter) {
                      setSelectedProject(project);
                    } else if (isLeft) {
                      prevProject();
                    } else if (isRight) {
                      nextProject();
                    }
                  }}
                  whileHover={{
                    scale: isCenter ? 1.02 : 0.78,
                    rotateY: isCenter ? 0 : project.position * 12
                  }}
                >
                  <div
                    className="w-[280px] md:w-[500px] h-[320px] md:h-[350px] rounded-3xl overflow-hidden border border-white/10"
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: isCenter
                        ? '0 20px 60px rgba(56, 189, 248, 0.3)'
                        : '0 10px 30px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {/* Project image */}
                    <div className="relative h-2/3 overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1020] to-transparent" />
                      
                      {/* Category badge */}
                      <div className="absolute top-4 right-4 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20">
                        <span className="text-xs md:text-sm text-white">{project.category}</span>
                      </div>
                    </div>

                    {/* Project info */}
                    <div className="h-1/3 p-4 md:p-6">
                      <h3 className="text-lg md:text-2xl mb-1 md:mb-2 text-white line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-xs md:text-sm line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Navigation buttons */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4 z-20">
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-[#38BDF8]/50"
              onClick={prevProject}
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 hover:border-[#38BDF8]/50"
              onClick={nextProject}
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </Button>
          </div>
        </div>

        {/* Project indicators */}
        <div className="flex justify-center gap-2 mt-12">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[#38BDF8] w-8'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

            {/* Modal content */}
            <motion.div
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10"
              style={{
                background: 'rgba(12, 16, 32, 0.95)',
                backdropFilter: 'blur(40px)'
              }}
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 flex items-center justify-center transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Project image */}
              <div className="relative h-64 md:h-96 overflow-hidden rounded-t-3xl">
                <ImageWithFallback
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1020] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="inline-block px-4 py-2 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 text-[#38BDF8] text-sm mb-4">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-2xl md:text-4xl text-white mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
                  <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl md:text-3xl text-[#38BDF8] mb-2">
                      {selectedProject.metrics.performance}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">Performance</div>
                  </div>
                  <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl md:text-3xl text-[#38BDF8] mb-2">
                      {selectedProject.metrics.conversion}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">Conversão</div>
                  </div>
                  <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="text-2xl md:text-3xl text-[#38BDF8] mb-2">
                      {selectedProject.metrics.loading}
                    </div>
                    <div className="text-xs md:text-sm text-gray-400">Carregamento</div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className="text-lg md:text-xl text-white mb-4">Tecnologias</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Button
                  size="lg"
                  className="w-full rounded-2xl bg-gradient-to-r from-[#1E3A8A] to-[#38BDF8] hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] transition-all duration-300"
                >
                  <span>Ver Projeto Completo</span>
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
