import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Code2, Braces, Terminal, Cpu, Binary, GitBranch, Database, Boxes } from 'lucide-react';
import { useMemo } from 'react';

/**
 * Ambient 3D-looking background: floating rotating cubes + dev icons that
 * parallax with page scroll. Pointer-events off, low opacity, behind content.
 */
const CUBE_FACES = [
  { t: 'translateZ(40px)', bg: 'from-violet-500/25 to-fuchsia-500/10' },
  { t: 'rotateY(180deg) translateZ(40px)', bg: 'from-cyan-500/25 to-sky-500/10' },
  { t: 'rotateY(90deg) translateZ(40px)', bg: 'from-fuchsia-500/25 to-pink-500/10' },
  { t: 'rotateY(-90deg) translateZ(40px)', bg: 'from-emerald-500/25 to-teal-500/10' },
  { t: 'rotateX(90deg) translateZ(40px)', bg: 'from-indigo-500/25 to-violet-500/10' },
  { t: 'rotateX(-90deg) translateZ(40px)', bg: 'from-sky-500/25 to-cyan-500/10' },
];

const Cube = ({ size = 80, className = '' }: { size?: number; className?: string }) => (
  <div
    className={`relative ${className}`}
    style={{ width: size, height: size, transformStyle: 'preserve-3d' }}
  >
    {CUBE_FACES.map((f, i) => (
      <div
        key={i}
        className={`absolute inset-0 bg-gradient-to-br ${f.bg} border border-white/20 backdrop-blur-[1px] rounded-md`}
        style={{ transform: f.t }}
      />
    ))}
  </div>
);

interface FloatItem {
  id: number;
  left: string;
  top: string;
  depth: number; // 0.2 (far) - 1.2 (near) parallax speed
  size: number;
  duration: number;
  Icon?: typeof Code2;
  isCube?: boolean;
  color?: string;
}

const ITEMS: FloatItem[] = [
  { id: 1, left: '6%', top: '8%', depth: 0.35, size: 90, duration: 22, isCube: true },
  { id: 2, left: '82%', top: '14%', depth: 0.6, size: 56, duration: 14, Icon: Code2, color: 'text-violet-400/50' },
  { id: 3, left: '90%', top: '55%', depth: 0.45, size: 70, duration: 26, isCube: true },
  { id: 4, left: '3%', top: '65%', depth: 0.8, size: 60, duration: 18, Icon: Braces, color: 'text-cyan-400/50' },
  { id: 5, left: '45%', top: '120%', depth: 0.5, size: 100, duration: 28, isCube: true },
  { id: 6, left: '15%', top: '140%', depth: 0.7, size: 64, duration: 16, Icon: Terminal, color: 'text-emerald-400/50' },
  { id: 7, left: '78%', top: '175%', depth: 0.4, size: 80, duration: 24, isCube: true },
  { id: 8, left: '35%', top: '200%', depth: 0.9, size: 58, duration: 15, Icon: Cpu, color: 'text-fuchsia-400/50' },
  { id: 9, left: '88%', top: '230%', depth: 0.55, size: 68, duration: 20, Icon: Binary, color: 'text-sky-400/50' },
  { id: 10, left: '8%', top: '260%', depth: 0.5, size: 90, duration: 30, isCube: true },
  { id: 11, left: '55%', top: '285%', depth: 0.75, size: 54, duration: 17, Icon: GitBranch, color: 'text-indigo-400/50' },
  { id: 12, left: '20%', top: '320%', depth: 0.6, size: 72, duration: 25, isCube: true },
  { id: 13, left: '75%', top: '345%', depth: 0.85, size: 60, duration: 19, Icon: Database, color: 'text-pink-400/50' },
  { id: 14, left: '48%', top: '380%', depth: 0.5, size: 84, duration: 27, isCube: true },
  { id: 15, left: '92%', top: '410%', depth: 0.7, size: 58, duration: 16, Icon: Boxes, color: 'text-violet-400/50' },
];

const FloatingItem = ({ item, scrollY }: { item: FloatItem; scrollY: ReturnType<typeof useScroll>['scrollY'] }) => {
  // Parallax: deeper = slower. Each moves up/down as user scrolls.
  const y = useTransform(scrollY, (v) => -v * item.depth);

  return (
    <motion.div
      className="absolute"
      style={{
        left: item.left,
        top: item.top,
        y,
        perspective: 800,
      }}
    >
      <motion.div
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, 360],
          rotateZ: [0, 180],
        }}
        transition={{
          duration: item.duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {item.isCube ? (
          <Cube size={item.size} />
        ) : item.Icon ? (
          <item.Icon size={item.size} className={item.color} strokeWidth={1.25} />
        ) : null}
      </motion.div>
    </motion.div>
  );
};

const Scene3DBackground = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const items = useMemo(() => ITEMS, []);

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-60"
      style={{ perspective: '1400px' }}
    >
      {/* soft radial to keep text-legibility strong */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.55)_55%,hsl(var(--background)/0.85)_100%)]" />
      <div className="relative w-full h-full">
        {items.map((it) => (
          <FloatingItem key={it.id} item={it} scrollY={scrollY} />
        ))}
      </div>
    </div>
  );
};

export default Scene3DBackground;
