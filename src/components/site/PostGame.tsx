import { Link } from "@tanstack/react-router";
import { useReveal } from "./useReveal";
import daniel from "@/assets/avatars/avatar-daniel.jpg";
import amara from "@/assets/avatars/avatar-amara.jpg";
import tunde from "@/assets/avatars/avatar-tunde.jpg";

const quotes = [
  {
    quote:
      "He read the brief better than we wrote it. The site launched on time and the numbers moved in the first month.",
    name: "Daniel Okafor",
    role: "Founder, Suise",
    avatar: daniel,
  },
  {
    quote:
      "We came in with a half-finished brand. What came back was a full identity and a store that converts.",
    name: "Amara Bello",
    role: "Director, A01Luxe",
    avatar: amara,
  },
  {
    quote:
      "Clear thinking, no drama, no template smell anywhere in the build. We have sent him three referrals since.",
    name: "Tunde Adeyemi",
    role: "Producer, Pulse Talks",
    avatar: tunde,
  },
];

export function PostGame() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="on-bone section-y">
      <div className="shell">
        <p className="eyebrow reveal">Post-game analysis</p>
        <h2 className="display reveal mt-4 text-[clamp(2rem,8vw,4rem)] sm:text-[clamp(2.25rem,5vw,4rem)]">
          What the board says.
        </h2>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="reveal rounded-2xl border border-border bg-card p-6 sm:p-8">
              <blockquote className="font-display text-lg leading-snug sm:text-xl">
                &#8220;{q.quote}&#8221;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <img
                  src={q.avatar}
                  alt={q.name}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
                <span className="min-w-0 font-mono text-[10px] leading-relaxed tracking-[0.14em] uppercase text-muted-foreground">
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

export const tiers = [
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
    <section ref={ref} className="section-y border-t border-border">
      <div className="shell">
        <p className="eyebrow reveal">Make your move</p>
        <h2 className="display reveal mt-4 text-[clamp(2rem,8vw,4rem)] sm:text-[clamp(2.25rem,5vw,4rem)]">
          Make your move.
        </h2>

        <div className="mt-10 grid gap-5 sm:mt-14 sm:gap-6 lg:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`reveal relative rounded-2xl border p-6 sm:p-9 ${
                t.popular ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              {t.popular ? (
                <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase text-primary-foreground">
                  Popular
                </span>
              ) : null}
              <p className="eyebrow">{t.price}</p>
              <h3 className="mt-4 font-display text-2xl sm:text-3xl">{t.name}</h3>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{t.blurb}</p>
              <ul className="mt-7 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary">&#9633;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                data-cursor="&#8594;"
                className={`mt-8 inline-block rounded-full px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-opacity hover:opacity-85 ${
                  t.popular
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground"
                }`}
              >
                Start here
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
