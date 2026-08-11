import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, Html } from '@react-three/drei';
import { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';

type Vec2Ref = React.MutableRefObject<{ x: number; y: number }>;

export interface SceneTheme {
  key: string;
  /** Accent colors for floating crystals */
  crystals: string[];
  /** Laptop chassis + screen bezel */
  chassis: string;
  base: string;
  screenBg: string;
  screenEmissive: string;
  emissiveIntensity: number;
  lights: { key: string; fill: string; rim: string; intensity: number };
  /** Editor UI colors inside the laptop screen */
  editor: {
    bg: string;
    text: string;
    comment: string;
    keyword: string;
    string: string;
    fn: string;
    ident: string;
    accent: string;
  };
  environment: 'city' | 'studio' | 'dawn' | 'apartment';
  metalness: number;
  roughness: number;
}

export interface SceneLayout {
  cameraZ: number;
  fov: number;
  sceneY: number;
  scale: number;
  spread: number;
  isCompact: boolean;
}

const Laptop = ({
  scroll,
  parallax,
  theme,
}: {
  scroll: React.MutableRefObject<number>;
  parallax: Vec2Ref;
  theme: SceneTheme;
}) => {
  const group = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const e = theme.editor;

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
    <group ref={group}>
      <mesh position={[0, -0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.1, 1.6]} />
        <meshStandardMaterial
          color={theme.chassis}
          metalness={theme.metalness}
          roughness={theme.roughness}
        />
      </mesh>
      <mesh position={[0, 0.01, 0.05]}>
        <boxGeometry args={[2.2, 0.02, 1.35]} />
        <meshStandardMaterial color={theme.base} metalness={0.6} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.02, 0.55]}>
        <boxGeometry args={[0.9, 0.005, 0.55]} />
        <meshStandardMaterial color={theme.base} metalness={0.7} roughness={0.3} />
      </mesh>

      <group ref={lid} position={[0, 0, -0.78]}>
        <mesh position={[0, 0.75, 0]} castShadow>
          <boxGeometry args={[2.4, 1.5, 0.08]} />
          <meshStandardMaterial
            color={theme.chassis}
            metalness={theme.metalness}
            roughness={theme.roughness}
          />
        </mesh>
        <mesh position={[0, 0.75, 0.045]}>
          <planeGeometry args={[2.2, 1.32]} />
          <meshStandardMaterial
            color={theme.screenBg}
            emissive={theme.screenEmissive}
            emissiveIntensity={theme.emissiveIntensity}
          />
        </mesh>
        <Html
          transform
          position={[0, 0.75, 0.05]}
          distanceFactor={1.4}
          style={{
            width: '440px',
            height: '260px',
            background: e.bg,
            padding: '14px 16px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '11px',
            lineHeight: '1.55',
            color: e.text,
            borderRadius: '4px',
            overflow: 'hidden',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div style={{ color: e.comment }}>// portfolio.tsx</div>
          <div>
            <span style={{ color: e.keyword }}>import</span>{' '}
            <span style={{ color: e.accent }}>{'{ Dev }'}</span>{' '}
            <span style={{ color: e.keyword }}>from</span>{' '}
            <span style={{ color: e.string }}>'@neetesh/core'</span>;
          </div>
          <div style={{ marginTop: 6 }}>
            <span style={{ color: e.keyword }}>const</span>{' '}
            <span style={{ color: e.ident }}>me</span> ={' '}
            <span style={{ color: e.keyword }}>new</span>{' '}
            <span style={{ color: e.fn }}>Dev</span>({'{'}
          </div>
          <div style={{ paddingLeft: 14 }}>
            name: <span style={{ color: e.string }}>'Neetesh'</span>,
          </div>
          <div style={{ paddingLeft: 14 }}>
            stack: [<span style={{ color: e.string }}>'AI'</span>,{' '}
            <span style={{ color: e.string }}>'React'</span>,{' '}
            <span style={{ color: e.string }}>'Python'</span>],
          </div>
          <div style={{ paddingLeft: 14 }}>
            passion: <span style={{ color: e.accent }}>Infinity</span>,
          </div>
          <div>{'});'}</div>
          <div style={{ marginTop: 6 }}>
            <span style={{ color: e.ident }}>me</span>.
            <span style={{ color: e.fn }}>build</span>(
            <span style={{ color: e.string }}>'future'</span>);
          </div>
          <div style={{ marginTop: 10, color: e.ident }}>
            <span style={{ color: e.comment }}>$</span> npm run dev
            <span style={{ color: e.string }}> ✓ ready</span>
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
  theme,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  scroll: React.MutableRefObject<number>;
  parallax: Vec2Ref;
  depth?: number;
  theme: SceneTheme;
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
          metalness={theme.metalness}
          roughness={theme.roughness}
        />
      </mesh>
    </Float>
  );
};

/** Keeps camera + scene transform in sync with the measured layout, eased. */
const LayoutRig = ({ layout }: { layout: SceneLayout }) => {
  useFrame((state) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    cam.position.z = THREE.MathUtils.lerp(cam.position.z, layout.cameraZ, 0.08);
    const nextFov = THREE.MathUtils.lerp(cam.fov, layout.fov, 0.08);
    if (Math.abs(nextFov - cam.fov) > 0.01) {
      cam.fov = nextFov;
      cam.updateProjectionMatrix();
    }
  });
  return null;
};

const Scene = ({
  scroll,
  parallax,
  layout,
  theme,
}: {
  scroll: React.MutableRefObject<number>;
  parallax: Vec2Ref;
  layout: SceneLayout;
  theme: SceneTheme;
}) => {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    if (!group.current) return;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, layout.sceneY, 0.08);
    const s = THREE.MathUtils.lerp(group.current.scale.x, layout.scale, 0.08);
    group.current.scale.setScalar(s);
  });

  const c = theme.crystals;
  const spread = layout.spread;

  return (
    <>
      <ambientLight intensity={0.4 * theme.lights.intensity} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.1 * theme.lights.intensity}
        color={theme.lights.key}
      />
      <directionalLight
        position={[-5, 3, -2]}
        intensity={0.8 * theme.lights.intensity}
        color={theme.lights.fill}
      />
      <pointLight
        position={[0, 2, 3]}
        intensity={0.6 * theme.lights.intensity}
        color={theme.lights.rim}
      />

      <group ref={group} position={[0, layout.sceneY, 0]} scale={layout.scale}>
        <Laptop scroll={scroll} parallax={parallax} theme={theme} />

        <FloatingCube position={[-3 * spread, 1.5, -1]} color={c[0]} scroll={scroll} parallax={parallax} depth={1.2} theme={theme} />
        <FloatingCube position={[3.2 * spread, 1.8, -1.5]} color={c[1]} scale={0.28} scroll={scroll} parallax={parallax} depth={1.4} theme={theme} />
        <FloatingCube position={[-2.8 * spread, -1.5, 0.5]} color={c[2]} scale={0.22} scroll={scroll} parallax={parallax} depth={0.9} theme={theme} />
        <FloatingCube position={[3 * spread, -1.2, 0]} color={c[3]} scale={0.3} scroll={scroll} parallax={parallax} depth={1.0} theme={theme} />
        <FloatingCube position={[0, 2.5, -2]} color={c[4]} scale={0.2} scroll={scroll} parallax={parallax} depth={0.7} theme={theme} />
      </group>

      <Environment preset={theme.environment} />
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

/** The heavy WebGL payload — loaded lazily by Scene3DBackground. */
const Scene3DCanvas = ({
  scroll,
  parallax,
  parallaxTarget,
  layout,
  theme,
  maxDpr,
}: {
  scroll: React.MutableRefObject<number>;
  parallax: Vec2Ref;
  parallaxTarget: Vec2Ref;
  layout: SceneLayout;
  theme: SceneTheme;
  maxDpr: number;
}) => (
  <Canvas
    camera={{ position: [0, 0.4, layout.cameraZ], fov: layout.fov }}
    dpr={[1, maxDpr]}
    gl={{
      antialias: maxDpr > 1.1,
      alpha: true,
      powerPreference: maxDpr > 1.1 ? 'high-performance' : 'low-power',
    }}
  >
    <Suspense fallback={null}>
      <SmoothScroll scroll={scroll} />
      <SmoothParallax parallax={parallax} targetRef={parallaxTarget} />
      <LayoutRig layout={layout} />
      <Scene scroll={scroll} parallax={parallax} layout={layout} theme={theme} />
    </Suspense>
  </Canvas>
);

export default Scene3DCanvas;
