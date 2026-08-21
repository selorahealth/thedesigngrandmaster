import { useMemo, useState } from "react";
import { ProjectCard } from "./TheBoard";
import { disciplines, useProjects } from "@/lib/cms";

function hasDiscipline(services: string[], category: string, discipline: string) {
  const d = discipline.toLowerCase();
  const bag = [...services, category].join(" ").toLowerCase();
  if (d === "b2b") return bag.includes("b2b") || bag.includes("saas") || bag.includes("fintech");
  return bag.includes(d) || bag.includes(d.replace(" design", ""));
}

/**
 * The archive: discipline-filtered index of every case study.
 * Lives only on /work — the home page keeps its curated four.
 */
export function WorkArchive() {
  const projects = useProjects();
  const [active, setActive] = useState<string | null>(null);

  const results = useMemo(
    () =>
      projects.filter(
        (p) => !active || hasDiscipline(p.services, p.category, active),
      ),
    [projects, active],
  );

  const counts = useMemo(
    () =>
      Object.fromEntries(
        disciplines.map((d) => [
          d,
          projects.filter((p) => hasDiscipline(p.services, p.category, d)).length,
        ]),
      ) as Record<string, number>,
    [projects],
  );

  return (
    <section className="pb-20 sm:pb-28">
      <div className="shell">
        {/* Simple filter bar — no sticky, no search */}
        <div className="mb-8 border-y border-border bg-background px-5 py-4 sm:mb-12 sm:rounded-2xl sm:border sm:px-8 sm:py-5">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible lg:pb-0">
            <button
              type="button"
              onClick={() => setActive(null)}
              className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
                active === null
                  ? "border-primary bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              All ({projects.length})
            </button>

            {disciplines.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setActive(active === d ? null : d)}
                className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors ${
                  active === d
                    ? "border-primary bg-primary/12 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {d} ({counts[d] ?? 0})
              </button>
            ))}
          </div>

          <p className="mt-3 font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
            {results.length} {results.length === 1 ? "case study" : "case studies"}
            {active ? ` · ${active}` : ""}
          </p>
        </div>

        {results.length ? (
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {results.map((p) => (
              <div key={p.slug} className="is-visible">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-2xl">Nothing on that square.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try a different filter.
            </p>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="mt-6 rounded-full border border-border px-6 py-3 font-mono text-[10px] tracking-[0.16em] uppercase hover:border-primary hover:text-primary"
            >
              Show all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
