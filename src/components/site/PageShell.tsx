import type { ReactNode } from "react";
import { Cursor } from "./Cursor";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Cursor />
      <Nav />
      {children}
      <Footer />
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="bg-ink pt-28 pb-10 sm:pt-36 sm:pb-14 lg:pt-44">
      <div className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-4 text-[clamp(2.25rem,10vw,5rem)] sm:text-[clamp(2.75rem,6vw,5rem)]">
          {title}
        </h1>
        {intro ? (
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
