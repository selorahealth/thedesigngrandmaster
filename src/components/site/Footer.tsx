import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { site } from "@/lib/site";
import { projects } from "@/data/projects";

function SwapLink({
  href,
  to,
  children,
}: {
  href?: string | undefined;
  to?: string | undefined;
  children: string;
}) {

  const cls =
    "swap-link font-sans text-[13px] font-medium text-muted-foreground";
  const inner = (
    <>
      <span className="swap-top">{children}</span>
      <span className="swap-bottom">{children}</span>
    </>
  );
  if (to) {
    return (
      <Link to={to} data-cursor="OPEN" className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} data-cursor="OPEN" target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls}>
      {inner}
    </a>
  );
}

const columns: { title: string; links: { label: string; to?: string; href?: string }[] }[] = [
  {
    title: "The board",
    links: projects.slice(0, 5).map((p) => ({ label: p.name, to: `/work/${p.slug}` })),
  },

  {
    title: "Services",
    links: [
      { label: "Web design", to: "/repertoire" },
      { label: "Branding", to: "/repertoire" },
      { label: "B2B", to: "/repertoire" },
      { label: "Product design", to: "/repertoire" },
      { label: "Consulting", to: "/repertoire" },
      { label: "Graphic design", to: "/repertoire" },
    ],
  },
  {
    title: "Process",
    links: [
      { label: "The game plan", to: "/process" },
      { label: "Opening questions", to: "/process" },
    ],
  },
  {
    title: "Engagements",
    links: [
      { label: "Monthly partnership", to: "/contact" },
      { label: "Fixed project", to: "/contact" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    if (error && !error.message.toLowerCase().includes("duplicate")) {
      setState("error");
      return;
    }
    setEmail("");
    setState("done");
  }

  return (
    <footer className="border-t border-border py-14 sm:py-16">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr_1fr]">
          <div>
            <Link to="/" aria-label="thedesigngrandmaster home" className="flex items-center gap-3">
              <img
                src="/logo/tdg-logomark-ivory.svg"
                alt=""
                aria-hidden="true"
                className="h-8 w-auto shrink-0"
              />
              <span className="text-lg leading-none tracking-tight">
                <span className="font-semibold text-muted-foreground">thedesign</span>
                <span className="font-extrabold text-foreground">grandmaster</span>
              </span>
            </Link>
            <div className="mt-6 flex flex-col items-start gap-2">
              <SwapLink href={`mailto:${site.email}`}>{site.email}</SwapLink>
              <SwapLink href={site.x}>{site.handle}</SwapLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title} className="min-w-0">
                <p className="eyebrow">{c.title}</p>
                <div className="mt-4 flex flex-col items-start gap-2">
                  {c.links.map((l) => (
                    <SwapLink key={c.title + l.label} to={l.to} href={l.href}>
                      {l.label}
                    </SwapLink>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div>
            <p className="eyebrow">Newsletter</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Subscribe for new work, once a month.
            </p>
            <form onSubmit={subscribe} className="mt-4 flex overflow-hidden rounded-full border border-border">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                data-cursor="&#8594;"
                className="bg-primary px-5 font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground"
              >
                Join
              </button>
            </form>
            {state === "done" ? (
              <p className="mt-3 font-mono text-[10px] tracking-[0.14em] uppercase text-primary">
                Subscribed.
              </p>
            ) : null}
            {state === "error" ? (
              <p className="mt-3 text-sm text-destructive">That did not save. Try again.</p>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
            Copyright (c) {new Date().getFullYear()} Thedesigngrandmaster
          </p>
          <div className="flex gap-6">
            <SwapLink href={site.x}>X</SwapLink>
            <SwapLink href={site.instagram}>Instagram</SwapLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
