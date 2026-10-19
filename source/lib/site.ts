export const site = {
  url: "https://anshumanpathak.com",
  name: "Anshuman Pathak",
  handle: "anshumanxda",
  role: "Software Engineer",
  company: "Aftershoot",
  companyUrl: "https://aftershoot.com",
  email: "anshumanpathak4@gmail.com",
  description:
    "Anshuman Pathak (anshumanxda) is a software engineer at Aftershoot, building fast, delightful web apps with React, Next.js and TypeScript. Previously at Fynd, Samespace, Compose.ly and Rupyz.",
  social: {
    github: "https://github.com/anshumanxda",
    linkedin: "https://www.linkedin.com/in/anshumanxda",
  },
};

export type Experience = {
  company: string;
  url?: string;
  position: string;
  location: string;
  period: string;
  current?: boolean;
  description: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    company: "Aftershoot",
    url: "https://aftershoot.com",
    position: "SDE II",
    location: "New Delhi",
    period: "Oct 2025 – Present",
    current: true,
    description: [
      "Building Aftershoot's web products for professional photographers, the AI platform for culling, editing and delivering photos.",
      "Shipping product features end to end, from API contracts to polished, accessible React UI.",
      "Focused on performance and developer experience across a large TypeScript codebase.",
    ],
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    company: "Fynd (Shopsense Retail Technologies Ltd.)",
    url: "https://www.fynd.com",
    position: "SDE I",
    location: "Mumbai, Maharashtra",
    period: "July 2024 – 2025",
    description: [
      "Optimized form performance with data caching, reducing server calls and improving overall efficiency.",
      "Translated business requirements into shippable features aligned with project goals.",
      "Built reusable React components adopted by peers across the project for consistency.",
    ],
    tags: ["React", "Caching", "Design systems"],
  },
  {
    company: "Samespace",
    url: "https://samespace.com",
    position: "SDE II, Frontend Engineer",
    location: "Mumbai, Maharashtra",
    period: "June 2023 – June 2024",
    description: [
      "Built an employee productivity app with charts and an integrated leave management feature.",
      "Migrated the component library to Radix, improving accessibility across the product.",
      "Contributed to a bot application using WebSockets and WebRTC for chat and calling.",
      "Built a video calling app on LiveKit with video, audio and screen sharing.",
      "Mentored teammates on Git: conflict resolution, cherry-pick, rebase and friends.",
    ],
    tags: ["Radix", "WebRTC", "LiveKit"],
  },
  {
    company: "Compose.ly, Inc",
    url: "https://compose.ly",
    position: "Sr. Frontend Engineer",
    location: "Remote",
    period: "May 2022 – May 2023",
    description: [
      "Turned Figma designs into pixel-perfect UI components.",
      "Used React Query caching to cut redundant API calls and speed up the app.",
      "Built custom-styled Chakra UI components and reusable, responsive form components.",
    ],
    tags: ["React Query", "Chakra UI", "Forms"],
  },
  {
    company: "Rupyz",
    url: "https://rupyz.com",
    position: "Front End Engineer",
    location: "Gurugram, Haryana",
    period: "Nov 2021 – April 2022",
    description: [
      "Built the analytics dashboard for the Rupyz Android app with React and Redux.",
      "Designed a blog management system on CKEditor for content creators.",
      "Developed a business portfolio app with Next.js and Tailwind CSS.",
    ],
    tags: ["Redux", "Next.js", "Tailwind"],
  },
];
