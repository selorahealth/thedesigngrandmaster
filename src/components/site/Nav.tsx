import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Work", to: "/work" },
  { label: "Repertoire", to: "/repertoire" },
  { label: "Process", to: "/process" },
  { label: "Contact", to: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
  <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center p-3 sm:p-5">
    <div
      className={`pointer-events-auto w-full max-w-[980px] h-11 rounded-full border transition-all duration-500 ${
      scrolled
        ? "border-border bg-background/60 shadow-[0_10px_40px_-20px_oklch(0_0_0/0.8)] backdrop-blur-xl"
        : "border-border/50 bg-background/80 backdrop-blur-xl md:border-transparent md:bg-background/25 md:backdrop-blur-md"
    }`}
    >
      {/* Always short on mobile */}
      <nav className="grid h-11 grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:h-auto sm:px-4 sm:py-2">
        <Link to="/" aria-label="thedesigngrandmaster home" data-cursor="TOP" className="flex shrink-0 items-center">
          <img
            src="/logo/tdg-logomark-ivory.svg"
            alt="thedesigngrandmaster"
            className="block h-7 w-auto"
          />
        </Link>

        <div className="hidden items-center justify-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-cursor="OPEN"
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <Link
            to="/contact"
            data-cursor="→"
            className="hidden rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground transition-opacity hover:opacity-85 sm:inline-block"
          >
            Start a project
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-foreground transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-foreground transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu – only expands when open */}
      <div
        className={`grid overflow-hidden transition-all duration-400 md:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 px-5 pb-5">
          <div className="flex flex-col gap-1 border-t border-border pt-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2.5 font-mono text-xs tracking-[0.18em] uppercase text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-primary px-5 py-3 text-center font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground"
            >
              Start a project
            </Link>
          </div>
        </div>
      </div>
    </div>
  </header>
);
}
