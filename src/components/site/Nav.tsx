import { useEffect, useState } from "react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Repertoire", href: "#repertoire" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-border bg-background/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" data-cursor="TOP" className="flex items-center gap-2">
          <span className="text-lg leading-none text-primary">&#9817;</span>
          <span className="font-mono text-xs tracking-[0.16em] text-foreground">
            thedesigngrandmaster
          </span>
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="OPEN"
              className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            data-cursor="&#8594;"
            className="bg-primary px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground transition-opacity hover:opacity-85"
          >
            Start a project
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-foreground md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="bg-primary px-5 py-3 text-center font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground"
            >
              Start a project
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
