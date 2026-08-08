import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Repertoire } from "@/components/site/Repertoire";
import { Engagements } from "@/components/site/PostGame";
import { Checkmate } from "@/components/site/Checkmate";
import { site } from "@/lib/site";

export const Route = createFileRoute("/repertoire")({
  head: () => ({
    meta: [
      { title: "Repertoire — thedesigngrandmaster" },
      {
        name: "description",
        content:
          "Web design, branding, B2B, product design, consulting and graphic design, delivered by one studio from strategy to launch.",
      },
      { property: "og:title", content: "Repertoire — thedesigngrandmaster" },
      {
        property: "og:description",
        content: "Six services, one studio, no handovers between strategy, design and engineering.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: site.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: site.ogImage },
    ],
  }),
  component: RepertoirePage,
});

function RepertoirePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Repertoire"
        title="What I play."
        intro="Six openings, one studio. Pick the whole game or a single move."
      />
      <Repertoire />
      <Engagements />
      <Checkmate heading="Pick your opening." />
    </PageShell>
  );
}
