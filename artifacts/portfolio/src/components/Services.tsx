import { motion } from "framer-motion";
import { Monitor, Bot, LayoutDashboard, Plug, GraduationCap, Lightbulb } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Building modern, fast, and responsive websites and web applications using the latest technologies like React and Next.js.",
      icon: <Monitor className="w-8 h-8 text-primary" />
    },
    {
      title: "AI Automation",
      description: "Creating intelligent AI-powered systems and automated workflows to save time and boost business efficiency.",
      icon: <Bot className="w-8 h-8 text-primary" />
    },
    {
      title: "Custom Dashboards",
      description: "Designing and developing comprehensive admin panels and business management systems tailored to your needs.",
      icon: <LayoutDashboard className="w-8 h-8 text-primary" />
    },
    {
      title: "API Integration",
      description: "Seamlessly connecting third-party services, platforms, and databases to unify your digital ecosystem.",
      icon: <Plug className="w-8 h-8 text-primary" />
    },
    {
      title: "Educational Platforms",
      description: "Building robust learning management systems (LMS) and online education products with progress tracking.",
      icon: <GraduationCap className="w-8 h-8 text-primary" />
    },
    {
      title: "Technical Consulting",
      description: "Helping businesses make informed decisions about technology stacks, architecture, and digital strategy.",
      icon: <Lightbulb className="w-8 h-8 text-primary" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What I Do</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="glass-panel p-8 rounded-2xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-background border border-primary/20 group-hover:border-primary/50 group-hover:neon-glow transition-all duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}