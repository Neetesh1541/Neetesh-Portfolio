import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Minimal particles for mobile, more for desktop
  const particles = useMemo(() => {
    const count = isMobile ? 8 : 30;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 5,
    }));
  }, [isMobile]);

  // Only show gradient orbs on desktop
  if (isMobile) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Simple gradient background for mobile */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, hsl(var(--secondary) / 0.08) 0%, transparent 50%)',
          }}
        />
        {/* Minimal particles for mobile */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/15"
            style={{
              left: `${particle.x}%`,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: ['-5vh', '105vh'] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient orbs - Desktop only */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.12) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles - Desktop */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: ['-10vh', '110vh'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Subtle grid overlay - Desktop */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />
    </div>
  );
};

export default ParticleBackground;
