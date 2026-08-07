import { useReveal } from "./useReveal";

const stages = [
  { tag: "01", name: "The opening", detail: "Discovery. Goals, audience, constraints and what the site has to do." },
  { tag: "02", name: "Development", detail: "Design. Art direction, layout and type, reviewed in the browser, not in slides." },
  { tag: "03", name: "The middlegame", detail: "Build. Front end engineering, real content, real data, real states." },
  { tag: "04", name: "The endgame", detail: "Launch. Performance, SEO, handover and a month of watching it run." },
];

export function GamePlan() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="process" ref={ref} className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="eyebrow reveal">The game plan</p>
        <h2 className="display reveal mt-5 text-[clamp(2.25rem,5vw,4rem)]">The game plan.</h2>

        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((s) => (
            <div key={s.tag} className="reveal group">
              <div className="h-px w-full bg-border">
                <div className="h-px w-0 bg-primary transition-all duration-700 group-hover:w-full" />
              </div>
              <p className="mt-5 font-mono text-[10px] tracking-[0.2em] text-primary">{s.tag}</p>
              <h3 className="font-display mt-3 text-2xl">{s.name}</h3>
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
    <section ref={ref} className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 sm:grid-cols-3 lg:px-10">
        {stats.map((s) => (
          <div key={s.label} className="reveal">
            <p className="display text-[clamp(3rem,8vw,6rem)] text-foreground">{s.value}</p>
            <p className="eyebrow mt-3">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
