import { useEffect, useRef, useState } from "react";

export const LINKS = [
  ["inicio", "Início"],
  ["sobre", "Sobre"],
  ["projetos", "Projetos"],
  ["servicos", "Serviços"],
  ["contato", "Contato"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    LINKS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    window.addEventListener("keydown", k);
    const mq = window.matchMedia("(min-width: 768px)");
    const r = () => mq.matches && setOpen(false);
    mq.addEventListener("change", r);
    document.getElementById("mnav-first")?.focus();
    return () => {
      window.removeEventListener("keydown", k);
      mq.removeEventListener("change", r);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,padding,border-color] duration-500 border-b ${scrolled ? "bg-background/85 backdrop-blur-md py-4 border-border" : "py-6 border-transparent"}`}
      >
        <div className="shell flex items-center justify-between">
          <a
            href="#inicio"
            className="font-display text-sm font-semibold tracking-[0.18em] transition-opacity duration-300 hover:opacity-70"
            aria-label="Lucas Lima Design — início"
          >
            LUCAS LIMA<span className="text-primary">●</span>DESIGN
          </a>
          <nav aria-label="Principal" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {LINKS.map(([id, label], i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    data-active={active === id}
                    className={`link-line font-display text-sm transition-colors duration-300 ${active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <span className="mr-1.5 text-[10px] text-primary">0{i + 1}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            ref={btn}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mnav"
            className="md:hidden relative z-50 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            <span
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-foreground transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </header>
      <div
        id="mnav"
        aria-hidden={!open}
        inert={!open ? "" : undefined}
        className={`md:hidden fixed inset-0 z-[45] pt-24 bg-background transition-[opacity,transform] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
      >
        <nav aria-label="Menu móvel" className="shell flex h-full flex-col justify-center gap-6">
          {LINKS.map(([id, label], i) => (
            <a
              key={id}
              id={i === 0 ? "mnav-first" : undefined}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className="display-lg flex items-baseline gap-4 transition-[color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary hover:translate-x-2"
              style={{ transitionDelay: open ? `${i * 60 + 100}ms` : "0ms" }}
            >
              <span className="eyebrow">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
