import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/site/Cursor";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { OpeningBook } from "@/components/site/OpeningBook";
import { TheBoard } from "@/components/site/TheBoard";
import { Repertoire } from "@/components/site/Repertoire";
import { GamePlan, Stats } from "@/components/site/GamePlan";
import { PostGame, Engagements } from "@/components/site/PostGame";
import { OpeningQuestions } from "@/components/site/OpeningQuestions";
import { Checkmate } from "@/components/site/Checkmate";
import { Footer } from "@/components/site/Footer";
import { site } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "thedesigngrandmaster — Design and code studio" },
      {
        name: "description",
        content:
          "Independent studio building websites, apps and brand identities from scratch. 14 live projects across fintech, health, retail and media.",
      },
      { property: "og:title", content: "thedesigngrandmaster — Design and code studio" },
      {
        property: "og:description",
        content:
          "Websites, apps and brand identities, designed and engineered end to end. See the board of 14 live builds.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: site.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: site.ogImage },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Cursor />
      <Nav />
      <Hero />
      <OpeningBook />
      <TheBoard />
      <Repertoire />
      <GamePlan />
      <Stats />
      <PostGame />
      <Engagements />
      <OpeningQuestions />
      <Checkmate />
      <Footer />
    </main>
  );
}
