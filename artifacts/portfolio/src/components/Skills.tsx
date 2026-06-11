import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiSupabase, SiFirebase,
  SiVercel, SiNetlify, SiGithub, SiOpenai
} from "react-icons/si";
import { Monitor, Server, Database, Cloud, Bot, Wrench } from "lucide-react";

function ProgressBar({ name, percentage, delay }: { name: string, percentage: number, delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="mb-4" ref={ref}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Monitor className="w-5 h-5 text-primary" />,
      skills: [
        { name: "HTML5", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss },
        { name: "JavaScript", icon: SiJavascript },
        { name: "TypeScript", icon: SiTypescript },
        { name: "React", icon: SiReact },
        { name: "Next.js", icon: SiNextdotjs },
        { name: "Tailwind CSS", icon: SiTailwindcss },
      ]
    },
    {
      title: "Backend",
      icon: <Server className="w-5 h-5 text-primary" />,
      skills: [
        { name: "Node.js", icon: SiNodedotjs },
        { name: "Express", icon: SiExpress },
        { name: "REST APIs", icon: Server },
        { name: "Auth", icon: Server },
      ]
    },
    {
      title: "Database",
      icon: <Database className="w-5 h-5 text-primary" />,
      skills: [
        { name: "PostgreSQL", icon: SiPostgresql },
        { name: "Supabase", icon: SiSupabase },
        { name: "Firebase", icon: SiFirebase },
      ]
    },
    {
      title: "Cloud & Deployment",
      icon: <Cloud className="w-5 h-5 text-primary" />,
      skills: [
        { name: "Vercel", icon: SiVercel },
        { name: "Netlify", icon: SiNetlify },
        { name: "GitHub", icon: SiGithub },
        { name: "Replit", icon: Cloud },
      ]
    },
    {
      title: "AI & Automation",
      icon: <Bot className="w-5 h-5 text-primary" />,
      skills: [
        { name: "OpenAI", icon: SiOpenai },
        { name: "Make.com", icon: Bot },
        { name: "AI Agents", icon: Bot },
        { name: "Chatbots", icon: Bot },
      ]
    },
    {
      title: "Other",
      icon: <Wrench className="w-5 h-5 text-primary" />,
      skills: [
        { name: "UI/UX Design", icon: Wrench },
        { name: "SEO", icon: Wrench },
        { name: "Performance", icon: Wrench },
        { name: "Responsive", icon: Wrench },
      ]
    }
  ];

  const coreSkills = [
    { name: "React / Next.js", percentage: 90 },
    { name: "TypeScript", percentage: 85 },
    { name: "Node.js / Express", percentage: 80 },
    { name: "HTML / CSS / Tailwind", percentage: 95 },
    { name: "AI Integration", percentage: 75 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-card/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Technical Skills</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skillCategories.map((category, idx) => (
                <motion.div key={idx} variants={itemVariants} className="glass-panel p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    {category.icon}
                    <h3 className="text-lg font-semibold">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-sm hover:bg-secondary/20 transition-colors">
                        <skill.icon className="w-3.5 h-3.5" />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel p-8 rounded-xl h-full flex flex-col justify-center"
            >
              <h3 className="text-xl font-bold mb-6">Core Proficiency</h3>
              <div className="space-y-6">
                {coreSkills.map((skill, idx) => (
                  <ProgressBar key={idx} name={skill.name} percentage={skill.percentage} delay={0.2 + idx * 0.1} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}