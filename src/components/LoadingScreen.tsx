import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import profilePhoto from '@/assets/profile-face.png';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let cx = 0;
    let cy = 0;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = canvas.width / 2;
      cy = canvas.height / 2;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const colors = [
      'rgba(14, 165, 233, 1)',
      'rgba(139, 92, 246, 1)',
      'rgba(236, 72, 153, 1)',
    ];

    const particles = Array.from({ length: 120 }).map(() => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
      prevX: 0,
      prevY: 0,
      speed: Math.random() * 12 + 6,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const prevScale = 400 / (p.z + 1);
        p.prevX = p.x * prevScale + cx;
        p.prevY = p.y * prevScale + cy;

        p.z -= p.speed;
        if (p.z <= 0) {
          p.z = 2000;
          p.x = (Math.random() - 0.5) * 2000;
          p.y = (Math.random() - 0.5) * 2000;
        }
        const scale = 400 / p.z;
        const x = p.x * scale + cx;
        const y = p.y * scale + cy;
        const r = Math.max(0.5, p.size * scale);
        const alpha = Math.min(1, (2000 - p.z) / 1000);

        ctx.strokeStyle = p.color.replace(', 1)', `, ${alpha * 0.5})`);
        ctx.lineWidth = r * 0.5;
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setSize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + Math.random() * 8 + 3));
    }, 60);
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#0a0a14] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          <div className="relative z-10 flex flex-col items-center gap-6 px-6">
            {/* Animated photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
              className="relative"
            >
              {/* Pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.6), rgba(14,165,233,0.3), transparent 70%)' }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              {/* Rotating gradient ring */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              {/* Counter ring */}
              <motion.div
                className="absolute -inset-5 rounded-full border-2 border-dashed border-cyan-400/40"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              {/* Photo */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-[#0a0a14] bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                <img
                  src={profilePhoto}
                  alt="Neetesh Kumar"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                Neetesh Kumar
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-2 text-sm md:text-base text-cyan-200/70 tracking-[0.3em] uppercase"
              >
                Full Stack Developer
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 220 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ delay: 0.8, duration: 1.6, repeat: Infinity }}
              className="text-xs md:text-sm text-white/50 tracking-wider"
            >
              Crafting the experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
