import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import profilePhoto from "@assets/Screenshot_20260611_122114_Gallery(1)_1781169840829.jpg";

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

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function About() {
  const stats = [
    { label: "Years Experience", value: 3, plus: true },
    { label: "Projects Completed", value: 20, plus: true },
    { label: "Technologies", value: 10, plus: true },
    { label: "Countries Reached", value: 5, plus: true },
  ];

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
              Building the <span className="text-gradient">future</span> of web experiences.
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I am a passionate Full Stack Web Developer and AI Automation builder dedicated to crafting exceptional digital solutions. With a keen eye for design and a strong foundation in modern web technologies, I bridge the gap between aesthetics and functionality.
              </p>
              <p>
                My approach combines clean, efficient code with intuitive user interfaces. Whether it's a complex web application, a seamless API integration, or an AI-powered automation workflow, I thrive on turning ideas into reality.
              </p>
              <p>
                I believe in continuous learning and pushing the boundaries of what's possible on the web. Let's build something extraordinary together.
              </p>
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
                  <Counter from={0} to={stat.value} />
                  {stat.plus && "+"}
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