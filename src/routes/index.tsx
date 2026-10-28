import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Nav } from "@/components/site/Nav";
import { Cursor } from "@/components/site/Cursor";
import { HeroObject } from "@/components/site/HeroObject";
import { Cta } from "@/components/ui/cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucas Lima Design — Identidade visual e design estratégico" },
      { name: "description", content: "Design estratégico e identidade visual para marcas que querem construir uma presença própria." },
      { property: "og:title", content: "Lucas Lima Design — Design in Motion" },
      { property: "og:description", content: "Eu transformo ideias em identidades. Branding e identidade visual autoral." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => { io.disconnect(); document.documentElement.classList.remove("js-reveal"); };
  }, []);
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const SLOTS = [
  { n: "01", span: "md:col-span-7", ratio: "aspect-[4/3]" },
  { n: "02", span: "md:col-span-5 md:mt-40", ratio: "aspect-[4/5]" },
  { n: "03", span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { n: "04", span: "md:col-span-6 md:col-start-7 md:-mt-24", ratio: "aspect-[16/10]" },
];

const SERVICES = [
  ["Identidade visual", "Logotipo, sistema tipográfico, cores e aplicações que formam a linguagem completa da marca."],
  ["Estratégia de marca", "Posicionamento, personalidade e narrativa antes do primeiro traço."],
  ["Brand guidelines", "Manuais claros para que a marca se mantenha consistente em qualquer ponto de contato."],
  ["Direção de arte digital", "Interfaces, redes sociais e peças em movimento alinhadas à identidade."],
];

function Index() {
  useReveal();
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        {/* HERO */}
        <section id="inicio" className="relative isolate flex overflow-x-clip min-h-svh flex-col justify-end pb-12 pt-32 md:pb-16">
          <div className="shell relative grid grid-cols-12 gap-x-6">
            <div className="pointer-events-none absolute -right-[10%] -top-16 -z-10 w-[min(78vw,620px)] opacity-60 md:right-[4%] md:-top-36 md:opacity-90 lg:right-[6%]">
              <HeroObject />
            </div>
            <p className="eyebrow reveal col-span-12 mb-8 flex items-center gap-3" style={d(0)}>
              <span className="h-px w-10 bg-primary" /> Design in Motion — Portfólio 2026
            </p>
            <h1 className="display-xl relative col-span-12">
              <span className="reveal block" style={d(80)}>Eu transformo</span>
              <span className="reveal block pl-[8vw]" style={d(180)}>ideias em</span>
              <span className="reveal block text-primary" style={d(280)}>identidades.</span>
            </h1>
            <div className="col-span-12 mt-12 grid grid-cols-12 items-end gap-6 md:mt-16">
              <p className="reveal col-span-12 max-w-md text-lg leading-relaxed text-muted-foreground md:col-span-5" style={d(400)}>
                Design estratégico e identidade visual para marcas que querem construir uma presença própria.
              </p>
              <div className="reveal col-span-12 flex flex-wrap gap-4 md:col-span-7 md:justify-end" style={d(500)}>
                <Cta href="#contato">Vamos conversar</Cta>
                <Cta href="#projetos" variant="ghost">Explorar trabalhos</Cta>
              </div>
            </div>
            <a href="#sobre" className="eyebrow col-span-12 mt-16 hidden items-center gap-3 hover:text-foreground md:flex">
              <span className="relative h-10 w-px overflow-hidden bg-border"><span className="scroll-tick absolute inset-x-0 top-0 h-1/2 bg-primary" /></span>
              Role para explorar
            </a>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="overflow-hidden border-y border-border py-6" aria-hidden>
          <div className="marquee flex w-max gap-12 font-display text-2xl uppercase tracking-tight text-muted-foreground md:text-4xl">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ["Branding", "Identidade", "Tipografia", "Direção de arte", "Sistemas visuais", "Movimento"].map((w) => (
                <span key={k + w} className="flex items-center gap-12">{w}<span className="text-primary">✳</span></span>
              )),
            )}
          </div>
        </div>

        {/* SOBRE */}
        <section id="sobre" className="py-24 md:py-40">
          <div className="shell grid grid-cols-12 gap-x-6 gap-y-12">
            <div className="col-span-12 md:col-span-3">
              <p className="eyebrow reveal">01 / Sobre</p>
            </div>
            <div className="col-span-12 md:col-span-9">
              <p className="reveal font-display text-3xl leading-[1.15] tracking-tight md:text-5xl">
                Sou Lucas Lima, designer de marcas. Construo identidades que unem <span className="text-primary">estratégia</span>, precisão e uma dose calculada de experimentação.
              </p>
              <div className="mt-16 grid gap-12 sm:grid-cols-3">
                {[["Clareza", "Cada decisão visual tem uma razão."], ["Precisão", "Grid, ritmo e detalhe como método."], ["Movimento", "Marcas pensadas para viver no digital."]].map(([t, s], i) => (
                  <div key={t} className="reveal border-t border-border pt-6" style={d(i * 120)}>
                    <p className="font-display text-lg">{t}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROJETOS */}
        <section id="projetos" className="bg-surface py-24 md:py-40">
          <div className="shell">
            <div className="mb-16 flex flex-wrap items-end justify-between gap-8 md:mb-24">
              <div>
                <p className="eyebrow reveal mb-6">02 / Projetos selecionados</p>
                <h2 className="display-lg reveal">Trabalhos<br /><span className="pl-[6vw] text-muted-foreground">em breve.</span></h2>
              </div>
              <p className="reveal max-w-xs text-sm text-muted-foreground">Os estudos de caso estão sendo preparados. Cada espaço abaixo receberá um projeto real.</p>
            </div>
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
              {SLOTS.map((s, i) => (
                <article key={s.n} className={`reveal group ${s.span}`} style={d(i * 100)}>
                  <div data-cursor="project" className={`relative ${s.ratio} overflow-hidden rounded-sm border border-dashed border-input bg-background`}>
                    <div className="absolute inset-0 grid place-items-center transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                      <span className="display-lg text-foreground/5">{s.n}</span>
                    </div>
                    <span className="eyebrow absolute left-5 top-5">Espaço reservado</span>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-6 border-t border-border pt-5">
                    <div>
                      <p className="font-display text-xl transition-colors group-hover:text-primary">Projeto {s.n}</p>
                      <p className="mt-1 text-sm text-muted-foreground">Segmento · descrição curta</p>
                    </div>
                    <span className="eyebrow transition-transform duration-500 group-hover:-translate-x-1">Categoria</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="py-24 md:py-40">
          <div className="shell grid grid-cols-12 gap-x-6">
            <div className="col-span-12 mb-16 md:col-span-4 md:mb-0">
              <p className="eyebrow reveal mb-6">03 / Serviços</p>
              <h2 className="display-lg reveal md:sticky md:top-32">O que<br />eu faço.</h2>
            </div>
            <ol className="col-span-12 md:col-span-7 md:col-start-6">
              {SERVICES.map(([t, s], i) => (
                <li key={t} className="reveal grid grid-cols-[3rem_1fr] gap-4 border-t border-border py-10 last:border-b" style={d(i * 80)}>
                  <span className="font-display text-sm text-primary">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight md:text-4xl">{t}</h3>
                    <p className="mt-3 max-w-md text-muted-foreground">{s}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="border-t border-border py-24 md:py-40">
          <div className="shell">
            <p className="eyebrow reveal mb-8">04 / Contato</p>
            <h2 className="display-xl reveal">
              Vamos criar<br /><span className="text-primary">algo próprio?</span>
            </h2>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-8">
              <Cta href="mailto:contato@lucaslimadesign.com" className="reveal">Vamos conversar</Cta>
              <a href="mailto:contato@lucaslimadesign.com" className="link-line reveal break-all font-display text-base sm:text-lg md:text-2xl">contato@lucaslimadesign.com</a>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-border py-8">
        <div className="shell eyebrow flex flex-wrap justify-between gap-4">
          <span>© 2026 Lucas Lima Design</span>
          <span>Design in Motion</span>
        </div>
      </footer>
    </>
  );
}
