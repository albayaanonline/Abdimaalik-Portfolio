import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact, SiNodedotjs, SiPostgresql, SiOpenai,
  SiExpress, SiNextdotjs, SiTypescript, SiSupabase,
  SiTailwindcss, SiPython
} from "react-icons/si";
import { ExternalLink, Github, Globe, Star, ImageOff } from "lucide-react";

type Project = {
  title: string;
  description: string;
  tags: string[];
  icons: React.ComponentType<{ className?: string }>[];
  liveUrl?: string;
  githubUrl?: string;
  isReal?: boolean;
  badge?: string;
  screenshotUrl?: string;
};

function ProjectImage({
  screenshotUrl,
  title,
  icons,
  isReal,
  badge,
}: {
  screenshotUrl?: string;
  title: string;
  icons: React.ComponentType<{ className?: string }>[];
  isReal?: boolean;
  badge?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-48 w-full bg-gradient-to-br from-background via-muted to-background relative overflow-hidden flex items-center justify-center border-b border-white/5 group-hover:border-primary/20">
      {/* Real screenshot */}
      {screenshotUrl && !imgError ? (
        <img
          src={screenshotUrl}
          alt={`${title} screenshot`}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-60 group-hover:opacity-80 transition-opacity duration-500"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      )}

      {/* Overlay gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      {/* Badge */}
      {isReal && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/20 border border-primary/40 text-primary text-xs font-semibold px-2 py-1 rounded-full z-10">
          <Globe className="w-3 h-3" /> Live
        </div>
      )}
      {badge && !isReal && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-secondary/10 border border-secondary/20 text-muted-foreground text-xs font-medium px-2 py-1 rounded-full z-10">
          <Star className="w-3 h-3" /> {badge}
        </div>
      )}
      {screenshotUrl && imgError && (
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-card/60 border border-white/10 text-muted-foreground text-xs px-2 py-1 rounded-full z-10">
          <ImageOff className="w-3 h-3" /> Preview unavailable
        </div>
      )}

      {/* Tech icons — shown when no screenshot or on hover */}
      <div className={`flex gap-6 z-10 transform transition-all duration-500 ${screenshotUrl && !imgError ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100" : "group-hover:scale-110"}`}>
        {icons.map((Icon, iIdx) => (
          <Icon key={iIdx} className="w-16 h-16 text-primary/60 group-hover:text-primary transition-colors duration-500 drop-shadow-lg" />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-primary/40 transition-all duration-300"
    >
      <ProjectImage
        screenshotUrl={project.screenshotUrl}
        title={project.title}
        icons={project.icons}
        isReal={project.isReal}
        badge={project.badge}
      />

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-gradient transition-all">{project.title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, tIdx) => (
            <span key={tIdx} className="text-xs font-medium px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full border border-secondary/20">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`link-live-${project.title.replace(/\s+/g, "-").toLowerCase()}`}
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors font-medium text-sm"
            >
              <Globe className="w-4 h-4" /> Visit Website
            </a>
          ) : (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-primary/5 text-primary/40 border border-primary/10 font-medium text-sm cursor-not-allowed"
            >
              <ExternalLink className="w-4 h-4" /> Live Demo
            </button>
          )}
          <a
            href={project.githubUrl ?? "https://github.com/ablayaanonline"}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`link-github-${project.title.replace(/\s+/g, "-").toLowerCase()}`}
            className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-white/5 text-foreground border border-white/10 hover:bg-white/10 transition-colors font-medium text-sm"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const realProjects: Project[] = [
    {
      title: "Albayaan Online",
      description: "A professional Islamic and educational platform designed to provide valuable content and digital services to a global audience.",
      tags: ["Web Platform", "Education", "Islamic Content"],
      icons: [SiReact, SiNodedotjs, SiTailwindcss],
      liveUrl: "https://albayaanonline.com",
      isReal: true,
      badge: "Live Website",
      screenshotUrl: "https://image.thum.io/get/width/640/crop/450/noanimate/https://albayaanonline.com",
    },
    {
      title: "Albayaan Pro",
      description: "A modern web platform built to provide advanced digital services, tools, and online solutions for businesses and individuals.",
      tags: ["Web App", "Digital Services", "SaaS"],
      icons: [SiNextdotjs, SiTypescript, SiTailwindcss],
      liveUrl: "https://albayaan.pro",
      isReal: true,
      badge: "Live Website",
      screenshotUrl: "https://image.thum.io/get/width/640/crop/450/noanimate/https://albayaan.pro",
    },
  ];

  const demoProjects: Project[] = [
    {
      title: "Quran Learning Platform",
      description: "Interactive Quran learning platform with real-time progress tracking, student dashboards, and a modern, accessible user experience.",
      tags: ["React", "Node.js", "PostgreSQL"],
      icons: [SiReact, SiNodedotjs, SiPostgresql],
      githubUrl: "https://github.com/ablayaanonline",
      badge: "Personal Project",
    },
    {
      title: "AI WhatsApp Agent",
      description: "An intelligent WhatsApp assistant capable of answering customer messages, handling inquiries, and automating conversational workflows.",
      tags: ["OpenAI", "Node.js", "Automation"],
      icons: [SiOpenai, SiNodedotjs],
      githubUrl: "https://github.com/ablayaanonline",
      badge: "Personal Project",
    },
    {
      title: "Business Management Dashboard",
      description: "Comprehensive digital business management platform featuring real-time analytics, reporting, and resource planning tools.",
      tags: ["React", "Express", "PostgreSQL"],
      icons: [SiReact, SiExpress, SiPostgresql],
      githubUrl: "https://github.com/ablayaanonline",
      badge: "Personal Project",
    },
    {
      title: "Online Learning System",
      description: "Educational platform featuring structured courses, interactive quizzes, video hosting, and robust student performance tracking.",
      tags: ["Next.js", "TypeScript", "Supabase"],
      icons: [SiNextdotjs, SiTypescript, SiSupabase],
      githubUrl: "https://github.com/ablayaanonline",
      badge: "Personal Project",
    },
    {
      title: "AI Automation Platform",
      description: "End-to-end AI workflow automation platform that connects services, triggers actions, and eliminates repetitive manual tasks.",
      tags: ["OpenAI", "Python", "Node.js"],
      icons: [SiOpenai, SiPython, SiNodedotjs],
      githubUrl: "https://github.com/ablayaanonline",
      badge: "Personal Project",
    },
    {
      title: "Modern SaaS Dashboard",
      description: "Feature-rich SaaS admin dashboard with real-time data visualization, user management, billing integration, and dark mode.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      icons: [SiReact, SiTypescript, SiTailwindcss],
      githubUrl: "https://github.com/ablayaanonline",
      badge: "Personal Project",
    },
  ];

  return (
    <section id="projects" className="py-24 relative bg-card/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        {/* Live Websites */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-sm font-semibold uppercase tracking-widest text-primary mb-6 flex items-center gap-2"
        >
          <Globe className="w-4 h-4" /> Live Websites
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {realProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} delay={idx * 0.1} />
          ))}
        </div>

        {/* Personal Projects */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2"
        >
          <Star className="w-4 h-4" /> Personal Projects
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {demoProjects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} delay={idx * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
