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

    // Use fixed, canvas-compatible colors to avoid any parsing issues
    const colors = [
      'rgba(14, 165, 233, 1)',   // cyan-500
      'rgba(139, 92, 246, 1)',   // violet-500
      'rgba(236, 72, 153, 1)',   // pink-500
    ];

    // Create particles with 3D star-field effect
    const particles = Array.from({ length: 150 }).map(() => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
      prevX: 0,
      prevY: 0,
      speed: Math.random() * 15 + 8,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Nebula clouds
    const nebulae = Array.from({ length: 5 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 200 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: (Math.random() - 0.5) * 0.5,
    }));

    const animate = () => {
      // Fade trail effect
      ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula clouds
      nebulae.forEach(n => {
        n.x += n.drift;
        if (n.x < -n.radius) n.x = canvas.width + n.radius;
        if (n.x > canvas.width + n.radius) n.x = -n.radius;

        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        gradient.addColorStop(0, n.color.replace(', 1)', ', 0.15)'));
        gradient.addColorStop(0.5, n.color.replace(', 1)', ', 0.05)'));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(n.x - n.radius, n.y - n.radius, n.radius * 2, n.radius * 2);
      });

      // Draw star-field particles with trails
      particles.forEach(p => {
        // Store previous screen position for trail
        const prevScale = 400 / (p.z + 1);
        p.prevX = p.x * prevScale + cx;
        p.prevY = p.y * prevScale + cy;

        // Move particle towards camera
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

        // Draw trail line
        const trailAlpha = Math.min(1, (2000 - p.z) / 1000);
        ctx.strokeStyle = p.color.replace(', 1)', `, ${trailAlpha * 0.6})`);
        ctx.lineWidth = r * 0.5;
        ctx.beginPath();
        ctx.moveTo(p.prevX, p.prevY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Draw glowing particle
        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
        glow.addColorStop(0, p.color);
        glow.addColorStop(0.4, p.color.replace(', 1)', ', 0.5)'));
        glow.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = glow;
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
      setProgress(p => (p >= 100 ? 100 : p + Math.random() * 8 + 2));
    }, 60);

    const timer = setTimeout(() => setIsLoading(false), 2800);

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />
          
          {/* Centered content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Animated name with glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                Neetesh Kumar
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-3 text-lg text-cyan-200/70 tracking-widest uppercase"
              >
                Full Stack Developer
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 200 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-1 bg-white/10 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ delay: 0.6, duration: 1.5, repeat: Infinity }}
              className="text-sm text-white/50 tracking-wider"
            >
              Initializing experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;