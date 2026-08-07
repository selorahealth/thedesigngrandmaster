import { useReveal } from "./useReveal";
import suise from "@/assets/work-suise.jpg";
import a01luxe from "@/assets/work-a01luxe.jpg";
import pulsetalks from "@/assets/work-pulsetalks.jpg";
import wil from "@/assets/work-wil.jpg";
import interior from "@/assets/work-interior.jpg";
import selorah from "@/assets/work-selorah.jpg";
import syncstep from "@/assets/work-syncstep.jpg";
import toju from "@/assets/work-toju.jpg";
import fixbase from "@/assets/work-fixbase.jpg";
import rektpay from "@/assets/work-rektpay.jpg";
import solarib from "@/assets/work-solarib.jpg";
import webre from "@/assets/work-webre.jpg";
import haus from "@/assets/work-haus.jpg";
import newmanstores from "@/assets/work-newmanstores.jpg";

type Project = {
  name: string;
  category: string;
  year: string;
  url: string;
  image: string;
};

export const projects: Project[] = [
  { name: "Suise", category: "Fintech / Web", year: "2025", url: "https://suise.vercel.app/", image: suise },
  { name: "A01Luxe", category: "Ecommerce / Web", year: "2025", url: "https://a01luxe.vercel.app/", image: a01luxe },
  { name: "Pulse Talks", category: "Media / Web", year: "2025", url: "https://pulsetalks.vercel.app/", image: pulsetalks },
  { name: "Women in Leadership", category: "Community / Web", year: "2025", url: "https://women-in-leadership-team.vercel.app/", image: wil },
  { name: "Interior", category: "Interiors / Web", year: "2025", url: "http://interior-design-hub.vercel.app/", image: interior },
  { name: "Selorah Health", category: "Health / Web", year: "2025", url: "https://selorah.vercel.app/", image: selorah },
  { name: "SyncStep", category: "Fitness / Product", year: "2025", url: "http://syncstep.vercel.app/", image: syncstep },
  { name: "Toju", category: "Health / Product", year: "2025", url: "https://toju-ts.vercel.app/", image: toju },
  { name: "FixBase", category: "Services / App", year: "2025", url: "https://fixbase-html.vercel.app/", image: fixbase },
  { name: "RektPay", category: "Crypto / Web", year: "2025", url: "https://rektpay.netlify.app/", image: rektpay },
  { name: "Solarib", category: "Energy / Web", year: "2025", url: "https://solarib.vercel.app/", image: solarib },
  { name: "Webre", category: "Agency / Web", year: "2025", url: "https://webre-dun.vercel.app/", image: webre },
  { name: "Haus", category: "Real estate / Web", year: "2025", url: "http://haus-seven.vercel.app/", image: haus },
  { name: "Newmanstores Collections", category: "Retail / Web", year: "2025", url: "https://the-nsc-hubbb.vercel.app/", image: newmanstores },
];

export function TheBoard() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="work" ref={ref} className="py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <p className="eyebrow reveal">The board</p>
        <h2 className="display reveal mt-5 text-[clamp(2.25rem,5vw,4rem)]">The board.</h2>
        <p className="reveal mt-5 max-w-xl text-muted-foreground">
          Fourteen live builds across fintech, health, retail and media. Every one of them is a
          working site you can open right now.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="VIEW"
              className="reveal group relative block overflow-hidden border border-border bg-card transition-transform duration-500 hover:-translate-y-1"
            >
              <img
                src={p.image}
                alt={`${p.name} project cover`}
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-6 pt-16">
                <h3 className="font-display text-2xl">{p.name}</h3>
                <div className="mt-2 flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] uppercase text-muted-foreground">
                  <span>{p.category}</span>
                  <span className="h-px w-6 bg-border" />
                  <span>{p.year}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
