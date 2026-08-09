export type PageCopy = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  note?: string;
};

export type ContentKey =
  | "home.hero"
  | "work.header"
  | "repertoire.header"
  | "process.header"
  | "contact.header";

export const contentKeys: { key: ContentKey; label: string }[] = [
  { key: "home.hero", label: "Home — hero" },
  { key: "work.header", label: "Work — header" },
  { key: "repertoire.header", label: "Repertoire — header" },
  { key: "process.header", label: "Process — header" },
  { key: "contact.header", label: "Contact — header" },
];

export const defaultContent: Record<string, PageCopy> = {
  "home.hero": {
    eyebrow: "Opening move",
    title: "Design that wins the game.",
    intro:
      "A creative studio working in UX research, product design, brand identity and graphic design.",
  },
  "work.header": {
    eyebrow: "The board",
    title: "Selected work.",
    intro:
      "Fourteen live builds across fintech, health, retail and media. Filter by discipline or search for a name, an industry or a stack.",
  },
  "repertoire.header": {
    eyebrow: "Repertoire",
    title: "What we play.",
    intro:
      "Research, product design, identity and graphic design, run as one continuous practice rather than separate departments.",
  },
  "process.header": {
    eyebrow: "The game plan",
    title: "How the game is played.",
    intro:
      "Four stages, reviewed in the browser rather than in slides, so there are no surprises at launch.",
  },
  "contact.header": {
    eyebrow: "Make your move",
    title: "Let's talk.",
    intro: "Tell us about the work. You get a written response from a person, within a day.",
  },
};
