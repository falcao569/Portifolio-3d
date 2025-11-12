import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contato@seusite.com',
    href: 'mailto:contato@seusite.com',
    color: '#38BDF8'
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: '+55 (11) 99999-9999',
    href: 'tel:+5511999999999',
    color: '#10B981'
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'São Paulo, Brasil',
    href: '#',
    color: '#FF6B9D'
  }
];

const socialLinks = [
  { icon: Github, label: 'Github', href: '#', color: '#fff' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0A66C2' },
  { icon: Twitter, label: 'Twitter', href: '#', color: '#1DA1F2' }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success('Mensagem enviada com sucesso! Responderei em breve.', {
      duration: 5000,
      style: {
        background: 'rgba(56, 189, 248, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        color: '#fff'
      }
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0C1020]/50 to-[#0C1020]" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-[#38BDF8] to-white bg-clip-text text-transparent">
            Vamos Conversar
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transforme sua ideia em realidade. Entre em contato e vamos criar algo incrível juntos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact info and social */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contact info cards */}
            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="group flex items-center gap-4 p-6 rounded-2xl backdrop-blur-2xl border cursor-hover"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderColor: 'rgba(255, 255, 255, 0.05)'
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{
                    x: 10,
                    borderColor: `${item.color}30`,
                    boxShadow: `0 10px 40px ${item.color}20`
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}30`
                    }}
                  >
                    <item.icon
                      className="w-6 h-6"
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-400 mb-1">{item.label}</div>
                    <div className="text-white">{item.value}</div>
                  </div>
                  <motion.div
                    className="text-[#38BDF8] opacity-0 group-hover:opacity-100"
                    initial={{ x: -5 }}
                    whileHover={{ x: 0 }}
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl text-white mb-6">Redes Sociais</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="w-14 h-14 rounded-xl backdrop-blur-2xl border flex items-center justify-center cursor-hover"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderColor: 'rgba(255, 255, 255, 0.05)'
                    }}
                    whileHover={{
                      y: -5,
                      borderColor: `${social.color}30`,
                      boxShadow: `0 10px 30px ${social.color}20`
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 17
                    }}
                  >
                    <social.icon
                      className="w-6 h-6"
                      style={{ color: social.color }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Decorative element */}
            <motion.div
              className="mt-12 p-8 rounded-2xl backdrop-blur-2xl border"
              style={{
                background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(30, 58, 138, 0.05))',
                borderColor: 'rgba(56, 189, 248, 0.2)'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h4 className="text-xl text-white mb-3">Disponível para novos projetos</h4>
              <p className="text-gray-300 leading-relaxed">
                Estou sempre em busca de novos desafios e oportunidades para criar experiências digitais incríveis. Vamos trabalhar juntos!
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <label htmlFor="name" className="block text-white mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl backdrop-blur-2xl border bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] transition-colors"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  placeholder="Seu nome completo"
                />
              </motion.div>

              {/* Email input */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <label htmlFor="email" className="block text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 rounded-xl backdrop-blur-2xl border bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] transition-colors"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  placeholder="seu@email.com"
                />
              </motion.div>

              {/* Message textarea */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <label htmlFor="message" className="block text-white mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl backdrop-blur-2xl border bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:border-[#38BDF8] transition-colors resize-none"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  placeholder="Conte-me sobre seu projeto..."
                />
              </motion.div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-8 py-4 rounded-xl overflow-hidden cursor-hover"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8, #1E3A8A)',
                  boxShadow: '0 10px 40px rgba(56, 189, 248, 0.3)'
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 60px rgba(56, 189, 248, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-white text-lg">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </span>

                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-[#38BDF8]"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        className="relative max-w-7xl mx-auto mt-20 pt-10 border-t text-center"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-gray-400">
          © 2025 Desenvolvido com ❤️ e muito ☕ | Todos os direitos reservados
        </p>
      </motion.div>
    </section>
  );
}
