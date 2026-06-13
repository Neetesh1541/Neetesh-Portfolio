import { useEffect, useRef } from 'react';

const SNIPPETS = [
  'const dev = "Neetesh";',
  'function build() { return ai + ml; }',
  'import torch',
  'while(true) { learn(); }',
  'class Engineer extends Human {}',
  'git commit -m "ship it"',
  'SELECT * FROM ideas;',
  'pip install pandas',
  'def train(model): ...',
  '// TODO: change the world',
  'npm run dev',
  'export default Portfolio;',
  'docker compose up',
  '<NeeteshAI />',
  'await fetch("/api")',
  '0x4E 0x4B',
  '01001110 01001011',
  'useState(true)',
  'tensor.shape',
  'kubectl apply -f',
];

const GLYPHS = '01{}<>/();=+-*[]#$&|';

const CodeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let width = 0;
    let height = 0;
    let columns: { x: number; y: number; speed: number; text: string; offset: number }[] = [];
    const fontSize = 14;

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const colCount = Math.floor(width / 22);
      columns = Array.from({ length: colCount }).map((_, i) => ({
        x: i * 22 + Math.random() * 6,
        y: Math.random() * height,
        speed: 0.3 + Math.random() * 0.7,
        text:
          Math.random() < 0.35
            ? SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)]
            : Array.from({ length: 14 + Math.floor(Math.random() * 14) })
                .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)])
                .join(''),
        offset: Math.random() * 200,
      }));
    };

    init();
    window.addEventListener('resize', init);

    let raf = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.09)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", ui-monospace, monospace`;
      ctx.textBaseline = 'top';

      columns.forEach((c) => {
        const idx = Math.floor((c.y + c.offset) / fontSize);
        const head = c.text[((idx % c.text.length) + c.text.length) % c.text.length] || '0';
        ctx.fillStyle = 'rgba(139, 92, 246, 0.55)';
        ctx.fillText(head, c.x, c.y);

        for (let k = 1; k < 10; k++) {
          const ch = c.text[(((idx - k) % c.text.length) + c.text.length) % c.text.length] || '0';
          const alpha = 0.18 * (1 - k / 10);
          ctx.fillStyle = `rgba(14, 165, 233, ${alpha})`;
          ctx.fillText(ch, c.x, c.y - k * fontSize);
        }

        c.y += c.speed * (reduced ? 0 : 1.2);
        if (c.y > height + 100) {
          c.y = -Math.random() * 200;
          c.speed = 0.3 + Math.random() * 0.7;
        }
      });

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-[0.22] mix-blend-screen"
    />
  );
};

export default CodeBackground;
