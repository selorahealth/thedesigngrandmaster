import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
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
          queenRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.14}px, 0)`;
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
    <section id="top" className="relative overflow-hidden bg-ink pt-28 pb-16 sm:pt-32 lg:pt-44 lg:pb-28">
      <div className="shell grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <div
          className={`order-2 transition-all duration-700 lg:order-1 ${mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        >
          <p className="eyebrow">Opening move</p>
          <h1 className="display mt-5 text-[clamp(2.5rem,10vw,5.5rem)] sm:text-[clamp(3rem,7vw,5.5rem)]">
            Design and code,
            <br />
            played like it
            <br />
            matters.
          </h1>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
            thedesigngrandmaster is an independent studio building websites, apps and graphic
            identities. Every project is drawn, written and shipped from scratch.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-10">
            <Link
              to="/work"
              data-cursor="&#8594;"
              className="rounded-full bg-primary px-7 py-3.5 text-center font-mono text-[11px] tracking-[0.16em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
            >
              View the work
            </Link>
            <Link
              to="/contact"
              data-cursor="&#8594;"
              className="rounded-full border border-border px-7 py-3.5 text-center font-mono text-[11px] tracking-[0.16em] uppercase text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Start a project
            </Link>
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px]" />
          <div ref={queenRef} className="relative will-change-transform">
            <img
              src={queen}
              alt="Glass chess queen rendered with cobalt refraction"
              width={1024}
              height={1024}
              className="mx-auto w-full max-w-[340px] select-none mix-blend-screen sm:max-w-[420px] lg:max-w-[520px]"
              style={{
                maskImage:
                  "radial-gradient(closest-side at 50% 46%, oklch(1 0 0) 58%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(closest-side at 50% 46%, oklch(1 0 0) 58%, transparent 100%)",
              }}
            />
          </div>
          <div className="relative -mt-4 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-card/50 px-3.5 py-2 font-mono text-[9.5px] tracking-[0.14em] uppercase text-muted-foreground backdrop-blur sm:text-[10px]"
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
