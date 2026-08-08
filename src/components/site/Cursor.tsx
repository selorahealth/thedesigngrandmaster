import { useEffect, useRef, useState } from "react";
import cursorMark from "@/assets/custom-cursor.svg";

/**
 * tdg monogram cursor. Default bone, cobalt on interactive targets,
 * brief vermilion flash on click.
 */
export function Cursor() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-root");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let x = mouseX;
    let y = mouseY;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement | null;
      setHot(Boolean(target?.closest("a, button, [data-cursor], [role='button']")));
    };

    const onDown = () => {
      setClick(true);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setClick(false), 220);
    };

    const tick = () => {
      x += (mouseX - x) * 0.22;
      y += (mouseY - y) * 0.22;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
      document.documentElement.classList.remove("cursor-none-root");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
    >
      <div
        className={`transition-transform duration-200 ease-out ${click ? "scale-90" : hot ? "scale-110" : "scale-100"}`}
        style={{
          width: 18,
          height: 24,
          backgroundColor: click
            ? "var(--vermilion)"
            : hot
              ? "var(--cobalt)"
              : "var(--foreground)",
          maskImage: `url(${cursorMark})`,
          WebkitMaskImage: `url(${cursorMark})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}
