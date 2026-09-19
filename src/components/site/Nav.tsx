import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useCvLink } from "@/lib/cms";

const links = [
  { label: "Work", to: "/work", section: "work" },
  { label: "Repertoire", to: "/repertoire", section: "repertoire" },
  { label: "Process", to: "/process", section: "process" },
  { label: "Courses", to: "/courses", section: "courses" },
  { label: "Contact", to: "/contact", section: "contact" },
];

/** Sections on the home page that map onto the nav items. */
const sectionIds = ["work", "repertoire", "process", "contact"];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const cv = useCvLink();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Context-aware pill: highlight the section currently in view on the home page.
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    const nodes = sectionIds
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [onHome]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function itemClass(l: (typeof links)[number], mobile = false) {
    const isActive = onHome ? active === l.section : pathname.startsWith(l.to);
    const base = mobile
      ? "flex items-center justify-between py-2.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors"
      : "rounded-full px-3.5 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors";
    return `${base} ${
      isActive
        ? mobile
          ? "text-primary"
          : "bg-primary/12 text-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;
  }

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center p-3 sm:p-5">
      <div
        className={`pointer-events-auto w-full max-w-[980px] rounded-[1.75rem] border transition-all duration-500 ${
          scrolled
            ? "border-border bg-background/60 shadow-[0_10px_40px_-20px_oklch(0_0_0/0.8)] backdrop-blur-xl"
            : "border-border/50 bg-background/80 backdrop-blur-xl md:border-transparent md:bg-background/25 md:backdrop-blur-md"
        }`}
      >
        <nav className="grid h-12 grid-cols-[auto_1fr_auto] items-center gap-3 px-3 sm:h-auto sm:px-4 sm:py-2">
          <Link
            to="/"
            aria-label="thedesigngrandmaster home"
            data-cursor="TOP"
            className="flex shrink-0 items-center"
          >
            <img
              src="/logo/tdg-logomark-ivory.svg"
              alt="thedesigngrandmaster"
              className="ml-2 block h-8 w-auto"
            />
          </Link>

          <div className="hidden items-center justify-center gap-1 md:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} data-cursor="OPEN" className={itemClass(l)}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <a
              href={cv.href}
              {...(cv.external ? { target: "_blank", rel: "noreferrer" } : {})}
              data-cursor="→"
              className="hidden rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground transition-opacity hover:opacity-85 sm:inline-block"
            >
              {cv.label}
            </a>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-border md:hidden"
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
                  className={itemClass(l, true)}
                >
                  {l.label}
                  {(onHome ? active === l.section : pathname.startsWith(l.to)) ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  ) : null}
                </Link>
              ))}
              <a
                href="https://drive.google.com/drive/folders/1wJHE2HaHAUOUiyGsXx6JGZbt5IIsNMtH?usp=drive_link"
                target="_blank"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-full bg-primary px-5 py-3 text-center font-mono text-[11px] tracking-[0.14em] uppercase text-primary-foreground"
              >
                {cv.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
