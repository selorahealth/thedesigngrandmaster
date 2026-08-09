import { useEffect } from "react";

type Props = {
  src: string | null;
  alt: string;
  onClose: () => void;
};

/**
 * Full-bleed image viewer for case-study screens. Keeps the page underneath
 * mounted so closing returns the reader to the same scroll position.
 */
export function Lightbox({ src, alt, onClose }: Props) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-sm animate-fade-in sm:p-10"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 rounded-full border border-border px-4 py-2 font-mono text-[10px] tracking-[0.16em] uppercase text-foreground sm:right-8 sm:top-8"
      >
        Close
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-auto max-w-full rounded-lg border border-border object-contain shadow-2xl"
      />
      <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
        Tap anywhere to close
      </p>
    </div>
  );
}
