import suiseShot from "@/assets/project-screens/suise-dashboard.png";
import a01luxeShot from "@/assets/project-screens/a01luxe-shop-dashboard.png";
import pulsetalksShot from "@/assets/project-screens/pulsetalks-hero-section.png";
import wilShot from "@/assets/project-screens/women-in-leadership-hero-section.png";
import interiorShot from "@/assets/project-screens/interior-hero-section.png";
import selorahShot from "@/assets/project-screens/selorah-desktop-screen.png";
import selorahMobile from "@/assets/project-screens/selorah-mobile.png";
import syncstepShot from "@/assets/project-screens/syncstep-hero-section.png";
import tojuShot from "@/assets/project-screens/toju-hero-section.png";
import fixbaseMobile from "@/assets/project-screens/fixbase-mobile.png";
import rektpayMobile from "@/assets/project-screens/rektpay-mobile.png";
import solaribShot from "@/assets/project-screens/solarib-desktop.png";
import webreShot from "@/assets/project-screens/webre-desktop.png";
import hausShot from "@/assets/project-screens/haus-desktop.png";
import hausMobile from "@/assets/project-screens/haus-mobile.png";
import newmanShot from "@/assets/project-screens/newmanstores-desktop.png";
import newmanMobile from "@/assets/project-screens/newmanstores-mobile.png";

export type CaseSection = {
  label: string;
  title: string;
  body: string[];
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  industry: string;
  services: string[];
  tech: string[];
  year: string;
  url: string;
  summary: string;
  device: "desktop" | "mobile";
  screen: string;
  secondScreen?: string;
  secondDevice?: "desktop" | "mobile";
  brief: string[];
  sections: CaseSection[];
  outcomes: { value: string; label: string }[];
};

const react = ["React", "TypeScript", "Tailwind CSS", "Vercel"];

export const projects: Project[] = [
  {
    slug: "suise",
    name: "Suise",
    category: "Fintech / Web",
    industry: "Fintech, payments",
    services: ["Brand identity", "Web design", "Product design"],
    tech: react,
    year: "2025",
    url: "https://suise.vercel.app/",
    summary: "A payments dashboard that makes moving money feel calm instead of clinical.",
    device: "desktop",
    screen: suiseShot,
    brief: [
      "Suise needed a product surface that could carry balances, transfers and cards without turning into a wall of tables.",
      "The work covered the identity, the marketing story and the signed-in dashboard, all designed and built in one pass.",
    ],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Money, read at a glance",
        body: [
          "The first job was hierarchy. Balance first, movement second, everything else on demand. We mapped the five actions a user repeats daily and gave each one a permanent home.",
        ],
      },
      {
        label: "Design approach",
        title: "Quiet interface, loud numbers",
        body: [
          "Type carries the weight. Figures sit in a large display cut, labels drop to mono, and colour is reserved for state changes only.",
          "Cards, charts and lists share one spacing grid so the dashboard stays legible as features land.",
        ],
      },
      {
        label: "Development & build",
        title: "Componentised from day one",
        body: [
          "Built in React and TypeScript with a small primitive set: value, row, panel, sheet. New screens are assembled, not redrawn.",
        ],
      },
    ],
    outcomes: [
      { value: "1 pass", label: "Brand and product shipped together" },
      { value: "18", label: "Reusable interface primitives" },
    ],
  },
  {
    slug: "a01luxe",
    name: "A01Luxe",
    category: "Ecommerce / Web",
    industry: "Retail, luxury fashion",
    services: ["Brand identity", "Web design", "Graphic design"],
    tech: react,
    year: "2025",
    url: "https://a01luxe.vercel.app/",
    summary: "A luxury storefront and admin surface built around product photography.",
    device: "desktop",
    screen: a01luxeShot,
    brief: [
      "A01Luxe came in with strong product imagery and no system to hold it.",
      "The brief was one identity, one storefront and one back office that a two-person team could actually run.",
    ],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Photography leads",
        body: [
          "Every layout decision starts from the crop. The grid gives images room, and text stays out of their way.",
        ],
      },
      {
        label: "Design approach",
        title: "Restraint as luxury",
        body: [
          "Two type sizes, one accent, generous margins. The premium read comes from space and pacing rather than ornament.",
        ],
      },
      {
        label: "Development & build",
        title: "Storefront plus operations",
        body: [
          "Catalogue, cart and order views share the same data shapes as the admin dashboard, so stock and pricing stay honest.",
        ],
      },
    ],
    outcomes: [
      { value: "2", label: "Surfaces: storefront and admin" },
      { value: "100%", label: "Custom, no theme" },
    ],
  },
  {
    slug: "pulse-talks",
    name: "Pulse Talks",
    category: "Media / Web",
    industry: "Media, events",
    services: ["Brand identity", "Web design", "Graphic design"],
    tech: react,
    year: "2025",
    url: "https://pulsetalks.vercel.app/",
    summary: "A talks platform with editorial pacing and a speaker-first home page.",
    device: "desktop",
    screen: pulsetalksShot,
    brief: [
      "Pulse Talks runs a speaker series and needed a site that reads like a magazine, not a ticketing form.",
    ],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Sell the room",
        body: [
          "Attendance is driven by people, so speakers sit above dates. The page opens with faces and ideas, then closes with logistics.",
        ],
      },
      {
        label: "Design approach",
        title: "Editorial rhythm",
        body: [
          "Long-form sections alternate with tight metadata strips to keep scroll momentum without shouting.",
        ],
      },
      {
        label: "Development & build",
        title: "Built for a season",
        body: [
          "Sessions, speakers and venues are data-driven so a new edition is content work, not a rebuild.",
        ],
      },
    ],
    outcomes: [
      { value: "1 week", label: "Design to live" },
      { value: "0", label: "Templates used" },
    ],
  },
  {
    slug: "women-in-leadership",
    name: "Women in Leadership",
    category: "Community / Web",
    industry: "Nonprofit, community",
    services: ["Web design", "Graphic design", "Consulting"],
    tech: react,
    year: "2025",
    url: "https://women-in-leadership-team.vercel.app/",
    summary: "A programme site built to convert readers into applicants.",
    device: "desktop",
    screen: wilShot,
    brief: [
      "The programme had reach but no home. The site had to explain the mission in one screen and route people into the cohort form.",
    ],
    sections: [
      {
        label: "Discovery & strategy",
        title: "One mission, one action",
        body: [
          "Every section ends in the same call. Supporting content sits below the fold for people who need more before committing.",
        ],
      },
      {
        label: "Design approach",
        title: "Warm and credible",
        body: [
          "Bone backgrounds and photography-led bands keep the tone human while the type stays institutional.",
        ],
      },
      {
        label: "Development & build",
        title: "Light and fast",
        body: [
          "Static-first build so the site opens quickly on mobile data, which is how most applicants arrive.",
        ],
      },
    ],
    outcomes: [
      { value: "1", label: "Primary action, site-wide" },
      { value: "Mobile", label: "First surface designed" },
    ],
  },
  {
    slug: "interior",
    name: "Interior",
    category: "Interiors / Web",
    industry: "Interior design",
    services: ["Web design", "Brand identity"],
    tech: react,
    year: "2025",
    url: "http://interior-design-hub.vercel.app/",
    summary: "A studio portfolio where the rooms do the talking.",
    device: "desktop",
    screen: interiorShot,
    brief: [
      "An interiors practice with a deep archive and no way to browse it. The site had to feel like walking through the work.",
    ],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Archive as product",
        body: ["Projects are the navigation. Services and about pages support them, not the reverse."],
      },
      {
        label: "Design approach",
        title: "Full-bleed calm",
        body: [
          "Wide imagery, thin captions and long vertical pauses give each space the room a showroom would.",
        ],
      },
      {
        label: "Development & build",
        title: "Image discipline",
        body: ["Responsive art direction and lazy loading keep large photography from costing load time."],
      },
    ],
    outcomes: [
      { value: "Archive", label: "Built as the main navigation" },
      { value: "Lazy", label: "Every image below the fold" },
    ],
  },
  {
    slug: "selorah-health",
    name: "Selorah Health",
    category: "Health / Web",
    industry: "Healthcare",
    services: ["Product design", "Web design", "B2B"],
    tech: react,
    year: "2025",
    url: "https://selorah.vercel.app/",
    summary: "A clinic platform with a marketing front and a patient-facing app behind it.",
    device: "desktop",
    screen: selorahShot,
    secondScreen: selorahMobile,
    secondDevice: "mobile",
    brief: [
      "Selorah needed trust on the public side and speed on the signed-in side, without two design languages.",
    ],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Two audiences, one system",
        body: [
          "Prospective patients need reassurance. Existing patients need their next appointment in two taps. One token set serves both.",
        ],
      },
      {
        label: "Design approach",
        title: "Clinical without cold",
        body: ["Soft neutrals, clear labels, no decorative medical stock imagery."],
      },
      {
        label: "Development & build",
        title: "Auth and records",
        body: ["Login, onboarding and record views built mobile-first, since most sessions arrive on a phone."],
      },
    ],
    outcomes: [
      { value: "2 taps", label: "To book a follow-up" },
      { value: "Mobile", label: "First build target" },
    ],
  },
  {
    slug: "syncstep",
    name: "SyncStep",
    category: "Fitness / Product",
    industry: "Fitness, wearables",
    services: ["Product design", "Web design", "Brand identity"],
    tech: react,
    year: "2025",
    url: "http://syncstep.vercel.app/",
    summary: "A training product page built on motion and metrics.",
    device: "desktop",
    screen: syncstepShot,
    brief: ["SyncStep sells a habit, not a device. The page had to show progress, not specifications."],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Show the streak",
        body: ["Progress visuals lead. Features are proof, placed after the promise."],
      },
      {
        label: "Design approach",
        title: "Energy, controlled",
        body: ["High-contrast type with one accent to mark movement and achievement states."],
      },
      {
        label: "Development & build",
        title: "Motion with a budget",
        body: ["Transform-only animation and reduced-motion fallbacks so the page stays smooth on mid-range phones."],
      },
    ],
    outcomes: [
      { value: "60fps", label: "Transform-only motion" },
      { value: "A11y", label: "Reduced-motion respected" },
    ],
  },
  {
    slug: "toju",
    name: "Toju",
    category: "Health / Product",
    industry: "Healthcare, diagnostics",
    services: ["Product design", "B2B", "Consulting"],
    tech: react,
    year: "2025",
    url: "https://toju-ts.vercel.app/",
    summary: "A clinical dashboard where the data density had to stay readable.",
    device: "desktop",
    screen: tojuShot,
    brief: ["Toju handles patient records at volume. The interface had to hold density without becoming a spreadsheet."],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Rank the columns",
        body: ["We cut visible fields to the ones clinicians act on, and pushed the rest into detail views."],
      },
      {
        label: "Design approach",
        title: "Structure over decoration",
        body: ["Rules, not boxes. Alignment and spacing carry the grouping so the screen stays quiet."],
      },
      {
        label: "Development & build",
        title: "Typed end to end",
        body: ["Shared TypeScript models between list, detail and form views to keep states consistent."],
      },
    ],
    outcomes: [
      { value: "-40%", label: "Visible fields per row" },
      { value: "Typed", label: "Shared data models" },
    ],
  },
  {
    slug: "fixbase",
    name: "FixBase",
    category: "Services / App",
    industry: "Home services",
    services: ["Product design", "Web design"],
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    year: "2025",
    url: "https://fixbase-html.vercel.app/",
    summary: "A repairs marketplace designed thumb-first.",
    device: "mobile",
    screen: fixbaseMobile,
    brief: ["FixBase matches homeowners with tradespeople. Everything happens on a phone, mid-task."],
    sections: [
      {
        label: "Discovery & strategy",
        title: "One job, one flow",
        body: ["Request, match, confirm. Anything that did not serve those three steps came off the screen."],
      },
      {
        label: "Design approach",
        title: "Thumb zone first",
        body: ["Primary actions sit in the lower third, with large hit areas and high-contrast labels."],
      },
      {
        label: "Development & build",
        title: "Lean by choice",
        body: ["Hand-written HTML, CSS and JavaScript for a near-instant first load on weak connections."],
      },
    ],
    outcomes: [
      { value: "3 steps", label: "Request to confirmation" },
      { value: "No SPA", label: "Instant first paint" },
    ],
  },
  {
    slug: "rektpay",
    name: "RektPay",
    category: "Crypto / Web",
    industry: "Crypto, payments",
    services: ["Product design", "Brand identity"],
    tech: react,
    year: "2025",
    url: "https://rektpay.netlify.app/",
    summary: "A crypto wallet flow that keeps confidence high and steps low.",
    device: "mobile",
    screen: rektpayMobile,
    brief: ["Crypto interfaces fail on trust. The design work was mostly about confirmation and clarity."],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Every action is reversible or explained",
        body: ["Amounts, fees and destinations are restated before a send, in plain language."],
      },
      {
        label: "Design approach",
        title: "Dark, sharp, honest",
        body: ["Near-black surfaces with a single accent for state, and no gradients pretending to be depth."],
      },
      {
        label: "Development & build",
        title: "State machine flows",
        body: ["Send, receive and swap modelled as explicit states so no screen can be reached by accident."],
      },
    ],
    outcomes: [
      { value: "0", label: "Unconfirmed destructive actions" },
      { value: "Mobile", label: "Native-feeling web flows" },
    ],
  },
  {
    slug: "solarib",
    name: "Solarib",
    category: "Energy / Web",
    industry: "Renewable energy",
    services: ["Web design", "B2B", "Brand identity"],
    tech: react,
    year: "2025",
    url: "https://solarib.vercel.app/",
    summary: "A solar installer site that quotes instead of brochures.",
    device: "desktop",
    screen: solaribShot,
    brief: ["Solarib sells installations. The site had to qualify leads before a sales call, not after."],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Qualify on the page",
        body: ["Capacity, usage and location questions sit inside the hero, so the first action is a real enquiry."],
      },
      {
        label: "Design approach",
        title: "Daylight palette",
        body: ["Bone surfaces and warm photography, with cobalt reserved for the enquiry path."],
      },
      {
        label: "Development & build",
        title: "Forms that survive",
        body: ["Validated, resumable enquiry forms with clear error states on slow connections."],
      },
    ],
    outcomes: [
      { value: "Hero", label: "Enquiry starts above the fold" },
      { value: "1", label: "Conversion path site-wide" },
    ],
  },
  {
    slug: "webre",
    name: "Webre",
    category: "Agency / Web",
    industry: "Agency, services",
    services: ["Brand identity", "Web design", "Graphic design"],
    tech: react,
    year: "2025",
    url: "https://webre-dun.vercel.app/",
    summary: "An agency site with a strong opening statement and a fast case index.",
    device: "desktop",
    screen: webreShot,
    brief: ["Webre needed positioning first and portfolio second, in a layout that could grow with the roster."],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Say the thing",
        body: ["A single positioning line opens the site. Proof follows immediately underneath."],
      },
      {
        label: "Design approach",
        title: "Type as identity",
        body: ["The wordmark, headings and section labels are one continuous type system."],
      },
      {
        label: "Development & build",
        title: "Index that scales",
        body: ["Case entries are data, so adding work is a content change with no layout risk."],
      },
    ],
    outcomes: [
      { value: "1 line", label: "Positioning above the fold" },
      { value: "Data", label: "Driven case index" },
    ],
  },
  {
    slug: "haus",
    name: "Haus",
    category: "Real estate / Web",
    industry: "Real estate",
    services: ["Web design", "Product design", "Brand identity"],
    tech: react,
    year: "2025",
    url: "http://haus-seven.vercel.app/",
    summary: "A property platform with listings that survive a phone screen.",
    device: "desktop",
    screen: hausShot,
    secondScreen: hausMobile,
    secondDevice: "mobile",
    brief: ["Haus lists property. Search, filter and shortlist had to work equally well on desktop and mobile."],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Filter, then browse",
        body: ["Filters are persistent and visible. Results never reset when a user goes back."],
      },
      {
        label: "Design approach",
        title: "Photography with facts",
        body: ["Each card pairs one strong image with the four figures buyers actually compare."],
      },
      {
        label: "Development & build",
        title: "One list, two layouts",
        body: ["The same listing component renders as a grid card and a full-width mobile row."],
      },
    ],
    outcomes: [
      { value: "4", label: "Comparable figures per card" },
      { value: "Persistent", label: "Filters across navigation" },
    ],
  },
  {
    slug: "newmanstores-collections",
    name: "Newmanstores Collections",
    category: "Retail / Web",
    industry: "Retail, fashion",
    services: ["Web design", "Brand identity", "Graphic design"],
    tech: react,
    year: "2025",
    url: "https://the-nsc-hubbb.vercel.app/",
    summary: "A retail hub with an account layer and a catalogue that loads fast.",
    device: "desktop",
    screen: newmanShot,
    secondScreen: newmanMobile,
    secondDevice: "mobile",
    brief: ["Newmanstores needed a storefront, an account area and one visual language across both."],
    sections: [
      {
        label: "Discovery & strategy",
        title: "Catalogue first",
        body: ["Browsing is the product. Account features stay out of the way until they are needed."],
      },
      {
        label: "Design approach",
        title: "Bone and black",
        body: ["Light editorial surfaces for the catalogue, near-black for account and checkout focus."],
      },
      {
        label: "Development & build",
        title: "Auth without friction",
        body: ["Sign-in and sign-up designed as one mobile screen with clear, recoverable error states."],
      },
    ],
    outcomes: [
      { value: "1", label: "Design language across surfaces" },
      { value: "1 screen", label: "Sign in and sign up" },
    ],
  },
];

export const featuredProjects = projects.slice(0, 4);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
