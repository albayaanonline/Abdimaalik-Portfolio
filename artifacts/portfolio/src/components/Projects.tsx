import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiReact, SiNodedotjs, SiPostgresql, SiOpenai,
  SiExpress, SiNextdotjs, SiTypescript, SiSupabase,
  SiTailwindcss, SiPython
} from "react-icons/si";
import { ExternalLink, Github, Globe, Star, ImageOff } from "lucide-react";
import { usePortfolioContent, EditableProject } from "@/lib/content";

type IconComponent = React.ComponentType<{ className?: string }>;

const TAG_ICON_MAP: Record<string, IconComponent> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  "PostgreSQL": SiPostgresql,
  "Supabase": SiSupabase,
  "OpenAI": SiOpenai,
  "Python": SiPython,
  "Tailwind CSS": SiTailwindcss,
};

function getIconsForTags(tags: string[]): IconComponent[] {
  const found: IconComponent[] = [];
  for (const tag of tags) {
    const Icon = TAG_ICON_MAP[tag];
    if (Icon && !found.includes(Icon)) found.push(Icon);
    if (found.length >= 3) break;
  }
  if (found.length === 0) return [SiReact];
  return found;
}

function ProjectImage({
  screenshotUrl,
  title,
  icons,
  isLive,
}: {
  screenshotUrl?: string;
  title: string;
  icons: IconComponent[];
  isLive?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-48 w-full bg-gradient-to-br from-background via-muted to-background relative overflow-hidden flex items-center justify-center border-b border-white/5 group-hover:border-primary/20">
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

      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

      {isLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-primary/20 border border-primary/40 text-primary text-xs font-semibold px-2 py-1 rounded-full z-10">
          <Globe className="w-3 h-3" /> Live
        </div>
      )}
      {!isLive && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-secondary/10 border border-secondary/20 text-muted-foreground text-xs font-medium px-2 py-1 rounded-full z-10">
          <Star className="w-3 h-3" /> Personal
        </div>
      )}
      {screenshotUrl && imgError && (
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-card/60 border border-white/10 text-muted-foreground text-xs px-2 py-1 rounded-full z-10">
          <ImageOff className="w-3 h-3" /> Preview unavailable
        </div>
      )}

      <div className={`flex gap-6 z-10 transform transition-all duration-500 ${screenshotUrl && !imgError ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100" : "group-hover:scale-110"}`}>
        {icons.map((Icon, iIdx) => (
          <Icon key={iIdx} className="w-16 h-16 text-primary/60 group-hover:text-primary transition-colors duration-500 drop-shadow-lg" />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project, delay }: { project: EditableProject; delay: number }) {
  const icons = getIconsForTags(project.tags);

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
        icons={icons}
        isLive={project.isLive}
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
            href={project.githubUrl || "https://github.com/ablayaanonline"}
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
  const { content } = usePortfolioContent();
  const liveProjects = content.projects.filter((p) => p.isLive);
  const personalProjects = content.projects.filter((p) => !p.isLive);

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

        {liveProjects.length > 0 && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-widest text-primary mb-6 flex items-center gap-2"
            >
              <Globe className="w-4 h-4" /> Live Websites
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              {liveProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} delay={idx * 0.1} />
              ))}
            </div>
          </>
        )}

        {personalProjects.length > 0 && (
          <>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2"
            >
              <Star className="w-4 h-4" /> Personal Projects
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {personalProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} delay={idx * 0.08} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
