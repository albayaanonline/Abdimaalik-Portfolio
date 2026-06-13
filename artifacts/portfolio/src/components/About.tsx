import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import profilePhoto from "@assets/Screenshot_20260611_122114_Gallery(1)_1781169840829.jpg";
import { usePortfolioContent } from "@/lib/content";

function Counter({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(ease * (to - from) + from));
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const { content } = usePortfolioContent();
  const { subtitle, bio, stats } = content.about;

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              {subtitle.includes("future") ? (
                <>Building the <span className="text-gradient">future</span> of web experiences.</>
              ) : (
                subtitle
              )}
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:hidden mb-8"
          >
            <div className="relative h-40 w-40 rounded-full p-1 bg-gradient-to-r from-primary to-secondary neon-glow">
              <div className="h-full w-full rounded-full overflow-hidden">
                <img
                  src={profilePhoto}
                  alt="Abdimaalik Hasan Mohamed"
                  data-testid="img-about-profile"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-panel p-6 rounded-xl text-center flex flex-col justify-center border border-white/5 hover:border-primary/30 transition-colors"
              >
                <div className="text-4xl font-bold text-gradient mb-2">
                  <Counter from={0} to={stat.value} />+
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
