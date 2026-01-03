import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'circle' | 'square' | 'triangle' | 'hexagon';
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  type: 'ring' | 'dot' | 'cross' | 'diamond';
}

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    const types: Particle['type'][] = ['circle', 'square', 'triangle', 'hexagon'];
    
    for (let i = 0; i < 60; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
    setParticles(newParticles);

    const newShapes: FloatingShape[] = [];
    const shapeTypes: FloatingShape['type'][] = ['ring', 'dot', 'cross', 'diamond'];
    
    for (let i = 0; i < 15; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * 360,
        duration: Math.random() * 30 + 20,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      });
    }
    setShapes(newShapes);
  }, []);

  const renderShape = (shape: FloatingShape) => {
    const baseClasses = "absolute opacity-[0.03]";
    
    switch (shape.type) {
      case 'ring':
        return (
          <div
            className={`${baseClasses} rounded-full border-2 border-primary`}
            style={{ width: shape.size, height: shape.size }}
          />
        );
      case 'dot':
        return (
          <div
            className={`${baseClasses} rounded-full bg-primary`}
            style={{ width: shape.size / 2, height: shape.size / 2 }}
          />
        );
      case 'cross':
        return (
          <div className={baseClasses} style={{ width: shape.size, height: shape.size }}>
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-0.5 h-full bg-primary -translate-x-1/2" />
          </div>
        );
      case 'diamond':
        return (
          <div
            className={`${baseClasses} bg-primary rotate-45`}
            style={{ width: shape.size / 2, height: shape.size / 2 }}
          />
        );
      default:
        return null;
    }
  };

  const connectionLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; id: string }[] = [];
    for (let i = 0; i < 8; i++) {
      lines.push({
        id: `line-${i}`,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
      });
    }
    return lines;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Animated connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        {connectionLines.map((line, index) => (
          <motion.line
            key={line.id}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 0], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 1.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Floating geometric shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={`shape-${shape.id}`}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation],
            opacity: [0.03, 0.08, 0.03],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
      
      {/* Floating particles with varied shapes */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-primary/20"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: particle.type === 'circle' ? '50%' : 
                         particle.type === 'square' ? '2px' : 
                         particle.type === 'triangle' ? '0' : '50%',
            clipPath: particle.type === 'triangle' 
              ? 'polygon(50% 0%, 0% 100%, 100% 100%)' 
              : particle.type === 'hexagon'
              ? 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
              : undefined,
          }}
          animate={{
            y: ['-10vh', '110vh'],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'linear',
          }}
        />
      ))}

      {/* Animated grid overlay */}
      <motion.div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '60px 60px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Scan line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{
          top: ['-10%', '110%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default ParticleBackground;
