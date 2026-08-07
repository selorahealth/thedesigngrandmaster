import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

function SwapLink({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} data-cursor="OPEN" className="swap-link font-mono text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
      <span className="swap-top">{children}</span>
      <span className="swap-bottom">{children}</span>
    </a>
  );
}

const columns = [
  { title: "Projects", links: [{ label: "The board", href: "#work" }, { label: "Suise", href: "https://suise.vercel.app/" }, { label: "A01Luxe", href: "https://a01luxe.vercel.app/" }] },
  { title: "Services", links: [{ label: "Repertoire", href: "#repertoire" }, { label: "Web design", href: "#repertoire" }, { label: "Engineering", href: "#repertoire" }] },
  { title: "Process", links: [{ label: "The game plan", href: "#process" }, { label: "Opening questions", href: "#process" }] },
  { title: "Engagements", links: [{ label: "Monthly partnership", href: "#contact" }, { label: "Fixed project", href: "#contact" }] },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    if (error && !error.message.includes("duplicate")) {
      setState("error");
      return;
    }
    setEmail("");
    setState("done");
  }

  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg leading-none text-primary">&#9817;</span>
              <span className="font-mono text-xs tracking-[0.16em]">thedesigngrandmaster</span>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <SwapLink href="mailto:hello@thedesigngrandmaster.com">
                hello@thedesigngrandmaster.com
              </SwapLink>
              <SwapLink href="https://wa.me/2348000000000">WhatsApp</SwapLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="eyebrow">{c.title}</p>
                <div className="mt-4 flex flex-col gap-2">
                  {c.links.map((l) => (
                    <SwapLink key={l.label + l.href} href={l.href}>
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
            <form onSubmit={subscribe} className="mt-4 flex">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="min-w-0 flex-1 border border-border bg-card px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                type="submit"
                data-cursor="&#8594;"
                className="bg-primary px-4 font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground"
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

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-muted-foreground">
            &copy; {new Date().getFullYear()} thedesigngrandmaster
          </p>
          <div className="flex gap-6">
            <SwapLink href="https://x.com">X</SwapLink>
            <SwapLink href="https://instagram.com">Instagram</SwapLink>
            <SwapLink href="https://linkedin.com">LinkedIn</SwapLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
