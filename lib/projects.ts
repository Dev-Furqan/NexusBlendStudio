export type ProjectAccent = "red" | "coral" | "mint" | "violet" | "cyan";

export type Project = {
  title: string;
  category: string;
  summary: string;
  stack: string[];
  url: string;
  thumbnail: string;
  accent: ProjectAccent;
};

export const projects: Project[] = [
  {
    title: "Thumbrush",
    category: "Creative Agency Website",
    summary:
      "Modern creative agency website with premium UI, responsive layouts, smooth interactions, and performance-focused frontend architecture.",
    stack: ["React.js", "Next.js", "Tailwind"],
    url: "https://thumbrush-gilt.vercel.app/",
    thumbnail: "/projects/thumbrush.png",
    accent: "red",
  },
  {
    title: "Torvix Chauffeur",
    category: "Premium Chauffeur Service Website",
    summary:
      "Luxury chauffeur service website focused on elegant booking experience, responsive layouts, and premium visual presentation.",
    stack: ["WordPress", "Custom UI/UX"],
    url: "https://torvixchauffeurksa.com",
    thumbnail: "/projects/torvix-chauffeur.png",
    accent: "coral",
  },
  {
    title: "Blush Baby",
    category: "eCommerce Beauty Store",
    summary:
      "Modern beauty and skincare ecommerce store optimized for conversions, mobile shopping experience, and premium product presentation.",
    stack: ["Shopify", "WooCommerce"],
    url: "https://blushbaby.store",
    thumbnail: "/projects/blush-baby.png",
    accent: "mint",
  },
  {
    title: "Publishing Heaven",
    category: "Custom eBooks Platform",
    summary:
      "Custom landing-based publishing platform designed for lead generation, responsive performance, and conversion optimization.",
    stack: ["Custom PHP", "Lead Generation"],
    url: "https://publishing-lp1.thepublishingheaven.com",
    thumbnail: "/projects/publishing-heaven.png",
    accent: "violet",
  },
  {
    title: "Zex Skin",
    category: "SEO-Based Skincare Blog",
    summary:
      "SEO-optimized skincare blog focused on organic traffic growth, content structure, speed optimization, and modern UI.",
    stack: ["WordPress", "SEO"],
    url: "https://zexskin.com",
    thumbnail: "/projects/zex-skin.png",
    accent: "cyan",
  },
  {
    title: "This Is Magma",
    category: "Interactive Premium Website",
    summary:
      "High-end immersive interactive website experience featuring cinematic animations, motion effects, and premium scrolling interactions.",
    stack: ["Modern Frontend", "Motion Design"],
    url: "https://thisismagma.com",
    thumbnail: "/projects/this-is-magma.png",
    accent: "coral",
  },
  {
    title: "MediConnect AI",
    category: "AI Healthcare Platform",
    summary:
      "Modern AI-powered healthcare platform with clean dashboards, responsive UI, and intelligent workflow presentation.",
    stack: ["React", "Node.js", "AI Integration"],
    url: "https://mediconnectai.com",
    thumbnail: "/projects/mediconnect-ai.png",
    accent: "mint",
  },
  {
    title: "Try Fit Track",
    category: "Fitness Tracking Platform",
    summary:
      "Modern fitness and activity tracking platform with responsive layouts, user-focused dashboards, and clean UI systems.",
    stack: ["React", "MERN Stack"],
    url: "https://tryfittrack.com",
    thumbnail: "/projects/try-fit-track.png",
    accent: "violet",
  },
];

export const projectCategories = Array.from(new Set(projects.map((project) => project.category)));
