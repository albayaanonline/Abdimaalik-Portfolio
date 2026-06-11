import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

export default function SocialLinks() {
  const socials = [
    { icon: FaGithub, name: "GitHub", href: "#", color: "hover:text-[#ffffff] hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" },
    { icon: FaLinkedin, name: "LinkedIn", href: "#", color: "hover:text-[#0a66c2] hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)]" },
    { icon: FaTwitter, name: "Twitter/X", href: "#", color: "hover:text-[#1da1f2] hover:drop-shadow-[0_0_8px_rgba(29,161,242,0.8)]" },
    { icon: FaFacebook, name: "Facebook", href: "#", color: "hover:text-[#1877f2] hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.8)]" },
    { icon: FaInstagram, name: "Instagram", href: "#", color: "hover:text-[#e1306c] hover:drop-shadow-[0_0_8px_rgba(225,48,108,0.8)]" },
    { icon: FaTelegram, name: "Telegram", href: "#", color: "hover:text-[#0088cc] hover:drop-shadow-[0_0_8px_rgba(0,136,204,0.8)]" },
    { icon: FaWhatsapp, name: "WhatsApp", href: "#", color: "hover:text-[#25d366] hover:drop-shadow-[0_0_8px_rgba(37,211,102,0.8)]" },
  ];

  return (
    <section className="py-12 border-t border-white/5 bg-background overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {socials.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.href}
              className={`text-muted-foreground transition-all duration-300 transform hover:-translate-y-2 ${social.color}`}
              aria-label={social.name}
              whileHover={{ scale: 1.2 }}
            >
              <social.icon className="w-8 h-8 md:w-10 md:h-10" />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}