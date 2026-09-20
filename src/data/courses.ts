export type Course = {
  slug: string;
  title: string;
  shortTitle: string;
  version?: string;
  price?: number;                 // optional now
  originalPrice?: number;
  currency: string;
  duration: string;
  level: string;
  image?: string;
  description: string;
  whoFor: string[];
  bonuses: string[];
  outline: { title: string; description?: string }[];
  tools: string[];
  badge?: string;
  whatsappMessage: string;
};

export const courses: Course[] = [
  {
    slug: "abcs-of-graphic-design",
    image: "https://menvxgufebqlhhupmkvb.supabase.co/storage/v1/object/sign/media/course-covers/1789914041322-abcs-cover.webp?token=eyJraWQiOiJjYTIxMGI3MC1kY2U1LTQzOWMtYWI3ZC03YTMxOWQ0NmUxNmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9jb3Vyc2UtY292ZXJzLzE3ODk5MTQwNDEzMjItYWJjcy1jb3Zlci53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4OTkxNDA1NCwiZXhwIjoyMTA1Mjc0MDU0fQ.-TBYrN-fn8q7W0u8xHWLzyaBmuYdqZnJytb4SiYswj4",
    title: "The ABCs of Graphic Design",
    shortTitle: "ABCs of Graphic Design",
    version: "1.0",
    price: 5500,
    originalPrice: 8500,
    currency: "NGN",
    duration: "Self-paced · Lifetime access",
    level: "Beginner",
    description:
      "Learn professional graphic design on your smartphone with PixelLab. From core principles to finished flyers, posts and stories — no laptop required.",
    whoFor: [
      "Absolute beginners who want to design on their phones",
      "Content creators and small business owners",
      "Students who want practical graphic design skills",
      "Anyone who wants to create professional flyers, posts and stories without a laptop",
    ],
    bonuses: [
      "Exclusive video tutorials on PixelLab tricks & hidden tools",
      "Font pack for mobile",
      "Design books",
      "Private community access",
      "Certificate of Completion",
    ],
    outline: [
      { title: "Introduction to Graphic Design" },
      { title: "Principles of Graphic Design" },
      { title: "Navigating PixelLab" },
      { title: "Introduction to the Bezier Tool" },
      { title: "Color Theory for Mobile Design" },
      { title: "Importing & Managing Fonts in PixelLab" },
      { title: "Working with Images & Backgrounds" },
      { title: "Typography & Text Hierarchy" },
      { title: "Branding Basics & Design Consistency" },
      { title: "Designing a Birthday Flyer" },
      { title: "Advanced PixelLab Techniques & Tricks" },
    ],
    tools: ["PixelLab", "Lightroom", "Snapseed"],
    badge: "SELF-PACED · LIFETIME ACCESS",
    whatsappMessage:
      "Hi Thedesigngrandmaster. My name is {fullName}. I just made payment for The ABCs of Graphic Design course. Here's my receipt.",
  },
  {
    slug: "essentials-of-vibecoding",
    image: "https://menvxgufebqlhhupmkvb.supabase.co/storage/v1/object/sign/media/course-covers/1789840074966-essentials-cover.webp?token=eyJraWQiOiJjYTIxMGI3MC1kY2U1LTQzOWMtYWI3ZC03YTMxOWQ0NmUxNmYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9jb3Vyc2UtY292ZXJzLzE3ODk4NDAwNzQ5NjYtZXNzZW50aWFscy1jb3Zlci53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4OTg0MDA4NCwiZXhwIjoyMTA1MjAwMDg0fQ.zuyJG8W8qvZ5miVWdocXEhu1I9ciPPOGL7CMCjVW_A8",
    title: "Essentials of Vibecoding",
    shortTitle: "Essentials of Vibecoding",
    version: "1.0",
    price: 10500,
    originalPrice: 13500,
    currency: "NGN",
    duration: "Self-paced · Lifetime access",
    level: "Beginner",
    description:
      "Learn how to turn ideas into live websites using AI. From prompting and extracting clean code to deploying on Vercel and connecting Supabase — no traditional coding background required.",
    whoFor: [
      "Designers who want to bring their designs to life",
      "Non-technical founders and creators",
      "Anyone curious about building websites with AI",
      "People who want to ship real projects without writing every line of code",
    ],
    bonuses: [
      "Prompt library for common website sections",
      "Private community access",
      "Certificate of Completion",
      "Lifetime updates",
    ],
    outline: [
      { title: "What Vibecoding Really Means" },
      { title: "Setting Up Your Tools" },
      { title: "Writing Prompts That Work" },
      { title: "Extracting and Cleaning Code" },
      { title: "Pushing to GitHub" },
      { title: "Deploying to Vercel" },
      { title: "Connecting Supabase" },
      { title: "Environment Variables & Security" },
      { title: "Making the Site Look Professional" },
      { title: "Final Project: Ship Your First Live Site" },
    ],
    tools: ["Cursor", "Claude", "ChatGPT", "v0", "Vercel", "Supabase"],
    badge: "COMING SOON",
    whatsappMessage:
      "Hi Thedesigngrandmaster. My name is {fullName}. I just made payment for Essentials of Vibecoding course. Here's my receipt.",
  },
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}
