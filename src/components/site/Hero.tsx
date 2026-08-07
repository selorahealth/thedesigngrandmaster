import { useEffect, useRef, useState } from "react";
import queen from "@/assets/queen.png";

const chips = ["14 projects shipped", "6 months", "0 templates"];

export function Hero() {
  const queenRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (queenRef.current) {
          queenRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-32">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-10">
        <div
          className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="eyebrow">Opening move</p>
          <h1 className="display mt-6 text-[clamp(2.75rem,7vw,5.5rem)]">
            Design and code,
            <br />
            played like it
            <br />
            matters.
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-muted-foreground">
            thedesigngrandmaster is an independent studio building websites, apps and graphic
            identities. Every project is drawn, written and shipped from scratch.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              data-cursor="&#8594;"
              className="bg-primary px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
            >
              View the work
            </a>
            <a
              href="#contact"
              data-cursor="&#8594;"
              className="border border-border px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Start a project
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[120px]" />
          <div ref={queenRef} className="relative will-change-transform">
            <img
              src={queen}
              alt="Glass chess queen rendered with violet and blue refraction"
              width={1024}
              height={1024}
              className="mx-auto w-full max-w-[520px] select-none"
            />
          </div>
          <div className="relative -mt-6 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="border border-border bg-card/60 px-3.5 py-2 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground backdrop-blur"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
