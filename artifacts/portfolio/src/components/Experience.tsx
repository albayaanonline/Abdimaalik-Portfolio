import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      title: "Freelance Web Developer",
      date: "2022 - Present",
      description: "Building responsive client websites and scalable web applications from scratch, focusing on performance and modern design principles."
    },
    {
      title: "AI Automation Projects",
      date: "2023 - Present",
      description: "Designing and deploying AI-powered workflow systems to streamline business operations and enhance customer interactions."
    },
    {
      title: "Personal Product Development",
      date: "2021 - Present",
      description: "Continuously building, iterating, and launching independent digital products to solve real-world problems and explore new technologies."
    },
    {
      title: "Open Source Contributions",
      date: "Ongoing",
      description: "Contributing to various developer tools and open source projects, collaborating with developers worldwide."
    }
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Center Line for desktop */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/0 origin-top -translate-x-1/2"
          />

          <div className="space-y-12">
            {experiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                  
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.2 + 0.5 }}
                    className="absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 -translate-x-1/2 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                  />

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block w-1/2" />

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 text-left"}`}
                  >
                    <div className="glass-panel p-6 rounded-xl hover:border-primary/30 transition-colors border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span className="text-sm font-mono text-primary mb-2 block">{exp.date}</span>
                      <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}