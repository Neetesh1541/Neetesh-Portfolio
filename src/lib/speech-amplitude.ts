/**
 * Tiny pub/sub for real-time speech amplitude (0..1).
 * Kept outside React state to avoid re-rendering every animation frame.
 */

let current = 0;
const listeners = new Set<(v: number) => void>();

export const setAmplitude = (v: number) => {
  const clamped = Math.max(0, Math.min(1, v));
  current = clamped;
  listeners.forEach((fn) => fn(clamped));
};

export const getAmplitude = () => current;

export const subscribeAmplitude = (fn: (v: number) => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};
