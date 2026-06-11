import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Github, GitCommit, GitPullRequest, Repository } from "lucide-react";

export default function GitHub() {
  const languageData = [
    { name: "JavaScript", value: 40, color: "#f7df1e" },
    { name: "TypeScript", value: 25, color: "#3178c6" },
    { name: "CSS", value: 20, color: "#264de4" },
    { name: "Python", value: 15, color: "#3776ab" },
  ];

  // Generate a mock contribution grid (52 columns x 7 rows)
  const generateGrid = () => {
    const weeks = [];
    for (let i = 0; i < 52; i++) {
      const days = [];
      for (let j = 0; j < 7; j++) {
        // Randomly assign contribution levels (0 to 4)
        // Bias towards lower numbers for realistic look
        const rand = Math.random();
        let level = 0;
        if (rand > 0.9) level = 4;
        else if (rand > 0.75) level = 3;
        else if (rand > 0.6) level = 2;
        else if (rand > 0.4) level = 1;

        days.push(level);
      }
      weeks.push(days);
    }
    return weeks;
  };

  const contributionGrid = generateGrid();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4: return "bg-primary shadow-[0_0_5px_rgba(0,240,255,0.8)]";
      case 3: return "bg-primary/80";
      case 2: return "bg-primary/50";
      case 1: return "bg-primary/20";
      default: return "bg-white/5";
    }
  };

  return (
    <section id="github" className="py-24 relative bg-card/20 border-y border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center gap-3">
            <Github className="w-8 h-8" /> GitHub Activity
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass-panel p-6 rounded-xl flex items-center justify-between border-primary/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Username</div>
                  <div className="font-bold font-mono">abdimaalik-dev</div>
                </div>
              </div>
              <a href="#" className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors">
                Follow
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center text-center">
                <GitCommit className="w-6 h-6 text-secondary mb-2" />
                <div className="text-2xl font-bold text-gradient">500+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Contributions</div>
              </div>
              <div className="glass-panel p-6 rounded-xl flex flex-col items-center justify-center text-center">
                <GitPullRequest className="w-6 h-6 text-primary mb-2" />
                <div className="text-2xl font-bold text-gradient">30+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Repositories</div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-xl h-64 flex flex-col">
              <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wider">Top Languages</h3>
              <div className="flex-grow w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={languageData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                      formatter={(value: number) => [`${value}%`, 'Usage']}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                      {languageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 glass-panel p-8 rounded-xl flex flex-col justify-center"
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Contribution Activity
            </h3>
            
            <div className="overflow-x-auto pb-4 custom-scrollbar">
              <div className="inline-flex gap-1 min-w-max">
                {contributionGrid.map((week, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1">
                    {week.map((level, dIdx) => (
                      <motion.div 
                        key={dIdx} 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.2, delay: (wIdx * 0.01) + (dIdx * 0.01) }}
                        className={`w-3 h-3 rounded-[2px] ${getLevelColor(level)}`}
                        title={`Contribution level: ${level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="w-3 h-3 rounded-[2px] bg-white/5"></div>
              <div className="w-3 h-3 rounded-[2px] bg-primary/20"></div>
              <div className="w-3 h-3 rounded-[2px] bg-primary/50"></div>
              <div className="w-3 h-3 rounded-[2px] bg-primary/80"></div>
              <div className="w-3 h-3 rounded-[2px] bg-primary shadow-[0_0_5px_rgba(0,240,255,0.8)]"></div>
              <span>More</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}