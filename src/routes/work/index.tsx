import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/site/PageShell";
import { WorkArchive } from "@/components/site/WorkArchive";
import {
  projectsQuery,
  useCopy,
  contentQuery,
} from "@/lib/cms";
import { site } from "@/lib/site";

export const Route = createFileRoute("/work/")({
  // Search parameters used by WorkArchive.
  //
  // We keep this deliberately simple and validate the values
  // inside WorkArchive against the available disciplines.
  validateSearch: (
    search: Record<string, unknown>,
  ) => ({
    q:
      typeof search.q === "string"
        ? search.q
        : undefined,

    discipline:
      typeof search.discipline === "string"
        ? search.discipline
        : undefined,
  }),

  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(projectsQuery),
      context.queryClient.ensureQueryData(contentQuery),
    ]);

    return null;
  },

  head: () => ({
    meta: [
      {
        title:
          "Work — case studies by thedesigngrandmaster",
      },
      {
        name: "description",
        content:
          "Search and filter the full archive: UX research, product design, brand identity and graphic design case studies across fintech, health, retail and media.",
      },
      {
        property: "og:title",
        content:
          "Work — case studies by thedesigngrandmaster",
      },
      {
        property: "og:description",
        content:
          "The full archive of live builds, filterable by discipline.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content:
          "https://screen-magic-mirror-73.lovable.app/work",
      },
      {
        property: "og:image",
        content: site.ogImage,
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:image",
        content: site.ogImage,
      },
    ],

    links: [
      {
        rel: "canonical",
        href:
          "https://screen-magic-mirror-73.lovable.app/work",
      },
    ],
  }),

  component: WorkIndex,
});

function WorkIndex() {
  const copy = useCopy("work.header");

  return (
    <PageShell>
      <section className="bg-ink pt-28 pb-10 sm:pt-36 sm:pb-14 lg:pt-44">
        <div className="shell">
          <p className="eyebrow">
            {copy.eyebrow}
          </p>

          <h1 className="display mt-4 text-[clamp(2.25rem,10vw,5rem)] sm:text-[clamp(2.75rem,6vw,5rem)]">
            {copy.title}
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {copy.intro}
          </p>
        </div>
      </section>

      <WorkArchive />

      <section className="on-bone border-t border-border py-16 sm:py-20">
        <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">
              Next move
            </p>

            <h2 className="display mt-3 text-[clamp(1.75rem,7vw,3rem)]">
              Your project belongs on this board.
            </h2>
          </div>

          <Link
            to="/contact"
            data-cursor="→"
            className="shrink-0 rounded-full bg-primary px-8 py-4 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-primary-foreground transition-opacity hover:opacity-85"
          >
            Start a project
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
