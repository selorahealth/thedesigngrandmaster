import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/site/PageShell";
import { Checkmate } from "@/components/site/Checkmate";
import { OpeningQuestions } from "@/components/site/OpeningQuestions";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — thedesigngrandmaster" },
      {
        name: "description",
        content: `Start a project with thedesigngrandmaster. Send the brief to ${site.email} or use the form and get a real answer within a day.`,
      },
      { property: "og:title", content: "Contact — thedesigngrandmaster" },
      {
        property: "og:description",
        content: "Send the brief, the budget range and the deadline. You will get a real answer.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: site.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: site.ogImage },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Checkmate"
        title="Make your move."
        intro={`Email ${site.email} or ${site.handle} on X and Instagram. The form below lands in the same inbox.`}
      />
      <Checkmate heading="Tell me what you're building." />
      <OpeningQuestions />
    </PageShell>
  );
}
