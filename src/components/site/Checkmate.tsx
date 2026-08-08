import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useReveal } from "./useReveal";
import { site } from "@/lib/site";
import queen from "@/assets/queen.png";

export function Checkmate({ heading = "Tell us what you're building." }: { heading?: string }) {
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
      setError(`That did not send. Try again, or email ${site.email}.`);
      return;
    }

    form.reset();
    setStatus("sent");
  }

  const field =
    "w-full rounded-lg border border-border bg-card px-4 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary";

  return (
    <section
      id="contact"
      ref={ref}
      className="section-y relative overflow-hidden border-t border-border bg-ink"
    >
      <img
        src={queen}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute left-1/2 top-1/2 w-[540px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.07] mix-blend-screen sm:w-[680px]"
      />
      <div className="shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow reveal">Checkmate</p>
          <h2 className="display reveal mt-4 text-[clamp(2.1rem,9vw,4.5rem)] sm:text-[clamp(2.5rem,6vw,4.5rem)]">
            {heading}
          </h2>
          <p className="reveal mt-5 text-sm text-muted-foreground sm:text-base">
            Send the brief, the budget range and the deadline. You will get a real answer, not a
            pitch deck.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="reveal mt-4 inline-block font-mono text-[11px] tracking-[0.14em] text-primary"
          >
            {site.email}
          </a>
        </div>

        <form onSubmit={onSubmit} className="reveal mx-auto mt-10 max-w-2xl sm:mt-14">
          <div className="grid gap-4 sm:grid-cols-2">
            <input name="name" required placeholder="Name" className={field} />
            <input name="email" type="email" required placeholder="Email" className={field} />
            <input name="company" placeholder="Company (optional)" className={field} />
            <input name="budget" placeholder="Budget range (optional)" className={field} />
          </div>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="What are you building?"
            className={`${field} mt-4`}
          />
          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              data-cursor="&#8594;"
              disabled={status === "sending"}
              className="w-full rounded-full bg-primary px-7 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase text-primary-foreground transition-opacity hover:opacity-85 disabled:opacity-50 sm:w-auto"
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
