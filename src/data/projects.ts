export interface Project {
  slug: string;
  title: string;
  tag: string;
  category: "Personal" | "Professional";
  status?: "In Progress";
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured: boolean;
}

// Fill in `github` / `live` once the links are ready — leave undefined until then.
export const projects: Project[] = [
  {
    slug: "green-cart",
    title: "Green Cart",
    tag: "E-Commerce",
    category: "Personal",
    description:
      "Full-stack e-commerce platform with a responsive storefront and an admin dashboard for full CRUD management of products, inventory, and orders.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS", "JWT"],
    featured: false,
  },
  {
    slug: "small-hands",
    title: "Small Hands",
    tag: "Emergency Response",
    category: "Personal",
    description:
      "Two-sided PWA connecting citizens and NGOs — citizens submit geo-tagged reports, and nearby NGOs are notified instantly over WebSockets and can claim and resolve issues in real time.",
    tech: ["React", "Node.js", "Socket.io", "Google Maps API", "PWA"],
    featured: true,
    live: "https://www.smallhands.online/",
  },
  {
    slug: "imagify",
    title: "Imagify",
    tag: "AI / Generative",
    category: "Personal",
    description:
      "AI text-to-image generator powered by the OpenAI DALL-E API. The Express backend securely proxies API calls and enforces per-user credit limits.",
    tech: ["React", "Node.js", "Express", "OpenAI API", "MongoDB"],
    featured: true,
    live: "https://imagify-d82z.vercel.app/",
  },
  {
    slug: "company-erp",
    title: "Company ERP System",
    tag: "Internal Tooling",
    category: "Personal",
    status: "In Progress",
    description:
      "An internal ERP with a MERN backend and a role-based React dashboard, covering core company operations end to end.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    featured: true,
    github: "https://github.com/shoaib7080/manpower-management-system",
  },
  {
    slug: "review-platform",
    title: "White-Label Review Platform",
    tag: "B2B SaaS",
    category: "Professional",
    description:
      "Multi-tenant review management platform enabling businesses to register, launch branded review campaigns, and aggregate structured customer feedback in a unified dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    featured: false,
  },
  {
    slug: "hospital-management",
    title: "Hospital Management System",
    tag: "Healthcare",
    category: "Professional",
    description:
      "Consolidated patient registration, appointment scheduling, billing, pharmacy, and lab results into a single React dashboard backed by Node.js and MongoDB.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    featured: false,
  },
  {
    slug: "laundry-service-app",
    title: "Laundry Service Platform",
    tag: "Logistics",
    category: "Professional",
    description:
      "Full-stack application handling customer order placement, real-time status tracking, driver assignment, and admin reporting for an external client.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    featured: false,
  },
];
