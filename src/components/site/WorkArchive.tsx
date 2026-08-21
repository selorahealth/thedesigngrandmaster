import {
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProjectCard } from "./TheBoard";
import { disciplines, matchesSearch, useProjects } from "@/lib/cms";

function hasDiscipline(
  services: string[],
  category: string,
  discipline: string,
) {
  const d = discipline.toLowerCase();
  const bag = [...services, category].join(" ").toLowerCase();

  if (d === "b2b") {
    return (
      bag.includes("b2b") ||
      bag.includes("saas") ||
      bag.includes("fintech")
    );
  }

  return (
    bag.includes(d) ||
    bag.includes(d.replace(" design", ""))
  );
}

/**
 * The archive: searchable, discipline-filtered index of every case study.
 * Lives only on /work — the home page keeps its curated four.
 */
export function WorkArchive() {
  const projects = useProjects();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Initialise state from the URL so refresh/share works.
  const initialTerm = searchParams.get("q") ?? "";
  const initialDiscipline = searchParams.get("discipline");

  const [term, setTerm] = useState(initialTerm);

  const [active, setActive] = useState<string | null>(
    initialDiscipline && disciplines.includes(initialDiscipline)
      ? initialDiscipline
      : null,
  );

  // Keep local state in sync when URL changes
  // (back/forward navigation).
  useEffect(() => {
    setTerm(searchParams.get("q") ?? "");

    const d = searchParams.get("discipline");

    setActive(
      d && disciplines.includes(d)
        ? d
        : null,
    );
  }, [searchParams]);

  // Filter projects based on search term + discipline.
  const results = useMemo(() => {
    return projects.filter((project) => {
      const matchesTerm = matchesSearch(project, term);

      const matchesDiscipline =
        !active ||
        hasDiscipline(
          project.services,
          project.category,
          active,
        );

      return matchesTerm && matchesDiscipline;
    });
  }, [projects, term, active]);

  // Calculate the number of projects in each discipline.
  const counts = useMemo(() => {
    return Object.fromEntries(
      disciplines.map((discipline) => [
        discipline,
        projects.filter((project) =>
          hasDiscipline(
            project.services,
            project.category,
            discipline,
          ),
        ).length,
      ]),
    ) as Record<string, number>;
  }, [projects]);

  // Build a clean query string and navigate.
  const goToResults = (
    nextTerm: string,
    nextActive: string | null,
  ) => {
    const params = new URLSearchParams();

    if (nextTerm.trim()) {
      params.set("q", nextTerm.trim());
    }

    if (nextActive) {
      params.set("discipline", nextActive);
    }

    const queryString = params.toString();

    navigate(
      queryString
        ? `/work?${queryString}`
        : "/work",
    );
  };

  const handleSearchKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      goToResults(term, active);
    }
  };

  const handleDisciplineClick = (
    discipline: string | null,
  ) => {
    const next =
      active === discipline
        ? null
        : discipline;

    setActive(next);

    goToResults(term, next);
  };

  const handleReset = () => {
    setTerm("");
    setActive(null);
    navigate("/work");
  };

  return (
    <section className="pb-20 sm:pb-28">
      <div className="shell">
        {/* Search + filters */}
        <div className="mb-8 border-y border-border bg-background/95 px-5 py-4 sm:mb-12 sm:rounded-2xl sm:border sm:px-8 sm:py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <label className="relative block w-full lg:max-w-xs">
              <span className="sr-only">
                Search projects
              </span>

              <input
                type="search"
                value={term}
                onChange={(event) =>
                  setTerm(event.target.value)
                }
                onKeyDown={handleSearchKeyDown}
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

            {/* Discipline filters */}
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:justify-end lg:overflow-visible lg:pb-0">
              <button
                type="button"
                onClick={() =>
                  handleDisciplineClick(null)
                }
                className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                  active === null
                    ? "border-primary bg-primary/12 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                All ({projects.length})
              </button>

              {disciplines.map((discipline) => (
                <button
                  key={discipline}
                  type="button"
                  onClick={() =>
                    handleDisciplineClick(
                      discipline,
                    )
                  }
                  className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                    active === discipline
                      ? "border-primary bg-primary/12 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {discipline} (
                  {counts[discipline] ?? 0})
                </button>
              ))}
            </div>
          </div>

          {/* Result count */}
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {results.length}{" "}
            {results.length === 1
              ? "case study"
              : "case studies"}

            {active
              ? ` · ${active}`
              : ""}

            {term
              ? ` · "${term}"`
              : ""}
          </p>
        </div>

        {/* =====================================================
            PROJECT RESULTS

            IMPORTANT:
            There is intentionally NO `is-visible` class here.

            That class was the most likely reason the cards were
            taking up space but remaining invisible.
           ===================================================== */}
        {results.length > 0 ? (
          <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
            {results.map((project) => (
              <div
                key={project.slug}
                className="block"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-2xl">
              Nothing on that square.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Try a different keyword, or clear
              the filters.
            </p>

            <button
              type="button"
              onClick={handleReset}
              className="mt-6 rounded-full border border-border px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] hover:border-primary hover:text-primary"
            >
              Reset
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
