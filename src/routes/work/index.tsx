import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { TheBoard } from "@/components/site/TheBoard";
import { Checkmate } from "@/components/site/Checkmate";
import { site } from "@/lib/site";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — thedesigngrandmaster" },
      {
        name: "description",
        content:
          "Fourteen live builds across fintech, health, retail and media. Websites, dashboards and brand identities designed and engineered end to end.",
      },
      { property: "og:title", content: "Work — thedesigngrandmaster" },
      {
        property: "og:description",
        content: "The full portfolio: fourteen live builds you can open right now.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: site.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: site.ogImage },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="The board"
        title="Full portfolio."
        intro="Fourteen live builds across fintech, health, retail and media. Open a case study to see the brief, the approach and the result."
      />
      <TheBoard full />
      <Checkmate heading="Want one of these for your team?" />
    </PageShell>
  );
}
