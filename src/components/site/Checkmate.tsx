import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useReveal } from "./useReveal";
import queen from "@/assets/queen.png";

export function Checkmate() {
  const ref = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setError(null);

    const { error: insertError } = await supabase.from("project_inquiries").insert({
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      company: (String(data.get("company") || "") || null) as string | null,
      budget: (String(data.get("budget") || "") || null) as string | null,
      message: String(data.get("message") || ""),
    });

    if (insertError) {
      setStatus("error");
      setError("That did not send. Try again, or email hello@thedesigngrandmaster.com.");
      return;
    }

    form.reset();
    setStatus("sent");
  }

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden border-t border-border py-24 lg:py-32">
      <img
        src={queen}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[680px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      />
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow reveal">Checkmate</p>
          <h2 className="display reveal mt-5 text-[clamp(2.5rem,6vw,4.5rem)]">
            Tell us what you&#39;re building.
          </h2>
          <p className="reveal mt-5 text-muted-foreground">
            Send the brief, the budget range and the deadline. You will get a real answer, not a
            pitch deck.
          </p>
        </div>

        <form onSubmit={onSubmit} className="reveal mx-auto mt-14 max-w-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Name"
              className="border border-border bg-card px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="border border-border bg-card px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <input
              name="company"
              placeholder="Company (optional)"
              className="border border-border bg-card px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
            <input
              name="budget"
              placeholder="Budget range (optional)"
              className="border border-border bg-card px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What are you building?"
            className="mt-4 w-full border border-border bg-card px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              data-cursor="&#8594;"
              disabled={status === "sending"}
              className="bg-primary px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              {status === "sending" ? "Sending" : "Book a call"}
            </button>
            {status === "sent" ? (
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-primary">
                Received. You will hear back within a day.
              </p>
            ) : null}
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
          </div>
        </form>
      </div>
    </section>
  );
}
