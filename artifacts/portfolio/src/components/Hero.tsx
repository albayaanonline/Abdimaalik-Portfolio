import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";
import { SiReact, SiNodedotjs, SiTypescript, SiNextdotjs } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { downloadCV } from "@/utils/generateCV";

export default function Hero() {
  const roles = [
    "Full Stack Web Developer",
    "AI Automation Specialist",
    "Frontend Developer",
    "Backend Developer",
    "Problem Solver"
  ];
  
  const [currentRole, setCurrentRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    const handleTyping = () => {
      const fullRole = roles[roleIndex];
      
      if (!isDeleting) {
        setCurrentRole(fullRole.substring(0, currentRole.length + 1));
        setTypingSpeed(100);
        
        if (currentRole === fullRole) {
          setTypingSpeed(2000); // Pause at end of word
          setIsDeleting(true);
        }
      } else {
        setCurrentRole(fullRole.substring(0, currentRole.length - 1));
        setTypingSpeed(50);
        
        if (currentRole === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(500); // Pause before next word
        }
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentRole, isDeleting, roleIndex, typingSpeed, roles]);

  const floatingIcons = [
    { Icon: SiReact, color: "#61DAFB", delay: 0, x: -100, y: -50 },
    { Icon: SiNodedotjs, color: "#339933", delay: 1, x: 150, y: -100 },
    { Icon: SiTypescript, color: "#3178C6", delay: 2, x: 120, y: 120 },
    { Icon: SiNextdotjs, color: "#FFFFFF", delay: 3, x: -150, y: 100 },
  ];

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <ParticleCanvas />
      
      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute opacity-30"
            initial={{ x: item.x, y: item.y }}
            animate={{ 
              x: item.x + Math.sin(index) * 20, 
              y: item.y + Math.cos(index) * 20,
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: item.delay
            }}
          >
            <item.Icon size={40} color={item.color} />
          </motion.div>
        ))}
      </div>

      <div className="container relative z-20 mx-auto px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="relative mb-8 h-32 w-32 rounded-full p-1 bg-gradient-to-r from-primary to-secondary neon-glow">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-background">
              <span className="text-4xl font-bold text-gradient">AD</span>
            </div>
          </div>

          <motion.h1 
            className="mb-4 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Abdimaalik <span className="text-gradient">Developer</span>
          </motion.h1>

          <div className="mb-6 h-10">
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
              {currentRole}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 bg-primary ml-1 h-8 align-middle"
              />
            </h2>
          </div>

          <motion.p 
            className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Crafting high-performance digital experiences and intelligent automation systems. 
            I transform complex problems into elegant, scalable solutions.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={downloadCV}
              data-testid="button-download-cv"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-primary to-secondary px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:scale-105 neon-glow focus-visible:outline-none cursor-pointer"
            >
              Download CV
            </button>
            <a href="#contact" data-testid="link-contact-me" className="inline-flex h-12 items-center justify-center rounded-md border border-primary/50 bg-transparent px-8 text-sm font-medium text-primary shadow-sm transition-all hover:bg-primary/10 hover:border-primary focus-visible:outline-none">
              Contact Me
            </a>
            <a
              href="https://wa.me/252656042512?text=Hi%20Abdimaalik%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20work%20with%20you!"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-hero-whatsapp"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#25d366]/10 border border-[#25d366]/40 px-8 text-sm font-medium text-[#25d366] shadow-sm transition-all hover:bg-[#25d366]/20 hover:border-[#25d366] focus-visible:outline-none"
            >
              <FaWhatsapp size={18} /> WhatsApp
            </a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-current flex justify-center pt-1">
              <motion.div 
                className="w-1 h-2 bg-current rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}