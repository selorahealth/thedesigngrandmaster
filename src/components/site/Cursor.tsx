import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (el) {
        setActive(true);
        setLabel(el.dataset["cursor"] || null);
      } else {
        setActive(false);
        setLabel(null);
      }
    };

    const tick = () => {
      x += (mouseX - x) * 0.16;
      y += (mouseY - y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          active
            ? "h-16 w-16 bg-foreground mix-blend-difference"
            : "h-3.5 w-3.5 bg-primary ring-1 ring-primary/40 ring-offset-4 ring-offset-transparent"
        }`}
      >
        {active && label ? (
          <span className="font-mono text-[10px] tracking-[0.18em] text-background">{label}</span>
        ) : null}
      </div>
    </div>
  );
}
