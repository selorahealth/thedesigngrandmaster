import { useReveal } from "./useReveal";

const quotes = [
  {
    quote:
      "He read the brief better than we wrote it. The site launched on time and the numbers moved in the first month.",
    name: "Daniel Okafor",
    role: "Founder, Suise",
  },
  {
    quote:
      "We came in with a half-finished brand. What came back was a full identity and a store that converts.",
    name: "Amara Bello",
    role: "Director, A01Luxe",
  },
  {
    quote:
      "Clear thinking, no drama, no template smell anywhere in the build. We have sent him three referrals since.",
    name: "Tunde Adeyemi",
    role: "Producer, Pulse Talks",
  },
];

export function PostGame() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="eyebrow reveal">Post-game analysis</p>
        <h2 className="display reveal mt-5 text-[clamp(2.25rem,5vw,4rem)]">What the board says.</h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="reveal border border-border bg-card p-8">
              <blockquote className="font-display text-xl leading-snug">&#8220;{q.quote}&#8221;</blockquote>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 font-mono text-[11px] text-primary">
                  {q.name.charAt(0)}
                </span>
                <span className="font-mono text-[10px] leading-relaxed tracking-[0.14em] uppercase text-muted-foreground">
                  {q.name}
                  <br />
                  {q.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const tiers = [
  {
    name: "Monthly partnership",
    price: "Retainer",
    blurb: "Ongoing design and engineering capacity for teams that ship continuously.",
    features: [
      "Rolling design and build queue",
      "Two active requests at a time",
      "Weekly review call",
      "Pause or stop any month",
    ],
    popular: false,
  },
  {
    name: "Fixed project",
    price: "Scoped",
    blurb: "One defined build with a fixed scope, timeline and price agreed up front.",
    features: [
      "Full discovery and art direction",
      "Design plus front end build",
      "Launch, SEO and handover",
      "30 days of post-launch support",
    ],
    popular: true,
  },
];

export function Engagements() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="eyebrow reveal">Make your move</p>
        <h2 className="display reveal mt-5 text-[clamp(2.25rem,5vw,4rem)]">Make your move.</h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`reveal relative border p-9 ${
                t.popular ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              {t.popular ? (
                <span className="absolute right-6 top-6 bg-primary px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-primary-foreground">
                  Popular
                </span>
              ) : null}
              <p className="eyebrow">{t.price}</p>
              <h3 className="font-display mt-4 text-3xl">{t.name}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{t.blurb}</p>
              <ul className="mt-8 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary">&#9633;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-cursor="&#8594;"
                className={`mt-9 inline-block px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-85 ${
                  t.popular
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground"
                }`}
              >
                Start here
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
