import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Html } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

type Vec2Ref = React.MutableRefObject<{ x: number; y: number }>;

/**
 * Stylized 3D laptop built from primitive meshes.
 * Reacts to scroll (open/close, tilt) AND a shared parallax vector
 * driven by pointer/touch/device-orientation input.
 */
const Laptop = ({
  scroll,
  parallax,
  mobileScale,
}: {
  scroll: React.MutableRefObject<number>;
  parallax: Vec2Ref;
  mobileScale: number;
}) => {
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scroll.current;
    const px = parallax.current.x;
    const py = parallax.current.y;
    if (group.current) {
      group.current.rotation.y = s * 2.2 + Math.sin(t * 0.5) * 0.15 + px * 0.6;
      group.current.rotation.x = -0.15 + Math.sin(t * 0.4) * 0.05 - py * 0.35;
      group.current.position.y = Math.sin(t * 0.8) * 0.15 - s * 1.5 + py * 0.4;
      group.current.position.x = px * 0.8;
    }
    if (lid.current) {
      lid.current.rotation.x = THREE.MathUtils.lerp(
        -Math.PI / 2.1,
        -Math.PI / 6,
        Math.min(1, s * 3 + 0.6)
      );
    }
  });

  return (
    <group ref={group} scale={mobileScale}>
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.1, 1.6]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.01, 0.05]}>
        <boxGeometry args={[2.2, 0.02, 1.35]} />
        <meshStandardMaterial color="#0f0f1c" metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.02, 0.55]}>
        <boxGeometry args={[0.9, 0.005, 0.55]} />
        <meshStandardMaterial color="#2a2a44" metalness={0.7} roughness={0.3} />
      </mesh>

      <group ref={lid} position={[0, 0, -0.78]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[2.4, 1.5, 0.08]} />
          <meshStandardMaterial color="#161628" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.75, 0.045]}>
          <planeGeometry args={[2.2, 1.32]} />
          <meshStandardMaterial color="#0b0b18" emissive="#5b21b6" emissiveIntensity={0.35} />
        </mesh>
        <Html
          transform
          position={[0, 0.75, 0.05]}
          distanceFactor={1.4}
          style={{
            width: '440px',
            height: '260px',
            background: 'linear-gradient(135deg, #0b0f1e 0%, #14082a 100%)',
            padding: '14px 16px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            lineHeight: '1.55',
            color: '#e2e8f0',
            borderRadius: '4px',
            overflow: 'hidden',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div style={{ color: '#64748b' }}>// portfolio.tsx</div>
          <div>
            <span style={{ color: '#c084fc' }}>import</span>{' '}
            <span style={{ color: '#f472b6' }}>{'{ Dev }'}</span>{' '}
            <span style={{ color: '#c084fc' }}>from</span>{' '}
            <span style={{ color: '#4ade80' }}>'@neetesh/core'</span>;
          </div>
          <div style={{ marginTop: 6 }}>
            <span style={{ color: '#c084fc' }}>const</span>{' '}
            <span style={{ color: '#38bdf8' }}>me</span> ={' '}
            <span style={{ color: '#c084fc' }}>new</span>{' '}
            <span style={{ color: '#fbbf24' }}>Dev</span>({'{'}
          </div>
          <div style={{ paddingLeft: 14 }}>
            name: <span style={{ color: '#4ade80' }}>'Neetesh'</span>,
          </div>
          <div style={{ paddingLeft: 14 }}>
            stack: [<span style={{ color: '#4ade80' }}>'AI'</span>,{' '}
            <span style={{ color: '#4ade80' }}>'React'</span>,{' '}
            <span style={{ color: '#4ade80' }}>'Python'</span>],
          </div>
          <div style={{ paddingLeft: 14 }}>
            passion: <span style={{ color: '#f472b6' }}>Infinity</span>,
          </div>
          <div>{'});'}</div>
          <div style={{ marginTop: 6 }}>
            <span style={{ color: '#38bdf8' }}>me</span>.
            <span style={{ color: '#fbbf24' }}>build</span>(
            <span style={{ color: '#4ade80' }}>'future'</span>);
          </div>
          <div style={{ marginTop: 10, color: '#22d3ee' }}>
            <span style={{ color: '#64748b' }}>$</span> npm run dev
            <span style={{ color: '#4ade80' }}> ✓ ready</span>
          </div>
        </Html>
      </group>
    </group>
  );
};

const FloatingCube = ({
  position,
  color,
  scale = 0.35,
  scroll,
  parallax,
  depth = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  scroll: React.MutableRefObject<number>;
  parallax: Vec2Ref;
  depth?: number;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const px = parallax.current.x;
    const py = parallax.current.y;
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.4;
    ref.current.position.y =
      position[1] + Math.sin(t + position[0]) * 0.3 - scroll.current * 1.2 + py * depth * 0.9;
    ref.current.position.x = position[0] + px * depth * 1.2;
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={2}
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>
    </Float>
  );
};

const Scene = ({
  scroll,
  parallax,
  isMobile,
}: {
  scroll: React.MutableRefObject<number>;
  parallax: Vec2Ref;
  isMobile: boolean;
}) => {
  // Push the whole scene down on mobile so it sits below the hero text,
  // and shrink it so it stays fully centered without clipping.
  const groupY = isMobile ? -1.6 : 0;
  const groupScale = isMobile ? 0.7 : 1;
  const spread = isMobile ? 0.7 : 1;
  const laptopScale = isMobile ? 1.0 : 1.1;

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.1} color="#a78bfa" />
      <directionalLight position={[-5, 3, -2]} intensity={0.8} color="#22d3ee" />
      <pointLight position={[0, 2, 3]} intensity={0.6} color="#f472b6" />

      <group position={[0, groupY, 0]} scale={groupScale}>
        <Laptop scroll={scroll} parallax={parallax} mobileScale={laptopScale} />

        <FloatingCube position={[-3 * spread, 1.5, -1]} color="#8b5cf6" scroll={scroll} parallax={parallax} depth={1.2} />
        <FloatingCube position={[3.2 * spread, 1.8, -1.5]} color="#22d3ee" scale={0.28} scroll={scroll} parallax={parallax} depth={1.4} />
        <FloatingCube position={[-2.8 * spread, -1.5, 0.5]} color="#ec4899" scale={0.22} scroll={scroll} parallax={parallax} depth={0.9} />
        <FloatingCube position={[3 * spread, -1.2, 0]} color="#10b981" scale={0.3} scroll={scroll} parallax={parallax} depth={1.0} />
        <FloatingCube position={[0, 2.5, -2]} color="#f59e0b" scale={0.2} scroll={scroll} parallax={parallax} depth={0.7} />
      </group>

      <Environment preset="city" />
    </>
  );
};

// Ease scroll progress toward the nearest section snap point.
const SmoothScroll = ({ scroll }: { scroll: React.MutableRefObject<number> }) => {
  const target = useRef(0);

  useEffect(() => {
    const getSnapPoints = () => {
      const ids = ['about', 'skills', 'projects', 'blog', 'achievements', 'experience', 'contact'];
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return [0];
      const pts = [0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) pts.push(Math.min(1, Math.max(0, el.offsetTop / max)));
      });
      pts.push(1);
      return pts;
    };

    let snaps = getSnapPoints();
    const refresh = () => { snaps = getSnapPoints(); };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      let nearest = p;
      let best = Infinity;
      for (const s of snaps) {
        const d = Math.abs(s - p);
        if (d < best) { best = d; nearest = s; }
      }
      const pull = Math.max(0, 1 - best / 0.06);
      target.current = p * (1 - pull * 0.35) + nearest * (pull * 0.35);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', refresh);
    refresh();
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', refresh);
    };
  }, [scroll]);

  useFrame(() => {
    scroll.current = THREE.MathUtils.lerp(scroll.current, target.current, 0.08);
  });
  return null;
};

// Smoothly ease the shared parallax vector toward the input target.
const SmoothParallax = ({
  parallax,
  targetRef,
}: {
  parallax: Vec2Ref;
  targetRef: Vec2Ref;
}) => {
  useFrame(() => {
    parallax.current.x = THREE.MathUtils.lerp(parallax.current.x, targetRef.current.x, 0.08);
    parallax.current.y = THREE.MathUtils.lerp(parallax.current.y, targetRef.current.y, 0.08);
  });
  return null;
};

const clamp = (v: number, min = -1, max = 1) => Math.max(min, Math.min(max, v));

const Scene3DBackground = () => {
  const reduce = useReducedMotion();
  const scroll = useRef(0);
  const parallax = useRef({ x: 0, y: 0 });
  const parallaxTarget = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 100);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', check);
    };
  }, []);

  // Pointer + touch-drag + device-orientation parallax
  useEffect(() => {
    if (reduce) return;

    const onPointerMove = (e: PointerEvent) => {
      // Ignore fine touch scroll — we track drag separately below.
      if (e.pointerType === 'touch') return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      parallaxTarget.current.x = clamp(nx * 0.6);
      parallaxTarget.current.y = clamp(ny * 0.4);
    };

    // Touch drag: use finger movement as parallax input on mobile.
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

    // Device orientation: gentle tilt-based parallax on mobile.
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      // gamma: [-90, 90] (left/right), beta: [-180, 180] (front/back)
      const nx = clamp(e.gamma / 45);
      const ny = clamp((e.beta - 45) / 45);
      // Blend gently so orientation doesn't fight active touch drag.
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

  if (reduce || !ready) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: isMobile ? 0.28 : 0.55 }}
    >
      {/* Stronger legibility mask on mobile so text always wins. */}
      <div
        className={
          'absolute inset-0 z-10 ' +
          (isMobile
            ? 'bg-[radial-gradient(ellipse_at_top,transparent_0%,hsl(var(--background)/0.75)_45%,hsl(var(--background)/0.95)_100%)]'
            : 'bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.55)_60%,hsl(var(--background)/0.9)_100%)]')
        }
      />
      <Canvas
        camera={{ position: [0, 0.4, isMobile ? 6.4 : 5], fov: isMobile ? 55 : 45 }}
        dpr={[1, isMobile ? 1.25 : 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SmoothScroll scroll={scroll} />
          <SmoothParallax parallax={parallax} targetRef={parallaxTarget} />
          <Scene scroll={scroll} parallax={parallax} isMobile={isMobile} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3DBackground;
