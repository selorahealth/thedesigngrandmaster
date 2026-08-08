import { useReveal } from "./useReveal";

export const stages = [
  { tag: "01", name: "The opening", detail: "Discovery. Goals, audience, constraints and what the site has to do." },
  { tag: "02", name: "Development", detail: "Design. Art direction, layout and type, reviewed in the browser, not in slides." },
  { tag: "03", name: "The middlegame", detail: "Build. Front end engineering, real content, real data, real states." },
  { tag: "04", name: "The endgame", detail: "Launch. Performance, SEO, handover and a month of watching it run." },
];

export function GamePlan() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="process" ref={ref} className="section-y border-t border-border">
      <div className="shell">
        <p className="eyebrow reveal">The game plan</p>
        <h2 className="display reveal mt-4 text-[clamp(2rem,8vw,4rem)] sm:text-[clamp(2.25rem,5vw,4rem)]">
          The game plan.
        </h2>

        <div className="mt-10 grid gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {stages.map((s) => (
            <div key={s.tag} className="reveal group">
              <div className="h-px w-full bg-border">
                <div className="h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
              </div>
              <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-primary">{s.tag}</p>
              <h3 className="mt-3 font-display text-xl sm:text-2xl">{s.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const stats = [
  { value: "14+", label: "Projects shipped" },
  { value: "6", label: "Months building" },
  { value: "100%", label: "Built from scratch" },
];

export function Stats() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="section-y border-t border-border">
      <div className="shell grid gap-8 sm:grid-cols-3 sm:gap-14">
        {stats.map((s) => (
          <div key={s.label} className="reveal">
            <p className="display text-[clamp(2.75rem,14vw,6rem)] text-foreground sm:text-[clamp(3rem,8vw,6rem)]">
              {s.value}
            </p>
            <p className="eyebrow mt-3">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
