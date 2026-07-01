import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { getAmplitude, subscribeAmplitude } from '@/lib/speech-amplitude';
import type { MouthBox } from '@/lib/mouth-calibration';

interface MouthOverlayProps {
  box: MouthBox;
  active: boolean;
  /** Show a visible red outline for calibration. */
  debug?: boolean;
}

/**
 * Renders a soft skin-toned shadow at the mouth position and morphs its
 * shape (scale, opacity, blur) in real time from the current speech
 * amplitude. Uses direct DOM writes via rAF — no React re-renders per
 * frame. Fully disabled when `prefers-reduced-motion` is set.
 */
const MouthOverlay = ({ box, active, debug = false }: MouthOverlayProps) => {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const smoothed = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (!active || reduceMotion) {
      // Reset to resting state.
      if (rootRef.current) {
        rootRef.current.style.transform = 'translate(-50%, -50%) scale(1, 1)';
        rootRef.current.style.opacity = '0';
        rootRef.current.style.filter = 'blur(1.2px)';
      }
      if (innerRef.current) {
        innerRef.current.style.transform = 'scaleY(0)';
        innerRef.current.style.opacity = '0';
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      return;
    }

    const tick = () => {
      // Smooth toward the current amplitude to hide sample noise.
      const target = getAmplitude();
      smoothed.current += (target - smoothed.current) * 0.35;
      const amp = smoothed.current;

      if (rootRef.current) {
        // Vertical stretch dominates for realistic mouth opening.
        const scaleY = 1 + amp * 2.4;
        const scaleX = 1 + amp * 0.15;
        const blur = 1.2 + amp * 1.8;
        const opacity = 0.35 + amp * 0.55;
        rootRef.current.style.transform = `translate(-50%, -50%) scale(${scaleX}, ${scaleY})`;
        rootRef.current.style.opacity = String(opacity);
        rootRef.current.style.filter = `blur(${blur.toFixed(2)}px)`;
      }
      if (innerRef.current) {
        // Inner darker layer emerges only on louder frames — reads as the
        // inside of the mouth.
        const innerScale = Math.max(0, (amp - 0.15) * 1.6);
        innerRef.current.style.transform = `scaleY(${innerScale.toFixed(3)})`;
        innerRef.current.style.opacity = String(Math.min(0.9, amp * 1.4));
      }

      rafId.current = requestAnimationFrame(tick);
    };

    const unsub = subscribeAmplitude(() => {
      /* value pulled inside tick; subscription keeps provider hot */
    });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      unsub();
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = null;
    };
  }, [active, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        top: `${box.topPct}%`,
        left: `${box.leftPct}%`,
        width: `${box.widthPct}%`,
        height: `${box.heightPct}%`,
        transform: 'translate(-50%, -50%)',
        outline: debug ? '1px dashed rgba(255,80,80,0.9)' : undefined,
      }}
    >
      {/* Outer skin-blend shadow — the animated "lip" layer */}
      <div
        ref={rootRef}
        className="absolute left-1/2 top-1/2 w-full h-full"
        style={{
          transform: 'translate(-50%, -50%) scale(1,1)',
          transformOrigin: '50% 50%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(55,20,15,0.6) 0%, rgba(95,45,35,0.35) 55%, rgba(120,80,70,0) 100%)',
          mixBlendMode: 'multiply',
          filter: 'blur(1.2px)',
          opacity: 0,
          transition: 'opacity 90ms linear',
          willChange: 'transform, opacity, filter',
        }}
      />
      {/* Inner darker layer — reads as the inside of the mouth */}
      <div
        ref={innerRef}
        className="absolute left-1/2 top-1/2"
        style={{
          width: '55%',
          height: '55%',
          transform: 'translate(-50%, -50%) scaleY(0)',
          transformOrigin: '50% 50%',
          borderRadius: '50%',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(20,5,5,0.85) 0%, rgba(30,10,10,0.4) 60%, rgba(30,10,10,0) 100%)',
          mixBlendMode: 'multiply',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      />
    </div>
  );
};

export default MouthOverlay;
