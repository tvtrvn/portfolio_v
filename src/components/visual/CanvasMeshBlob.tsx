import React from 'react';

/**
 * Hero special graphic: a hand-rolled canvas "mesh blob" that simulates an
 * organic, lava-lamp-like field. Pure 2D canvas + radial gradients (no WebGL,
 * no deps). Three blobs of warm amber/bone tones drift and orbit each other.
 * Devicethemeaware via the data-theme attribute on <html>.
 *
 * Strictly transform/opacity-free animation (we redraw the canvas, browser
 * never touches layout). Caps at 30fps so it stays buttery on low-end mobiles.
 */
type Blob = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: string;
};

const FRAME_BUDGET_MS = 1000 / 30;

export const CanvasMeshBlob: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number>(0);
  const blobsRef = React.useRef<Blob[]>([]);
  const reduceMotionRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    reduceMotionRef.current = !!mql?.matches;
    const onMqlChange = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches;
    };
    mql?.addEventListener?.('change', onMqlChange);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const palette = () => {
      const isDark = document.documentElement.classList.contains('dark');
      return isDark
        ? ['rgba(212,165,116,0.55)', 'rgba(244,239,230,0.18)', 'rgba(122,91,54,0.45)']
        : ['rgba(212,165,116,0.50)', 'rgba(11,11,14,0.07)', 'rgba(122,91,54,0.22)'];
    };

    const initBlobs = (w: number, h: number) => {
      const colors = palette();
      blobsRef.current = [
        { x: w * 0.35, y: h * 0.4, vx: 0.16, vy: -0.12, r: Math.max(w, h) * 0.55, hue: colors[0] },
        { x: w * 0.65, y: h * 0.6, vx: -0.12, vy: 0.18, r: Math.max(w, h) * 0.55, hue: colors[1] },
        { x: w * 0.5, y: h * 0.5, vx: 0.1, vy: 0.14, r: Math.max(w, h) * 0.45, hue: colors[2] },
      ];
    };

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initBlobs(w, h);
    };

    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    const observer = new MutationObserver(() => {
      const rect = canvas.getBoundingClientRect();
      initBlobs(rect.width, rect.height);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const draw = (now: number) => {
      const elapsed = now - lastTimeRef.current;
      if (elapsed < FRAME_BUDGET_MS) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }
      lastTimeRef.current = now;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      const blobs = blobsRef.current;
      for (const b of blobs) {
        if (!reduceMotionRef.current) {
          b.x += b.vx;
          b.y += b.vy;
          if (b.x < w * 0.2 || b.x > w * 0.8) b.vx *= -1;
          if (b.y < h * 0.2 || b.y > h * 0.8) b.vy *= -1;
        }

        const grad = ctx.createRadialGradient(b.x, b.y, b.r * 0.05, b.x, b.y, b.r);
        grad.addColorStop(0, b.hue);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      // subtle vignette
      const vg = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.75);
      vg.addColorStop(0, 'rgba(0,0,0,0)');
      vg.addColorStop(1, 'rgba(0,0,0,0.25)');
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      observer.disconnect();
      mql?.removeEventListener?.('change', onMqlChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default React.memo(CanvasMeshBlob);
