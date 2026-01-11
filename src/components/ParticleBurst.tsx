import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  velocity: number;
  delay: number;
}

interface ParticleBurstProps {
  isActive: boolean;
  originX?: number;
  originY?: number;
  particleCount?: number;
  colors?: string[];
}

const ParticleBurst = ({
  isActive,
  originX = 95,
  originY = 5,
  particleCount = 24,
  colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(199, 89%, 60%)', 'hsl(263, 70%, 60%)'],
}: ParticleBurstProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: originX,
          y: originY,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: (360 / particleCount) * i + Math.random() * 30,
          velocity: Math.random() * 150 + 100,
          delay: Math.random() * 0.1,
        });
      }
      setParticles(newParticles);

      // Clear particles after animation
      const timer = setTimeout(() => setParticles([]), 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, originX, originY, particleCount, colors]);

  return (
    <AnimatePresence>
      {particles.length > 0 && (
        <div className="fixed inset-0 z-[99] pointer-events-none overflow-hidden">
          {particles.map((particle) => {
            const radian = (particle.angle * Math.PI) / 180;
            const endX = Math.cos(radian) * particle.velocity;
            const endY = Math.sin(radian) * particle.velocity;

            return (
              <motion.div
                key={particle.id}
                className="absolute rounded-full"
                style={{
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: particle.color,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                }}
                initial={{ 
                  scale: 0, 
                  x: 0, 
                  y: 0,
                  opacity: 1 
                }}
                animate={{ 
                  scale: [0, 1.5, 1, 0],
                  x: endX,
                  y: endY,
                  opacity: [0, 1, 1, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              />
            );
          })}
          
          {/* Central flash */}
          <motion.div
            className="absolute rounded-full bg-primary"
            style={{
              left: `${originX}%`,
              top: `${originY}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ 
              width: [0, 100, 150],
              height: [0, 100, 150],
              opacity: [1, 0.6, 0],
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default ParticleBurst;