import { motion } from "framer-motion";
import { 
  SiReact, SiNodedotjs, SiPostgresql, SiOpenai, 
  SiExpress, SiNextdotjs, SiTypescript, SiSupabase 
} from "react-icons/si";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Quran Learning Platform",
      description: "Interactive Quran learning platform with real-time progress tracking, student dashboards, and a modern, accessible user experience.",
      tags: ["React", "Node.js", "PostgreSQL"],
      icons: [SiReact, SiNodedotjs, SiPostgresql]
    },
    {
      title: "AI WhatsApp Agent",
      description: "An intelligent WhatsApp assistant capable of answering customer messages, handling inquiries, and automating conversational workflows.",
      tags: ["OpenAI", "Node.js", "Make.com"],
      icons: [SiOpenai, SiNodedotjs]
    },
    {
      title: "Business Management System",
      description: "Comprehensive digital business management platform featuring real-time analytics, reporting, and resource planning.",
      tags: ["React", "Express", "PostgreSQL"],
      icons: [SiReact, SiExpress, SiPostgresql]
    },
    {
      title: "Online Learning Platform",
      description: "Educational platform featuring structured courses, interactive quizzes, video hosting, and robust student performance tracking.",
      tags: ["Next.js", "TypeScript", "Supabase"],
      icons: [SiNextdotjs, SiTypescript, SiSupabase]
    }
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-primary/40 transition-all duration-300"
            >
              <div className="h-48 w-full bg-gradient-to-br from-background via-muted to-background relative overflow-hidden flex items-center justify-center border-b border-white/5 group-hover:border-primary/20">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="flex gap-6 z-10 transform group-hover:scale-110 transition-transform duration-500">
                  {project.icons.map((Icon, iIdx) => (
                    <Icon key={iIdx} className="w-16 h-16 text-primary/40 group-hover:text-primary transition-colors duration-500 drop-shadow-lg" />
                  ))}
                </div>
              </div>
              
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
                  <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-colors font-medium text-sm">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 h-10 rounded-md bg-white/5 text-foreground border border-white/10 hover:bg-white/10 transition-colors font-medium text-sm">
                    <Github className="w-4 h-4" /> GitHub
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}