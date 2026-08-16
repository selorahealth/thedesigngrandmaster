import { Link } from "@tanstack/react-router";
import { useReveal } from "./useReveal";
import { DeviceFrame } from "./DeviceFrame";
import { useProjects, type CmsProject } from "@/lib/cms";
import { preloadImages } from "@/lib/images";

export function ProjectCard({ project }: { project: CmsProject }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: project.slug }}
      data-cursor="VIEW"
      onMouseEnter={() => preloadImages([project.screen, project.secondScreen])}
      onFocus={() => preloadImages([project.screen, project.secondScreen])}
      className="reveal group block overflow-hidden rounded-2xl border border-border bg-card/40 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="flex items-center justify-center overflow-hidden bg-ink px-4 pt-6 sm:px-8 sm:pt-10">
        <div className="w-full transition-transform duration-700 group-hover:scale-[1.03]">
          <DeviceFrame src={project.screen} alt={`${project.name} interface`} device={project.device} />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div className="min-w-0">
          <h3 className="truncate font-display text-xl sm:text-2xl">{project.name}</h3>
          <p className="mt-1 truncate text-sm text-muted-foreground">{project.summary}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3 font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
          <span>{project.category}</span>
          <span className="h-px w-5 bg-border" />
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}

/** Home-page board: a short, curated selection with a route to the archive. */
export function TheBoard() {
  const ref = useReveal<HTMLDivElement>();
  const projects = useProjects();
  const list = projects.slice(0, 4);

  return (
    <section id="work" ref={ref} className="section-y">
      <div className="shell">
        <p className="eyebrow reveal">The board</p>
        <h2 className="display reveal mt-4 text-[clamp(2rem,8vw,4rem)] sm:text-[clamp(2.25rem,5vw,4rem)]">
          The board.
        </h2>
        <p className="reveal mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          A short selection. {projects.length} live builds sit behind it, across fintech, health,
          retail and media.
        </p>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-2">
          {list.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        <div className="reveal mt-10 flex justify-center sm:mt-14">
          <Link
            to="/work"
            data-cursor="&#8594;"
            className="rounded-full border border-border px-8 py-4 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            View full portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
