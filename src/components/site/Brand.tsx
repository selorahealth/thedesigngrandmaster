import { Link } from "@tanstack/react-router";

export function Logomark({ className = "h-7 w-auto" }: { className?: string }) {
  return <img src="/logo/tdg-logomark-ivory.svg" alt="" aria-hidden="true" className={className} />;
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="thedesigngrandmaster home" className={`flex items-center gap-3 ${className}`}>
      <img
        src="/logo/tdg-logomark-ivory.svg"
        alt=""
        aria-hidden="true"
        className="h-9 w-auto shrink-0"
      />
      <span className="text-[clamp(1rem,3.6vw,1.35rem)] leading-none tracking-tight">
        <span className="font-semibold text-muted-foreground">thedesign</span>
        <span className="font-extrabold text-foreground">grandmaster</span>
      </span>
    </Link>
  );
}
