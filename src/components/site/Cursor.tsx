import { useEffect, useRef, useState } from "react";

/**
 * Frosted lens cursor. Position and state are written straight to the DOM via a ref
 * (no React re-render per pointer move); a single rAF loop runs only while moving.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!mq.matches) return;
    setOn(true);
  }, []);

  useEffect(() => {
    if (!on) return;
    const el = ref.current!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = reduced ? 1 : 0.3;
    document.documentElement.classList.add("has-cursor");
    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf = 0,
      visible = false;

    const setState = (s: string) => {
      if (el.dataset["state"] !== s) el.dataset["state"] = s;
    };
    const loop = () => {
      cx += (x - cx) * k;
      cy += (y - cy) * k;
      el.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        cx = x;
        cy = y;
        visible = true;
      } // snap on (re)entry: no jump
      const t = (e.target as Element).closest?.(
        "[data-cursor],a,button,input,textarea,select,[contenteditable]",
      );
      if (!t) setState("default");
      else if (t.matches("input,textarea,select,[contenteditable]")) setState("hidden");
      else setState(t.getAttribute("data-cursor") ?? (t.tagName === "BUTTON" ? "button" : "link"));
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const leave = () => {
      visible = false;
      setState("hidden");
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [on]);

  if (!on) return null;
  return (
    <div ref={ref} className="lens" data-state="hidden" aria-hidden>
      <span>VER PROJETO</span>
    </div>
  );
}
