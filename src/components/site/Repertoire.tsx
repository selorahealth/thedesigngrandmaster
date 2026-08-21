import { useState } from "react";
import { useReveal } from "./useReveal";

export const services = [
  {
    name: "Web design",
    detail: "Layouts, art direction and motion, designed for the content you actually have.",
  },
  {
    name: "Branding",
    detail: "Wordmarks, type systems, colour and the rules that keep them consistent everywhere.",
  },
  {
    name: "B2B",
    detail: "Sales sites, dashboards and internal tools for teams selling to other teams.",
  },
  {
    name: "Product design",
    detail: "Dashboards, booking flows and app screens mapped end to end before a pixel moves.",
  },
  {
    name: "Consulting",
    detail: "Audits, roadmaps and second opinions when you already have a team and need direction.",
  },
  {
    name: "Graphic design",
    detail: "Campaign artwork, social systems, decks and print, drawn from the same identity.",
  },
];

export function Repertoire() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<string | null>(services[0]?.name ?? null);

  return (
    <section id="repertoire" ref={ref} className="on-bone section-y">
      <div className="shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <p className="eyebrow reveal">Repertoire</p>
          <h2 className="display reveal mt-4 text-[clamp(2rem,8vw,4rem)] sm:text-[clamp(2.25rem,5vw,4rem)]">
            Repertoire.
          </h2>
          <p className="reveal mt-4 max-w-sm text-sm text-muted-foreground sm:text-base">
            From start to finish. Strategy, design and engineering happen in the same head, so
            nothing gets lost in a handover.
          </p>
        </div>

        <div className="reveal">
          {services.map((s) => {
            const active = open === s.name;
            return (
              <button
                key={s.name}
                type="button"
                data-cursor="OPEN"
                onClick={() => setOpen(active ? null : s.name)}
                className="block w-full border-t border-border py-5 text-left last:border-b sm:py-7"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span
                    className={`font-display text-[clamp(1.35rem,5vw,2.25rem)] transition-colors ${
                      active ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    {active ? "\u2014" : "+"}
                  </span>
                </div>
                <div
                  className={`grid overflow-hidden transition-all duration-500 ${
                    active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                    {s.detail}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
