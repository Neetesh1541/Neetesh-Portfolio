import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Html } from '@react-three/drei';
import { Suspense, useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

/**
 * A stylized 3D laptop built from primitive meshes — no external GLB needed.
 * Screen shows a "code editor" via HTML overlay for crispness.
 */
const Laptop = ({ scroll }: { scroll: React.MutableRefObject<number> }) => {
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = scroll.current;
    if (group.current) {
      group.current.rotation.y = s * 2.2 + Math.sin(t * 0.5) * 0.15;
      group.current.rotation.x = -0.15 + Math.sin(t * 0.4) * 0.05;
      group.current.position.y = Math.sin(t * 0.8) * 0.15 - s * 1.5;
    }
    if (lid.current) {
      // Open lid based on scroll from closed → open
      lid.current.rotation.x = THREE.MathUtils.lerp(
        -Math.PI / 2.1,
        -Math.PI / 6,
        Math.min(1, s * 3 + 0.6)
      );
    }
  });

  return (
    <group ref={group} scale={1.1}>
      {/* Base */}
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.1, 1.6]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Keyboard well */}
      <mesh position={[0, 0.01, 0.05]}>
        <boxGeometry args={[2.2, 0.02, 1.35]} />
        <meshStandardMaterial color="#0f0f1c" metalness={0.6} roughness={0.5} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.02, 0.55]}>
        <boxGeometry args={[0.9, 0.005, 0.55]} />
        <meshStandardMaterial color="#2a2a44" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Lid hinge group */}
      <group ref={lid} position={[0, 0, -0.78]}>
        {/* Lid back */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[2.4, 1.5, 0.08]} />
          <meshStandardMaterial color="#161628" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.75, 0.045]}>
          <planeGeometry args={[2.2, 1.32]} />
          <meshStandardMaterial
            color="#0b0b18"
            emissive="#5b21b6"
            emissiveIntensity={0.35}
          />
        </mesh>
        {/* Code overlay */}
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
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  scroll: React.MutableRefObject<number>;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.6;
    ref.current.rotation.y = t * 0.4;
    ref.current.position.y = position[1] + Math.sin(t + position[0]) * 0.3 - scroll.current * 1.2;
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

const Scene = ({ scroll }: { scroll: React.MutableRefObject<number> }) => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} intensity={1.1} color="#a78bfa" />
    <directionalLight position={[-5, 3, -2]} intensity={0.8} color="#22d3ee" />
    <pointLight position={[0, 2, 3]} intensity={0.6} color="#f472b6" />

    <Laptop scroll={scroll} />

    <FloatingCube position={[-3, 1.5, -1]} color="#8b5cf6" scroll={scroll} />
    <FloatingCube position={[3.2, 1.8, -1.5]} color="#22d3ee" scale={0.28} scroll={scroll} />
    <FloatingCube position={[-2.8, -1.5, 0.5]} color="#ec4899" scale={0.22} scroll={scroll} />
    <FloatingCube position={[3, -1.2, 0]} color="#10b981" scale={0.3} scroll={scroll} />
    <FloatingCube position={[0, 2.5, -2]} color="#f59e0b" scale={0.2} scroll={scroll} />

    <Environment preset="city" />
  </>
);

// Smoothly ease scroll progress toward the nearest section snap point.
const SmoothScroll = ({ scroll }: { scroll: React.MutableRefObject<number> }) => {
  const target = useRef(0);
  const raw = useRef(0);

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
    const refresh = () => {
      snaps = getSnapPoints();
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      raw.current = p;
      // Bias toward nearest snap point within a small radius for that "magnetic" feel
      let nearest = p;
      let best = Infinity;
      for (const s of snaps) {
        const d = Math.abs(s - p);
        if (d < best) {
          best = d;
          nearest = s;
        }
      }
      const pull = Math.max(0, 1 - best / 0.06); // strongest within 6% of a section
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
    // Critically-damped lerp for smooth easing
    scroll.current = THREE.MathUtils.lerp(scroll.current, target.current, 0.08);
  });
  return null;
};

const Scene3DBackground = () => {
  const reduce = useReducedMotion();
  const scroll = useRef(0);
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

  if (reduce || !ready) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: isMobile ? 0.3 : 0.55 }}
    >
      {/* Legibility gradient so text always stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.55)_60%,hsl(var(--background)/0.9)_100%)] z-10" />
      <Canvas
        camera={{ position: [0, 0.4, 5], fov: 45 }}
        dpr={[1, isMobile ? 1.25 : 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <SmoothScroll scroll={scroll} />
          <Scene scroll={scroll} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3DBackground;
