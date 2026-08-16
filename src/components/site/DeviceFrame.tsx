import { srcSetFor, thumbUrl } from "@/lib/images";

type Props = {
  src: string;
  alt: string;
  device?: "desktop" | "mobile";
  priority?: boolean;
  /** Rendered width hint — drives which responsive variant is downloaded. */
  sizes?: string;
  className?: string;
};

/**
 * Renders a real project screenshot inside a chrome frame so the actual
 * shipped interface is the mockup, not a generated stand-in.
 */
export function DeviceFrame({
  src,
  alt,
  device = "desktop",
  priority,
  sizes,
  className,
}: Props) {
  const imgProps = {
    src: priority ? src : thumbUrl(src, device === "mobile" ? 540 : 1200),
    srcSet: srcSetFor(src),
    sizes: sizes ?? (device === "mobile" ? "270px" : "(max-width: 1024px) 100vw, 640px"),
    alt,
    loading: priority ? ("eager" as const) : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : ("auto" as const),
    decoding: "async" as const,
  };

  if (device === "mobile") {
    return (
      <div className={`mx-auto w-full max-w-[270px] ${className ?? ""}`}>
        <div className="rounded-[2rem] border border-border bg-card p-2 shadow-2xl">
          <div className="relative overflow-hidden rounded-[1.6rem] bg-background">
            <div className="absolute left-1/2 top-2 z-10 h-1.5 w-16 -translate-x-1/2 rounded-full bg-foreground/25" />
            <img {...imgProps} className="block w-full object-cover" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full ${className ?? ""}`}>
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
          <span className="h-2 w-2 rounded-full bg-foreground/20" />
        </div>
        <img {...imgProps} className="block w-full object-cover object-top" />
      </div>
    </div>
  );
}
