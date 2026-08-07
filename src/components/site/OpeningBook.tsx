import { useReveal } from "./useReveal";

const wordmarks = [
  "Suise",
  "A01Luxe",
  "Pulse Talks",
  "Toju",
  "Haus",
  "Solarib",
  "RektPay",
  "Selorah",
];

export function OpeningBook() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="border-y border-border py-12">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="eyebrow reveal">Opening book</p>
        <div className="reveal mt-6 flex flex-wrap items-center gap-x-10 gap-y-5">
          {wordmarks.map((w) => (
            <span
              key={w}
              className="font-display text-xl text-muted-foreground/60 transition-colors duration-300 hover:text-foreground"
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
