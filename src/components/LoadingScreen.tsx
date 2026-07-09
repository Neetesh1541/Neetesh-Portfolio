import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import profilePhoto from '@/assets/profile-face.png';

const BOOT_LINES = [
  'booting neural core...',
  'loading design system...',
  'compiling experiences...',
  'warming up GPU shaders...',
  'syncing portfolio data...',
  'calibrating aesthetics...',
  'ready.',
];

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Warp starfield
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
      'rgba(45, 212, 191, 1)',
    ];

    const particles = Array.from({ length: 160 }).map(() => ({
      x: (Math.random() - 0.5) * 2000,
      y: (Math.random() - 0.5) * 2000,
      z: Math.random() * 2000,
      prevX: 0,
      prevY: 0,
      speed: Math.random() * 14 + 6,
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const animate = () => {
      ctx.fillStyle = 'rgba(6, 6, 16, 0.25)';
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

        ctx.strokeStyle = p.color.replace(', 1)', `, ${alpha * 0.55})`);
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

  // Progress + rotating boot lines
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + Math.random() * 6 + 2.5));
    }, 60);
    const lineTimer = setInterval(() => {
      setLineIdx((i) => (i + 1) % BOOT_LINES.length);
    }, 550);
    const timer = setTimeout(() => setIsLoading(false), 3400);
    return () => {
      clearInterval(interval);
      clearInterval(lineTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#06060f] flex flex-col items-center justify-center overflow-hidden"
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Warp starfield */}
          <canvas ref={canvasRef} className="absolute inset-0" />

          {/* Aurora blobs */}
          <motion.div
            className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.55), transparent 60%)' }}
            animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.5), transparent 60%)' }}
            animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(139,92,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(14,165,233,0.6) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-7 px-6">
            {/* Rotating rings around the photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.8, type: 'spring' }}
              className="relative flex items-center justify-center"
            >
              {/* Outer conic ring */}
              <motion.div
                className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full"
                style={{
                  background:
                    'conic-gradient(from 0deg, rgba(139,92,246,0.9), rgba(14,165,233,0), rgba(236,72,153,0.9), rgba(14,165,233,0), rgba(139,92,246,0.9))',
                  mask: 'radial-gradient(circle, transparent 62%, black 63%, black 66%, transparent 67%)',
                  WebkitMask:
                    'radial-gradient(circle, transparent 62%, black 63%, black 66%, transparent 67%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner ring reverse */}
              <motion.div
                className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-white/10"
                style={{
                  boxShadow: '0 0 40px rgba(139,92,246,0.35) inset, 0 0 60px rgba(14,165,233,0.25)',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              {/* Orbiting dots */}
              {[0, 120, 240].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background:
                      i === 0 ? '#a78bfa' : i === 1 ? '#22d3ee' : '#f472b6',
                    boxShadow: `0 0 14px currentColor`,
                    color: i === 0 ? '#a78bfa' : i === 1 ? '#22d3ee' : '#f472b6',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'linear' }}
                  initial={{ rotate: deg }}
                >
                  <div
                    style={{ transform: 'translate(140px, 0)' }}
                    className="w-3 h-3 rounded-full bg-current"
                  />
                </motion.div>
              ))}

              {/* Photo glow */}
              <motion.div
                className="absolute w-48 h-48 md:w-60 md:h-60 rounded-full blur-3xl -z-0"
                style={{
                  background:
                    'radial-gradient(circle, rgba(139,92,246,0.7), rgba(14,165,233,0.35) 45%, transparent 75%)',
                }}
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.95, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              />

              <motion.img
                src={profilePhoto}
                alt="Neetesh Kumar"
                className="relative w-44 h-44 md:w-56 md:h-56 object-contain drop-shadow-[0_10px_40px_rgba(139,92,246,0.6)]"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                Neetesh Kumar
              </h1>
              <motion.p
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.35em' }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-2 text-xs md:text-sm text-cyan-200/80 uppercase"
              >
                AI · Full Stack · Design
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 260 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="relative"
            >
              <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 relative"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="absolute inset-0 blur-md opacity-80 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />
                </motion.div>
              </div>
              <div className="mt-2 flex justify-between text-[10px] font-mono text-white/40 tabular-nums">
                <span>{Math.min(Math.floor(progress), 100).toString().padStart(3, '0')}%</span>
                <span>SYS.OK</span>
              </div>
            </motion.div>

            {/* Rotating boot line */}
            <div className="h-5 relative overflow-hidden w-72 text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lineIdx}
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-xs md:text-sm font-mono text-white/60 tracking-wider"
                >
                  <span className="text-cyan-300/80">&gt;</span> {BOOT_LINES[lineIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
