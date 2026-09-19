export type Course = {
  slug: string;
  title: string;
  shortTitle: string;
  version?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  duration: string;
  level: string;
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
    title: "The ABCs of Graphic Design",
    shortTitle: "ABCs of Graphic Design",
    version: "1.0",
    price: 5500,
    originalPrice: 8500,
    currency: "NGN",
    duration: "Self-paced · Lifetime access",
    level: "Beginner",
    description:
      "Learn professional graphic design on your smartphone with PixelLab. From core principles to finished flyers, posts and stories; no laptop required.",
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
    tool: ["PixelLab", "Lightroom", "Snapseed"],
    badge: "SELF-PACED · LIFETIME ACCESS",
    whatsappMessage:
      "Hi Thedesigngrandmaster. My name is {fullName}. I just made payment for The ABCs of Graphic Design course. Here's my receipt.",
  },
  // Add the Vibecoding course here later with the same shape
];

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}
