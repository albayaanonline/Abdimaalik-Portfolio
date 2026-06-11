import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaApi, scrollNext]);

  const testimonials = [
    {
      text: "Abdimaalik delivered exceptional work on our web platform. His attention to detail and proactive problem-solving made the project a huge success. Highly professional!",
      author: "Client A",
      role: "CEO, TechStartup",
      initials: "CA"
    },
    {
      text: "The AI automation system he built saved us hours every week. Brilliant work bridging complex APIs with an intuitive interface. I couldn't be happier.",
      author: "Client B",
      role: "Founder, InnovateCorp",
      initials: "CB"
    },
    {
      text: "Outstanding developer with great communication and technical skills. He understood our requirements immediately and delivered beyond expectations.",
      author: "Client C",
      role: "Product Manager",
      initials: "CC"
    }
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Feedback</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, idx) => (
                <div key={idx} className="flex-[0_0_100%] min-w-0 pl-4 pr-4">
                  <div className="glass-panel p-10 md:p-14 rounded-3xl relative border border-white/10 mx-2">
                    <Quote className="absolute top-6 left-6 w-12 h-12 text-primary/20" />
                    
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      <p className="text-lg md:text-xl font-medium text-foreground mb-8 italic">
                        "{t.text}"
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-background">
                          {t.initials}
                        </div>
                        <div className="text-left">
                          <div className="font-bold text-foreground">{t.author}</div>
                          <div className="text-sm text-muted-foreground">{t.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                className="w-2 h-2 rounded-full bg-white/20 transition-all hover:bg-primary"
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}