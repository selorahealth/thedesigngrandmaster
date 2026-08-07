import { useState } from "react";
import { useReveal } from "./useReveal";

const services = [
  { name: "Brand identity", detail: "Wordmarks, type systems and full visual kits for new and rebuilt brands." },
  { name: "Web design", detail: "Layouts, art direction and motion, designed for the content you actually have." },
  { name: "Web engineering", detail: "React and TypeScript front ends, wired to real data and shipped to production." },
  { name: "Product design", detail: "Dashboards, booking flows and app screens mapped end to end before a pixel moves." },
  { name: "Growth", detail: "Landing pages, technical SEO and copy that reads like a human wrote it." },
];

export function Repertoire() {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<string | null>(services[0]?.name ?? null);

  return (
    <section id="repertoire" ref={ref} className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
        <div>
          <p className="eyebrow reveal">Repertoire</p>
          <h2 className="display reveal mt-5 text-[clamp(2.25rem,5vw,4rem)]">Repertoire.</h2>
          <p className="reveal mt-5 max-w-sm text-muted-foreground">
            One studio, start to finish. Strategy, design and engineering happen in the same head, so
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
                onMouseEnter={() => setOpen(s.name)}
                onClick={() => setOpen(active ? null : s.name)}
                className="block w-full border-t border-border py-7 text-left last:border-b"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <span
                    className={`font-display text-[clamp(1.5rem,3vw,2.25rem)] transition-colors ${
                      active ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    {active ? "&#8212;" : "+"}
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
