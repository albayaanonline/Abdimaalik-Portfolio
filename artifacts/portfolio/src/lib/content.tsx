import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type StatItem = { label: string; value: number };
export type CoreSkill = { name: string; percentage: number };

export type EditableProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  screenshotUrl: string;
  isLive: boolean;
};

export type PortfolioContent = {
  hero: {
    name: string;
    tagline: string;
    description: string;
    roles: string[];
  };
  about: {
    subtitle: string;
    bio: string[];
    stats: StatItem[];
  };
  contact: {
    email: string;
    whatsapp: string;
    whatsappDisplay: string;
    telegram: string;
    linkedin: string;
    github: string;
  };
  projects: EditableProject[];
  skills: {
    core: CoreSkill[];
  };
  adminPassword: string;
};

export const DEFAULT_CONTENT: PortfolioContent = {
  hero: {
    name: "Abdimaalik Developer",
    tagline: "Crafting high-performance digital experiences and intelligent automation systems. I transform complex problems into elegant, scalable solutions.",
    description: "Full Stack Developer & AI Specialist",
    roles: [
      "Full Stack Web Developer",
      "AI Automation Specialist",
      "Frontend Developer",
      "Backend Developer",
      "Problem Solver",
    ],
  },
  about: {
    subtitle: "Building the future of web experiences.",
    bio: [
      "I am a passionate Full Stack Web Developer and AI Automation builder dedicated to crafting exceptional digital solutions. With a keen eye for design and a strong foundation in modern web technologies, I bridge the gap between aesthetics and functionality.",
      "My approach combines clean, efficient code with intuitive user interfaces. Whether it's a complex web application, a seamless API integration, or an AI-powered automation workflow, I thrive on turning ideas into reality.",
      "I believe in continuous learning and pushing the boundaries of what's possible on the web. Let's build something extraordinary together.",
    ],
    stats: [
      { label: "Years Experience", value: 3 },
      { label: "Projects Completed", value: 20 },
      { label: "Technologies", value: 10 },
      { label: "Countries Reached", value: 5 },
    ],
  },
  contact: {
    email: "Adbulmaalikhasanmohamed@gmail.com",
    whatsapp: "252656042512",
    whatsappDisplay: "+252 656 042 512",
    telegram: "@abdimaalik_dev",
    linkedin: "https://linkedin.com/in/abdimaalik-hasan",
    github: "https://github.com/ablayaanonline",
  },
  projects: [
    {
      id: "1",
      title: "Albayaan Online",
      description: "A professional Islamic and educational platform designed to provide valuable content and digital services to a global audience.",
      tags: ["Web Platform", "Education", "Islamic Content"],
      liveUrl: "https://albayaanonline.com",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "https://image.thum.io/get/width/640/crop/450/noanimate/https://albayaanonline.com",
      isLive: true,
    },
    {
      id: "2",
      title: "Albayaan Pro",
      description: "A modern web platform built to provide advanced digital services, tools, and online solutions for businesses and individuals.",
      tags: ["Web App", "Digital Services", "SaaS"],
      liveUrl: "https://albayaan.pro",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "https://image.thum.io/get/width/640/crop/450/noanimate/https://albayaan.pro",
      isLive: true,
    },
    {
      id: "3",
      title: "Quran Learning Platform",
      description: "Interactive Quran learning platform with real-time progress tracking, student dashboards, and a modern, accessible user experience.",
      tags: ["React", "Node.js", "PostgreSQL"],
      liveUrl: "",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "",
      isLive: false,
    },
    {
      id: "4",
      title: "AI WhatsApp Agent",
      description: "An intelligent WhatsApp assistant capable of answering customer messages, handling inquiries, and automating conversational workflows.",
      tags: ["OpenAI", "Node.js", "Automation"],
      liveUrl: "",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "",
      isLive: false,
    },
    {
      id: "5",
      title: "Business Management Dashboard",
      description: "Comprehensive digital business management platform featuring real-time analytics, reporting, and resource planning tools.",
      tags: ["React", "Express", "PostgreSQL"],
      liveUrl: "",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "",
      isLive: false,
    },
    {
      id: "6",
      title: "Online Learning System",
      description: "Educational platform featuring structured courses, interactive quizzes, video hosting, and robust student performance tracking.",
      tags: ["Next.js", "TypeScript", "Supabase"],
      liveUrl: "",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "",
      isLive: false,
    },
    {
      id: "7",
      title: "AI Automation Platform",
      description: "End-to-end AI workflow automation platform that connects services, triggers actions, and eliminates repetitive manual tasks.",
      tags: ["OpenAI", "Python", "Node.js"],
      liveUrl: "",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "",
      isLive: false,
    },
    {
      id: "8",
      title: "Modern SaaS Dashboard",
      description: "Feature-rich SaaS admin dashboard with real-time data visualization, user management, billing integration, and dark mode.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      liveUrl: "",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "",
      isLive: false,
    },
  ],
  skills: {
    core: [
      { name: "React / Next.js", percentage: 90 },
      { name: "TypeScript", percentage: 85 },
      { name: "Node.js / Express", percentage: 80 },
      { name: "HTML / CSS / Tailwind", percentage: 95 },
      { name: "AI Integration", percentage: 75 },
    ],
  },
  adminPassword: "abdimaalik2026",
};

const STORAGE_KEY = "portfolio_content_v1";

function loadContent(): PortfolioContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<PortfolioContent>;
      return { ...DEFAULT_CONTENT, ...parsed };
    }
  } catch {
    // ignore
  }
  return DEFAULT_CONTENT;
}

function saveContent(content: PortfolioContent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {
    // ignore
  }
}

type ContentContextType = {
  content: PortfolioContent;
  updateContent: (updated: PortfolioContent) => void;
  resetContent: () => void;
};

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortfolioContent>(loadContent);

  const updateContent = useCallback((updated: PortfolioContent) => {
    saveContent(updated);
    setContent(updated);
  }, []);

  const resetContent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(DEFAULT_CONTENT);
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function usePortfolioContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error("usePortfolioContent must be used inside ContentProvider");
  return ctx;
}
