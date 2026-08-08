import { useState } from "react";
import { useReveal } from "./useReveal";

export const faqs = [
  {
    q: "What kind of projects do you take on?",
    a: "Marketing sites, web apps, dashboards and brand identities. If it lives in a browser, it is in scope.",
  },
  {
    q: "How long does a build take?",
    a: "A focused marketing site runs two to three weeks. A product build with real data runs four to eight, depending on scope.",
  },
  {
    q: "Can you work with our existing brand?",
    a: "Yes. If you have a usable identity, I design inside it. If it is holding you back, I will say so and quote the fix separately.",
  },
  {
    q: "Do you write the copy?",
    a: "First-draft copy is included on every build so the layout is designed around real words, not placeholder text.",
  },
  {
    q: "What do you need from us to start?",
    a: "Your goal, any existing assets and one decision maker who can approve work. That is enough for the opening.",
  },
  {
    q: "Are you available right now?",
    a: "I take two active projects at a time. Send the brief and you will get a straight answer on timing within a day.",
  },
];

export function OpeningQuestions({ light = true }: { light?: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      className={`section-y ${light ? "on-bone" : "border-t border-border"}`}
    >
      <div className="shell grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
        <div>
          <p className="eyebrow reveal">Opening questions</p>
          <h2 className="display reveal mt-4 text-[clamp(2rem,8vw,3.5rem)] sm:text-[clamp(2.25rem,5vw,3.5rem)]">
            Opening questions.
          </h2>
        </div>

        <div className="reveal">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <div key={f.q} className="border-t border-border last:border-b">
                <button
                  type="button"
                  data-cursor="OPEN"
                  onClick={() => setOpen(active ? null : i)}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left sm:py-6"
                >
                  <span className="text-[0.95rem] text-foreground sm:text-base">{f.q}</span>
                  <span className="shrink-0 font-mono text-xs text-primary">
                    {active ? "\u2212" : "+"}
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-all duration-500 ${
                    active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className="pb-5 pr-4 text-sm leading-relaxed text-muted-foreground sm:pb-6 sm:pr-10">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
