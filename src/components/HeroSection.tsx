import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Zap, Code2, Brain } from 'lucide-react';
import profilePhoto from '@/assets/profile-photo.jpg';

const floatingIcons = [
  { icon: Code2, delay: 0, x: -80, y: -60 },
  { icon: Brain, delay: 0.5, x: 80, y: -50 },
  { icon: Zap, delay: 1, x: -70, y: 60 },
  { icon: Sparkles, delay: 1.5, x: 75, y: 50 },
];

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-4">
      {/* Minimal background shapes - hidden on mobile */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <motion.div
          className="absolute top-20 left-[10%] w-2 h-2 rounded-full bg-primary/40"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-[15%] w-2 h-2 rounded-full bg-secondary/40"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 overflow-hidden relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👋
              </motion.span>
              <span className="text-primary text-sm font-medium relative z-10">Welcome to my portfolio</span>
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-display font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Hi, I'm{' '}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Neetesh Kumar
              </motion.span>
            </motion.h1>

            <motion.div 
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 h-20 md:h-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <TypeAnimation
                sequence={[
                  'Building Intelligent Products That Shape The Future',
                  3000,
                  'Full Stack Developer',
                  2000,
                  'AI/ML Enthusiast',
                  2000,
                  'Tech Innovator',
                  2000,
                  'Founder of HackLoop Community',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="glow-text"
              />
            </motion.div>

            <motion.p 
              className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              Passionate about creating scalable digital products and leading tech communities. 
              Transforming ideas into impactful solutions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
            >
              <motion.a
                href="#projects"
                className="btn-primary-glow group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={18} />
                  View My Work
                </span>
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-glass group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Mail size={18} className="group-hover:rotate-12 transition-transform" />
                  Get In Touch
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              {[
                { icon: Github, href: 'https://github.com/neetesh1541', label: 'GitHub', color: 'hover:text-white' },
                { icon: Linkedin, href: 'https://in.linkedin.com/in/neetesh-kumar-846616287', label: 'LinkedIn', color: 'hover:text-blue-400' },
                { icon: Mail, href: 'mailto:neeteshk1104@gmail.com', label: 'Email', color: 'hover:text-primary' },
              ].map(({ icon: Icon, href, label, color }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full glass-card hover:border-primary/50 transition-all ${color} group`}
                  whileHover={{ scale: 1.15, y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  aria-label={label}
                >
                  <Icon size={20} className="text-muted-foreground group-hover:text-inherit transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Orbiting icons - hidden on mobile for performance */}
              <div className="hidden md:block">
                {floatingIcons.map(({ icon: Icon, delay, x, y }, index) => (
                  <motion.div
                    key={index}
                    className="absolute w-10 h-10 glass-card rounded-xl flex items-center justify-center z-20"
                    style={{ left: '50%', top: '50%' }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      x: [x, x + 8, x],
                      y: [y, y - 8, y],
                    }}
                    transition={{
                      opacity: { delay: 1.2 + delay },
                      scale: { delay: 1.2 + delay },
                      x: { duration: 5, repeat: Infinity, delay: delay },
                      y: { duration: 4, repeat: Infinity, delay: delay },
                    }}
                  >
                    <Icon size={20} className="text-primary" />
                  </motion.div>
                ))}
              </div>

              {/* Glow Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-full blur-3xl"
                animate={{ 
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Rotating Border */}
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, hsl(199 89% 48%), hsl(263 70% 50%), hsl(199 89% 48%))',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Secondary rotating ring */}
              <motion.div
                className="absolute -inset-6 rounded-full border border-primary/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Image Container */}
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-background">
                <img
                  src={profilePhoto}
                  alt="Neetesh Kumar"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              {/* Stats badge */}
              <motion.div
                className="absolute -bottom-2 right-0 glass-card rounded-xl px-4 py-2 z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Available for hire</span>
                </div>
              </motion.div>

              {/* Stats badge */}
              <motion.div
                className="absolute -bottom-2 right-0 glass-card rounded-xl px-4 py-2 z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-muted-foreground">Available for hire</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm">Scroll Down</span>
            <motion.div
              className="relative"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={20} />
              <motion.div
                className="absolute inset-0 blur-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown size={20} className="text-primary" />
              </motion.div>
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
