import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";
import { FaWhatsapp, FaTelegram, FaLinkedin, FaGithub } from "react-icons/fa";
import { usePortfolioContent } from "@/lib/content";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function Contact() {
  const { content } = usePortfolioContent();
  const { email, whatsapp, whatsappDisplay, telegram, linkedin, github } = content.contact;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    toast.success("Message sent! I'll get back to you soon.");
    reset();
  };

  const contactMethods = [
    { icon: <Mail className="w-5 h-5" />, label: "Email", value: email, href: `mailto:${email}` },
    { icon: <FaWhatsapp className="w-5 h-5" />, label: "WhatsApp", value: whatsappDisplay, href: `https://wa.me/${whatsapp}?text=Hi%20Abdimaalik%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20work%20with%20you!` },
    { icon: <FaTelegram className="w-5 h-5" />, label: "Telegram", value: telegram, href: `https://t.me/${telegram.replace("@", "")}` },
    { icon: <FaLinkedin className="w-5 h-5" />, label: "LinkedIn", value: "Abdimaalik Hasan", href: linkedin },
    { icon: <FaGithub className="w-5 h-5" />, label: "GitHub", value: github.replace("https://github.com/", ""), href: github },
  ];

  return (
    <section id="contact" className="py-24 relative bg-card/40 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Have a project in mind? Let's build something amazing together. Feel free to reach out using the form below or via any of my social channels.
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-panel p-8 rounded-2xl h-full border border-white/5">
              <h3 className="text-2xl font-bold mb-8 text-gradient">Contact Information</h3>
              <div className="space-y-6">
                {contactMethods.map((method, idx) => (
                  <a
                    key={idx}
                    href={method.href}
                    className="flex items-center gap-4 group p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:neon-glow transition-all duration-300">
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{method.label}</div>
                      <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{method.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="glass-panel p-8 rounded-2xl border border-white/5 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full bg-background/50 border ${errors.name ? "border-destructive" : "border-white/10 focus:border-primary"} rounded-lg px-4 py-3 outline-none transition-colors text-foreground focus:ring-1 focus:ring-primary`}
                    placeholder="John Doe"
                  />
                  {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                    className={`w-full bg-background/50 border ${errors.email ? "border-destructive" : "border-white/10 focus:border-primary"} rounded-lg px-4 py-3 outline-none transition-colors text-foreground focus:ring-1 focus:ring-primary`}
                    placeholder="john@example.com"
                  />
                  {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <label htmlFor="subject" className="text-sm font-medium text-muted-foreground">Subject</label>
                <input
                  id="subject"
                  type="text"
                  {...register("subject", { required: "Subject is required" })}
                  className={`w-full bg-background/50 border ${errors.subject ? "border-destructive" : "border-white/10 focus:border-primary"} rounded-lg px-4 py-3 outline-none transition-colors text-foreground focus:ring-1 focus:ring-primary`}
                  placeholder="Project Inquiry"
                />
                {errors.subject && <span className="text-xs text-destructive">{errors.subject.message}</span>}
              </div>
              <div className="space-y-2 mb-8">
                <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  {...register("message", { required: "Message is required" })}
                  className={`w-full bg-background/50 border ${errors.message ? "border-destructive" : "border-white/10 focus:border-primary"} rounded-lg px-4 py-3 outline-none transition-colors text-foreground resize-none focus:ring-1 focus:ring-primary`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 h-14 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold text-lg shadow-lg hover:shadow-primary/25 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 neon-glow"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  <>Send Message <Send className="w-5 h-5 ml-1" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
