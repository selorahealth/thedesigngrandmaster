import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { GamePlan, Stats } from "@/components/site/GamePlan";
import { OpeningQuestions } from "@/components/site/OpeningQuestions";
import { Checkmate } from "@/components/site/Checkmate";
import { site } from "@/lib/site";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Process — thedesigngrandmaster" },
      {
        name: "description",
        content:
          "The game plan: discovery, design, build and launch. How a project moves from brief to a live product in weeks, not quarters.",
      },
      { property: "og:title", content: "Process — thedesigngrandmaster" },
      {
        property: "og:description",
        content: "Four stages from opening to endgame, reviewed in the browser at every step.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: site.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: site.ogImage },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="The game plan"
        title="How the game is played."
        intro="Four stages, reviewed in the browser rather than in slides, so there are no surprises at launch."
      />
      <GamePlan />
      <Stats />
      <OpeningQuestions />
      <Checkmate heading="Ready for the opening move?" />
    </PageShell>
  );
}
