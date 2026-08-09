import { useMemo, useState } from "react";
import { ProjectCard } from "./TheBoard";
import { disciplines, matchesSearch, useProjects } from "@/lib/cms";

function hasDiscipline(services: string[], category: string, discipline: string) {
  const d = discipline.toLowerCase();
  const bag = [...services, category].join(" ").toLowerCase();
  if (d === "b2b") return bag.includes("b2b") || bag.includes("saas") || bag.includes("fintech");
  return bag.includes(d) || bag.includes(d.replace(" design", ""));
}

/**
 * The archive: searchable, discipline-filtered index of every case study.
 * Lives only on /work — the home page keeps its curated four.
 */
export function WorkArchive() {
  const projects = useProjects();
  const [term, setTerm] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const results = useMemo(
    () =>
      projects.filter(
        (p) =>
          matchesSearch(p, term) && (!active || hasDiscipline(p.services, p.category, active)),
      ),
    [projects, term, active],
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
        <div className="sticky top-20 z-30 -mx-5 mb-8 border-y border-border bg-background/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 sm:top-24 sm:mb-12 sm:rounded-2xl sm:border sm:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full lg:max-w-xs">
              <span className="sr-only">Search projects</span>
              <input
                type="search"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search by name, industry, stack"
                className="w-full rounded-full border border-border bg-card px-4 py-3 pl-10 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground"
              >
                /
              </span>
            </label>

            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
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
          </div>
          <p className="mt-3 font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
            {results.length} {results.length === 1 ? "case study" : "case studies"}
            {active ? ` · ${active}` : ""}
            {term ? ` · "${term}"` : ""}
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
              Try a different keyword, or clear the filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setTerm("");
                setActive(null);
              }}
              className="mt-6 rounded-full border border-border px-6 py-3 font-mono text-[10px] tracking-[0.16em] uppercase hover:border-primary hover:text-primary"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
