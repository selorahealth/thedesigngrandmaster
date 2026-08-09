import { useReveal } from "./useReveal";
import suise from "@/assets/opening-book-logos/suise-logomark.png";
import a01luxe from "@/assets/opening-book-logos/a01luxe-logo-icon.png";
import pulsetalks from "@/assets/opening-book-logos/pulsetalks-logo-icon.png";
import rektpay from "@/assets/opening-book-logos/rektpay-logo-icon.webp";
import toju from "@/assets/opening-book-logos/toju-logo.webp";
import wil from "@/assets/opening-book-logos/womeninleadership-logo-icon.png";

const logos = [
  { name: "Suise", src: suise },
  { name: "A01Luxe", src: a01luxe },
  { name: "Pulse Talks", src: pulsetalks },
  { name: "Toju", src: toju },
  { name: "RektPay", src: rektpay },
  { name: "Women in Leadership", src: wil },
];

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-12 pr-12 sm:gap-20 sm:pr-20"
      aria-hidden={ariaHidden ? "true" : undefined}
    >
      {logos.map((l) => (
        <img
          key={l.name}
          src={l.src}
          alt={ariaHidden ? "" : `${l.name} logo`}
          loading="lazy"
          className="h-14 w-auto max-w-[200px] shrink-0 object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-20"
        />
      ))}
    </div>
  );
}

export function OpeningBook() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="opening-book" ref={ref} className="border-y border-border py-10 sm:py-14">
      <div className="shell">
        <p className="eyebrow reveal">Opening book</p>
      </div>
      <div className="marquee reveal mt-7 sm:mt-9">
        <div className="marquee-track">
          <Row />
          <Row ariaHidden />
        </div>
      </div>
    </section>
  );
}
