import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D particle animation using canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      color: string;
    }> = [];

    const colors = ['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b', '#10b981'];
    
    // Create particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: Math.random() * 5 + 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animationId: number;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Move towards camera (3D effect)
        p.z -= p.vz;
        p.x += p.vx;
        p.y += p.vy;

        // Reset when too close
        if (p.z <= 0) {
          p.z = 1000;
          p.x = Math.random() * canvas.width - canvas.width / 2;
          p.y = Math.random() * canvas.height - canvas.height / 2;
        }

        // 3D projection
        const scale = 500 / p.z;
        const x2d = p.x * scale + centerX;
        const y2d = p.y * scale + centerY;
        const size = p.size * scale;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 2);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.5, p.color + '80');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x2d, y2d, size * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connecting lines between nearby particles
        particles.forEach((p2) => {
          if (p === p2) return;
          const scale2 = 500 / p2.z;
          const x2d2 = p2.x * scale2 + centerX;
          const y2d2 = p2.y * scale2 + centerY;
          const dist = Math.hypot(x2d - x2d2, y2d - y2d2);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d2, y2d2);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 80);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* 3D Canvas Background */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #0f0f23 100%)' }}
          />

          {/* Rotating 3D Cube */}
          <motion.div
            className="relative mb-12 perspective-1000"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          >
            <motion.div
              className="relative w-24 h-24 preserve-3d"
              animate={{
                rotateX: [0, 360],
                rotateY: [0, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Cube faces */}
              {[
                { transform: 'translateZ(48px)', bg: 'from-primary/80 to-primary/40' },
                { transform: 'translateZ(-48px) rotateY(180deg)', bg: 'from-secondary/80 to-secondary/40' },
                { transform: 'translateX(-48px) rotateY(-90deg)', bg: 'from-accent/80 to-accent/40' },
                { transform: 'translateX(48px) rotateY(90deg)', bg: 'from-primary/60 to-secondary/60' },
                { transform: 'translateY(-48px) rotateX(90deg)', bg: 'from-secondary/60 to-accent/60' },
                { transform: 'translateY(48px) rotateX(-90deg)', bg: 'from-accent/60 to-primary/60' },
              ].map((face, i) => (
                <div
                  key={i}
                  className={`absolute w-24 h-24 bg-gradient-to-br ${face.bg} border border-white/20 backdrop-blur-sm flex items-center justify-center`}
                  style={{ transform: face.transform, backfaceVisibility: 'visible' }}
                >
                  <span className="text-3xl font-display font-bold text-white/90 drop-shadow-lg">
                    {['N', 'K', '✦', '◈', '⬡', '◇'][i]}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Orbiting rings */}
            <motion.div
              className="absolute -inset-8 border-2 border-primary/40 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg)' }}
            />
            <motion.div
              className="absolute -inset-12 border border-secondary/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(75deg) rotateY(45deg)' }}
            />
            <motion.div
              className="absolute -inset-16 border border-accent/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(45deg) rotateY(90deg)' }}
            />
          </motion.div>

          {/* Text with gradient animation */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.h1
              className="text-5xl md:text-6xl font-display font-bold mb-4"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899, #8b5cf6)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Neetesh Kumar
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Full Stack Developer & AI Enthusiast
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="relative z-10 mt-8 w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #06b6d4, #ec4899)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  width: `${Math.min(progress, 100)}%`,
                  backgroundPosition: ['0% 50%', '100% 50%'],
                }}
                transition={{
                  width: { duration: 0.3, ease: 'easeOut' },
                  backgroundPosition: { duration: 1, repeat: Infinity },
                }}
              />
            </div>
            <motion.p
              className="text-center mt-3 text-sm text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {Math.min(Math.round(progress), 100)}% — Initializing experience...
            </motion.p>
          </motion.div>

          {/* Decorative floating elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
                background: `linear-gradient(135deg, ${['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'][i % 4]}, transparent)`,
              }}
              animate={{
                y: [0, -40, 0],
                x: [0, 20, 0],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
