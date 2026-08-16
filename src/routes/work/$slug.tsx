import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { DeviceFrame } from "@/components/site/DeviceFrame";
import { Lightbox } from "@/components/site/Lightbox";
import { getProjectRow } from "@/lib/cms.functions";
import { toProject, useProjects, type CmsProject } from "@/lib/cms";
import { preloadImages, srcSetFor, thumbUrl } from "@/lib/images";
import { getProject } from "@/data/projects";
import { site } from "@/lib/site";


export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }): Promise<{ project: CmsProject }> => {
    const row = (await getProjectRow({ data: { slug: params.slug } })) as Record<
      string,
      unknown
    > | null;
    if (row) return { project: toProject(row) };
    const fallback = getProject(params.slug);
    if (!fallback) throw notFound();
    return { project: fallback as CmsProject };
  },
  head: ({ loaderData, params }) => {
    const p = loaderData?.project;
    const title = p ? `${p.name} — case study by thedesigngrandmaster` : "Case study";
    const description = p?.summary ?? "Case study by thedesigngrandmaster.";
    const url = `https://screen-magic-mirror-73.lovable.app/work/${params.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: site.ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: site.ogImage },
      ],
      links: [
        { rel: "canonical", href: url },
        ...(p?.screen
          ? [
              {
                rel: "preload",
                as: "image",
                href: p.screen,
                fetchpriority: "high",
              },
            ]
          : []),
      ],

      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p?.name,
            headline: title,
            description,
            url,
            creator: { "@type": "Organization", name: "thedesigngrandmaster" },
            dateCreated: p?.year,
          }),
        },
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project } = Route.useLoaderData() as { project: CmsProject };
  const projects = useProjects();
  const live: CmsProject = projects.find((p) => p.slug === project.slug) ?? project;
  const related = projects.filter((p) => p.slug !== live.slug).slice(0, 3);
  const [zoom, setZoom] = useState<string | null>(null);

  // Warm the secondary screen and the "more by" covers once the hero is in.
  useEffect(() => {
    preloadImages([live.secondScreen, ...related.map((p) => thumbUrl(p.screen, 600))]);
  }, [live.secondScreen, related]);


  const tags = [...live.services, ...live.tech.slice(0, 3)];

  return (
    <PageShell>
      {/* Behance-style project header: title, author, actions */}
      <section className="bg-ink pt-24 pb-8 sm:pt-32 sm:pb-10">
        <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
          <Link
            to="/work"
            data-cursor="BACK"
            className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground"
          >
            ← All work
          </Link>
          <h1 className="display mt-5 text-[clamp(2.25rem,11vw,4.75rem)] sm:text-[clamp(2.75rem,6vw,4.75rem)]">
            {live.name}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {live.summary}
          </p>

          <div className="mt-7 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo/tdg-logomark-ivory.svg" alt="" aria-hidden="true" className="h-9 w-auto" />
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-muted-foreground">thedesign</span>
                  <span className="font-extrabold">grandmaster</span>
                </p>
                <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                  {live.category} · {live.year}
                </p>
              </div>
            </div>
            {live.url ? (
              <a
                href={live.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN"
                className="shrink-0 rounded-full bg-primary px-6 py-3 text-center font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
              >
                View live project
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Stacked image column — the Behance canvas */}
      <section className="bg-ink pb-12 sm:pb-16">
        <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
          <button
            type="button"
            data-cursor="ZOOM"
            onClick={() => setZoom(live.screen)}
            className="block w-full cursor-zoom-in"
            aria-label={`Enlarge ${live.name} main screen`}
          >
            <DeviceFrame
              src={live.screen}
              alt={`${live.name} interface`}
              device={live.device}
              priority
            />
          </button>
          {live.secondScreen ? (
            <button
              type="button"
              data-cursor="ZOOM"
              onClick={() => setZoom(live.secondScreen ?? null)}
              className="mt-6 block w-full cursor-zoom-in sm:mt-10"
              aria-label={`Enlarge ${live.name} secondary screen`}
            >
              <DeviceFrame
                src={live.secondScreen}
                alt={`${live.name} secondary screen`}
                device={live.secondDevice ?? "mobile"}
              />
            </button>
          ) : null}
        </div>
      </section>

      {/* Story */}
      <section className="on-bone py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[900px] px-5 sm:px-8">
          <p className="eyebrow">The brief</p>
          <div className="mt-5 space-y-5">
            {live.brief.map((b) => (
              <p key={b} className="text-lg leading-relaxed sm:text-xl">
                {b}
              </p>
            ))}
          </div>

          {live.sections.map((s) => (
            <article key={s.label} className="mt-14 border-t border-border pt-10">
              <p className="eyebrow">{s.label}</p>
              <h2 className="display mt-3 text-[clamp(1.6rem,6vw,2.5rem)]">{s.title}</h2>
              <div className="mt-4 space-y-4">
                {s.body.map((b) => (
                  <p key={b} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {b}
                  </p>
                ))}
              </div>
            </article>
          ))}

          {live.outcomes.length ? (
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-border pt-10 sm:grid-cols-4">
              {live.outcomes.map((o) => (
                <div key={o.label}>
                  <p className="display text-[clamp(1.75rem,7vw,2.75rem)] text-primary">{o.value}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
                    {o.label}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-14 border-t border-border pt-8">
            <p className="eyebrow">Project details</p>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              {[
                ["Client", live.name],
                ["Industry", live.industry],
                ["Services", live.services.join(", ")],
                ["Stack", live.tech.join(", ")],
                ["Year", live.year],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More by the studio */}
      <section className="border-t border-border py-16 sm:py-20">
        <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
          <p className="eyebrow">More by thedesigngrandmaster</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/work/$slug"
                params={{ slug: p.slug }}
                data-cursor="VIEW"
                className="group block overflow-hidden rounded-xl border border-border bg-card/40 transition-colors hover:border-primary/40"
              >
                <div className="overflow-hidden bg-ink p-4">
                  <img
                    src={thumbUrl(p.screen, 600)}
                    srcSet={srcSetFor(p.screen, [400, 600, 900])}
                    sizes="(max-width: 640px) 100vw, 340px"
                    alt={`${p.name} cover`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-md object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  />

                </div>
                <div className="p-4">
                  <p className="font-display text-lg">{p.name}</p>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
                    {p.category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Lightbox src={zoom} alt={`${live.name} screen`} onClose={() => setZoom(null)} />
    </PageShell>
  );
}
