import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const rootStyles = getComputedStyle(document.documentElement);

    // Convert CSS HSL format "h s% l%" to canvas-compatible "hsla(h, s%, l%, a)"
    const toHsla = (hsl: string, alpha: number) => {
      const parts = hsl.trim().split(/\s+/);
      if (parts.length >= 3) {
        return `hsla(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
      }
      return `hsla(220, 70%, 50%, ${alpha})`; // fallback
    };

    const colors = [
      toHsla(rootStyles.getPropertyValue('--primary').trim(), 1),
      toHsla(rootStyles.getPropertyValue('--secondary').trim(), 1),
      toHsla(rootStyles.getPropertyValue('--accent').trim(), 1),
    ];

    const particles = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * canvas.width - canvas.width / 2,
      y: Math.random() * canvas.height - canvas.height / 2,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      vz: Math.random() * 4 + 2,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animationId: number;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const animate = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.z -= p.vz;
        if (p.z < 1) p.z = 1000;

        const scale = 500 / p.z;
        const x = p.x * scale + cx;
        const y = p.y * scale + cy;
        const r = p.size * scale;

        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2);
        g.addColorStop(0, p.color);
        g.addColorStop(0.5, p.color.replace(', 1)', ', 0.4)'));
        g.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, r * 2, 0, Math.PI * 2);
        ctx.fillStyle = g;
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
      setProgress(p => (p >= 100 ? 100 : p + Math.random() * 10));
    }, 80);

    const timer = setTimeout(() => setIsLoading(false), 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          <motion.h1
            className="relative text-5xl font-bold gradient-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Neetesh Kumar
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
