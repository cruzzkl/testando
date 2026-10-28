import { useEffect, useRef } from "react";

/** CSS-3D sculpture: matte sphere wrapped in orbital rings, tilting toward the pointer. */
export function HeroObject() {
  const wrap = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pause the continuous spin while off-screen.
    const io = new IntersectionObserver(([e]) => wrap.current?.classList.toggle("is-paused", !e?.isIntersecting));
    if (wrap.current) io.observe(wrap.current);

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return () => io.disconnect();
    let raf = 0, px = 0, py = 0;
    const apply = () => {
      raf = 0;
      if (ref.current) ref.current.style.transform = `rotateX(${(py / innerHeight - 0.5) * -16}deg) rotateY(${(px / innerWidth - 0.5) * 22}deg)`;
    };
    const m = (e: PointerEvent) => { px = e.clientX; py = e.clientY; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("pointermove", m, { passive: true });
    return () => { io.disconnect(); cancelAnimationFrame(raf); window.removeEventListener("pointermove", m); };
  }, []);

  const rings = [0, 30, 60, 90, 120, 150];
  return (
    <div ref={wrap} className="stage relative aspect-square w-full" aria-hidden>
      <div ref={ref} className="obj absolute inset-0">
        <div className="spinner">
          {rings.map((r) => <div key={r} className="ring" style={{ transform: `rotateY(${r}deg)` }} />)}
          <div className="ring border-primary/70" style={{ transform: "rotateX(90deg) scale(1.08)" }} />
        </div>
        <div className="core" />
        <div className="absolute left-[71%] top-[18%] h-3 w-3 rounded-full bg-primary" style={{ transform: "translateZ(120px)" }} />
      </div>
    </div>
  );
}
