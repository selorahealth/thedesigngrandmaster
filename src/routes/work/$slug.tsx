import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DeviceFrame } from "@/components/site/DeviceFrame";
import { Checkmate } from "@/components/site/Checkmate";
import { getProject, projects, type Project } from "@/data/projects";
import { site } from "@/lib/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }): { project: Project } => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — thedesigngrandmaster` : "Case study";
    const description = p?.summary ?? "Case study";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:image", content: site.ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: site.ogImage },
      ],
    };
  },
  component: CaseStudy,
});

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border py-3 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-6">
      <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
        {label}
      </span>
      <span className="text-right text-sm sm:text-left">{value}</span>
    </div>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <PageShell>
      <section className="bg-ink pt-28 pb-10 sm:pt-36 lg:pt-44">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <h1 className="display text-[clamp(2.5rem,12vw,5.5rem)] sm:text-[clamp(3rem,7vw,5.5rem)]">
              {project.name}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.summary}
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN"
              className="mt-7 inline-block rounded-full border border-border px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
            >
              Visit website
            </a>
          </div>
          <div>
            <Meta label="Client" value={project.name} />
            <Meta label="Industry" value={project.industry} />
            <Meta label="Services" value={project.services.join(", ")} />
            <Meta label="Tech stack" value={project.tech.join(", ")} />
            <Meta label="Year" value={project.year} />
          </div>
        </div>
      </section>

      <section className="bg-ink pb-14 sm:pb-20">
        <div className="shell">
          <DeviceFrame
            src={project.screen}
            alt={`${project.name} interface`}
            device={project.device}
            priority
          />
          {project.secondScreen ? (
            <div className="mt-6 sm:mt-10">
              <DeviceFrame
                src={project.secondScreen}
                alt={`${project.name} secondary screen`}
                device={project.secondDevice ?? "mobile"}
              />
            </div>
          ) : null}
        </div>
      </section>

      <section className="on-bone section-y">
        <div className="shell">
          <div className="grid gap-6 border-b border-border pb-10 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-14">
            <p className="eyebrow">The brief</p>
            <div className="max-w-2xl space-y-4">
              {project.brief.map((b) => (
                <p key={b} className="text-base leading-relaxed sm:text-lg">
                  {b}
                </p>
              ))}
            </div>
          </div>

          {project.sections.map((s) => (
            <div
              key={s.label}
              className="grid gap-4 border-b border-border py-10 sm:grid-cols-[110px_minmax(0,1fr)] sm:gap-14"
            >
              <p className="eyebrow">{s.label}</p>
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl uppercase tracking-tight sm:text-3xl">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((b) => (
                    <p key={b} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {b}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="grid gap-8 pt-12 sm:grid-cols-2 sm:gap-14">
            {project.outcomes.map((o) => (
              <div key={o.label}>
                <p className="display text-[clamp(2.25rem,10vw,4rem)]">{o.value}</p>
                <p className="eyebrow mt-2">{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y border-t border-border">
        <div className="shell">
          <p className="eyebrow">Next project</p>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            data-cursor="VIEW"
            className="mt-4 block"
          >
            <h2 className="display text-[clamp(2rem,9vw,4rem)] transition-colors hover:text-primary">
              {next.name}
            </h2>
          </Link>
          <Link
            to="/work"
            className="mt-8 inline-block rounded-full border border-border px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:border-primary hover:text-primary"
          >
            View full portfolio
          </Link>
        </div>
      </section>

      <Checkmate heading="Start your project." />
    </PageShell>
  );
}
