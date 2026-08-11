import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import type { SceneLayout, SceneTheme } from '@/components/Scene3DCanvas';

// Heavy WebGL bundle (three / r3f / drei) is only fetched when we decide to render.
const Scene3DCanvas = lazy(() => import('@/components/Scene3DCanvas'));

const THEMES: Record<string, SceneTheme> = {
  dark: {
    key: 'dark',
    crystals: ['#8b5cf6', '#22d3ee', '#ec4899', '#10b981', '#f59e0b'],
    chassis: '#161628',
    base: '#0f0f1c',
    screenBg: '#0b0b18',
    screenEmissive: '#5b21b6',
    emissiveIntensity: 0.35,
    lights: { key: '#a78bfa', fill: '#22d3ee', rim: '#f472b6', intensity: 1 },
    editor: {
      bg: 'linear-gradient(135deg, #0b0f1e 0%, #14082a 100%)',
      text: '#e2e8f0',
      comment: '#64748b',
      keyword: '#c084fc',
      string: '#4ade80',
      fn: '#fbbf24',
      ident: '#38bdf8',
      accent: '#f472b6',
    },
    environment: 'city',
    metalness: 0.85,
    roughness: 0.2,
  },
  light: {
    key: 'light',
    crystals: ['#6d28d9', '#0891b2', '#db2777', '#059669', '#d97706'],
    chassis: '#d8dbe6',
    base: '#eef1f7',
    screenBg: '#f6f7fb',
    screenEmissive: '#a78bfa',
    emissiveIntensity: 0.12,
    lights: { key: '#ffffff', fill: '#c7d2fe', rim: '#fbcfe8', intensity: 1.25 },
    editor: {
      bg: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
      text: '#1e293b',
      comment: '#94a3b8',
      keyword: '#7c3aed',
      string: '#15803d',
      fn: '#b45309',
      ident: '#0369a1',
      accent: '#be185d',
    },
    environment: 'studio',
    metalness: 0.45,
    roughness: 0.45,
  },
  neon: {
    key: 'neon',
    crystals: ['#00ffd5', '#ff00e5', '#7cff00', '#00b3ff', '#ffe600'],
    chassis: '#0a0a12',
    base: '#05050a',
    screenBg: '#03030a',
    screenEmissive: '#00ffd5',
    emissiveIntensity: 0.85,
    lights: { key: '#00ffd5', fill: '#ff00e5', rim: '#7cff00', intensity: 1.35 },
    editor: {
      bg: 'linear-gradient(135deg, #04040c 0%, #0a0020 100%)',
      text: '#d7fff5',
      comment: '#3f7d74',
      keyword: '#ff00e5',
      string: '#7cff00',
      fn: '#ffe600',
      ident: '#00ffd5',
      accent: '#00b3ff',
    },
    environment: 'dawn',
    metalness: 0.95,
    roughness: 0.1,
  },
  minimal: {
    key: 'minimal',
    crystals: ['#94a3b8', '#64748b', '#a1a1aa', '#cbd5e1', '#78716c'],
    chassis: '#2a2a2e',
    base: '#1c1c20',
    screenBg: '#141418',
    screenEmissive: '#64748b',
    emissiveIntensity: 0.15,
    lights: { key: '#e5e7eb', fill: '#94a3b8', rim: '#cbd5e1', intensity: 0.9 },
    editor: {
      bg: 'linear-gradient(135deg, #16161a 0%, #1d1d22 100%)',
      text: '#d4d4d8',
      comment: '#71717a',
      keyword: '#a1a1aa',
      string: '#d4d4d8',
      fn: '#e4e4e7',
      ident: '#a8a29e',
      accent: '#f4f4f5',
    },
    environment: 'apartment',
    metalness: 0.6,
    roughness: 0.5,
  },
};

const clamp = (v: number, min = -1, max = 1) => Math.max(min, Math.min(max, v));

/**
 * Measures the hero copy block and derives a camera / scene transform that keeps
 * the laptop and crystals clear of the text at any viewport size.
 */
const measureLayout = (): SceneLayout & { maskStrength: number; opacity: number } => {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const el = document.getElementById('hero-copy');
  const rect = el?.getBoundingClientRect();

  // How much of the viewport the hero copy occupies, and how far down it reaches.
  const coverage = rect ? clamp((rect.width * rect.height) / (vw * vh), 0, 1) : 0.3;
  const bottomRatio = rect ? clamp(rect.bottom / vh, 0, 1.4) : 0.7;
  // Stacked layout (text spans full width) → the scene must move below the text.
  const stacked = vw < 1024;

  const sceneY = stacked ? -(0.6 + bottomRatio * 1.5) : -(0.1 + coverage * 1.2);
  const scale = stacked ? clamp(0.5 + vw / 2400, 0.45, 0.72) : clamp(0.78 + (vw - 1024) / 3200, 0.78, 1.05);
  const cameraZ = 4.4 + coverage * 3.4 + (stacked ? 1.9 : 0);
  const fov = stacked ? 58 : 46;
  const spread = stacked ? 0.65 : clamp(0.8 + (vw - 1024) / 2600, 0.8, 1.15);
  const maskStrength = clamp(0.45 + coverage * 1.1, 0.5, 0.95);
  const opacity = stacked ? 0.26 : clamp(0.4 + (vw - 1024) / 4000, 0.4, 0.58);

  return { cameraZ, fov, sceneY, scale, spread, isCompact: stacked, maskStrength, opacity };
};

/** Conservative device-pixel-ratio cap based on device capability hints. */
const pickMaxDpr = () => {
  const dpr = window.devicePixelRatio || 1;
  const nav = navigator as Navigator & { deviceMemory?: number; hardwareConcurrency?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const mem = (nav as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
  const lowEnd = cores <= 4 || mem <= 4 || window.innerWidth < 768;
  return Math.min(dpr, lowEnd ? 1 : 1.5);
};

const Scene3DBackground = () => {
  const reduce = useReducedMotion();
  const { theme } = useTheme();
  const scroll = useRef(0);
  const parallax = useRef({ x: 0, y: 0 });
  const parallaxTarget = useRef({ x: 0, y: 0 });
  const [mount, setMount] = useState(false);
  const [maxDpr, setMaxDpr] = useState(1);
  const [layout, setLayout] = useState<SceneLayout & { maskStrength: number; opacity: number }>({
    cameraZ: 5,
    fov: 46,
    sceneY: -0.4,
    scale: 0.9,
    spread: 1,
    isCompact: false,
    maskStrength: 0.6,
    opacity: 0.5,
  });

  // Lazy-load WebGL only when the browser is idle and the device supports it.
  useEffect(() => {
    if (reduce) return;
    const supported = (() => {
      try {
        const c = document.createElement('canvas');
        return !!(c.getContext('webgl2') || c.getContext('webgl'));
      } catch {
        return false;
      }
    })();
    if (!supported) return;

    setMaxDpr(pickMaxDpr());
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    let id: number;
    if (idle) {
      id = idle(() => setMount(true), { timeout: 2500 });
    } else {
      id = window.setTimeout(() => setMount(true), 900);
    }
    return () => {
      const cancel = (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback;
      if (idle && cancel) cancel(id);
      else clearTimeout(id);
    };
  }, [reduce]);

  // Automatic layout guard: re-measure on resize and when hero copy changes size.
  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setLayout(measureLayout()));
    };
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    const el = document.getElementById('hero-copy');
    const ro = el && 'ResizeObserver' in window ? new ResizeObserver(update) : null;
    if (ro && el) ro.observe(el);
    // Fonts/type animation can shift the copy height after first paint.
    const t = window.setTimeout(update, 1200);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(t);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
      ro?.disconnect();
    };
  }, [reduce]);

  // Pointer + touch-drag + device-orientation parallax
  useEffect(() => {
    if (reduce) return;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      parallaxTarget.current.x = clamp(nx * 0.6);
      parallaxTarget.current.y = clamp(ny * 0.4);
    };

    let touchStart: { x: number; y: number } | null = null;
    let base = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      base = { ...parallaxTarget.current };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!touchStart || e.touches.length !== 1) return;
      const dx = (e.touches[0].clientX - touchStart.x) / window.innerWidth;
      const dy = (e.touches[0].clientY - touchStart.y) / window.innerHeight;
      parallaxTarget.current.x = clamp(base.x + dx * 1.5);
      parallaxTarget.current.y = clamp(base.y + dy * 1.2);
    };
    const onTouchEnd = () => { touchStart = null; };

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const nx = clamp(e.gamma / 45);
      const ny = clamp((e.beta - 45) / 45);
      parallaxTarget.current.x = clamp(parallaxTarget.current.x * 0.7 + nx * 0.3);
      parallaxTarget.current.y = clamp(parallaxTarget.current.y * 0.7 + ny * 0.3);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('deviceorientation', onOrient);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('deviceorientation', onOrient);
    };
  }, [reduce]);

  if (reduce || !mount) return null;

  const sceneTheme = THEMES[theme] ?? THEMES.dark;
  const m = layout.maskStrength;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: layout.opacity, transition: 'opacity 400ms ease' }}
    >
      {/* Layout-driven legibility mask: grows with hero-text coverage. */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: layout.isCompact
            ? `radial-gradient(ellipse at top, transparent 0%, hsl(var(--background) / ${m * 0.85}) 45%, hsl(var(--background) / ${Math.min(0.97, m + 0.2)}) 100%)`
            : `radial-gradient(ellipse at center, transparent 0%, hsl(var(--background) / ${m * 0.8}) 60%, hsl(var(--background) / ${Math.min(0.95, m + 0.25)}) 100%)`,
        }}
      />
      <Suspense fallback={null}>
        <Scene3DCanvas
          scroll={scroll}
          parallax={parallax}
          parallaxTarget={parallaxTarget}
          layout={layout}
          theme={sceneTheme}
          maxDpr={maxDpr}
        />
      </Suspense>
    </div>
  );
};

export default Scene3DBackground;
