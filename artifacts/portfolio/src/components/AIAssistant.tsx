import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Minimize2 } from "lucide-react";

type Message = { role: "user" | "bot"; text: string };

const SUGGESTIONS = [
  "What services do you offer?",
  "How can I contact you?",
  "Show me your projects",
  "What technologies do you use?",
  "Are you available for hire?",
];

function getBotReply(input: string): string {
  const q = input.toLowerCase();

  if (q.match(/service|what do you do|offer|help/)) {
    return "I offer: Web Development, AI Automation, Custom Dashboards, API Integration, Educational Platforms, and Technical Consulting. Which one interests you most?";
  }
  if (q.match(/contact|email|reach|whatsapp|message/)) {
    return "You can reach Abdimaalik at:\n📧 Adbulmaalikhasanmohamed@gmail.com\n📱 WhatsApp: +252 656 042 512\n\nOr scroll down to the Contact section to send a message directly!";
  }
  if (q.match(/project|work|portfolio|built|albayaan/)) {
    return "Abdimaalik has built:\n🌐 albayaanonline.com — Islamic & educational platform\n🌐 albayaan.pro — Advanced digital services platform\n\nPlus personal projects in AI, education, and SaaS. Check the Projects section!";
  }
  if (q.match(/tech|stack|language|skill|react|node|typescript/)) {
    return "Abdimaalik works with:\n⚡ Frontend: React, Next.js, TypeScript, Tailwind CSS\n🔧 Backend: Node.js, Express, REST APIs\n🗄️ Database: PostgreSQL, Supabase, Firebase\n🤖 AI: OpenAI, Make.com, AI Agents";
  }
  if (q.match(/hire|available|freelance|work together|price|cost/)) {
    return "Yes! Abdimaalik is available for freelance projects. To discuss your project, reach out via WhatsApp (+252 656 042 512) or use the Contact form on this page.";
  }
  if (q.match(/github|code|open source/)) {
    return "You can find Abdimaalik's code on GitHub:\n👉 github.com/ablayaanonline";
  }
  if (q.match(/experience|year|background|about/)) {
    return "Abdimaalik is a Full Stack Web Developer & AI Automation Builder with 3+ years of experience, 20+ projects completed, working with clients from 5+ countries.";
  }
  if (q.match(/ai|automation|chatbot|workflow/)) {
    return "Abdimaalik specializes in AI automation: building chatbots, WhatsApp AI agents, Make.com workflows, and OpenAI-powered tools. Need something automated? Let's talk!";
  }
  if (q.match(/hello|hi|hey|salaam|salam/)) {
    return "Salaam! 👋 I'm Abdimaalik's AI assistant. I can help you learn about his services, projects, or how to get in touch. What would you like to know?";
  }
  if (q.match(/thank|thanks|great|good|nice/)) {
    return "You're welcome! 😊 Feel free to ask anything else, or scroll to the Contact section to start a project with Abdimaalik.";
  }
  return "Great question! For detailed information, I recommend scrolling through the portfolio sections or contacting Abdimaalik directly:\n📧 Adbulmaalikhasanmohamed@gmail.com\n📱 WhatsApp: +252 656 042 512";
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Salaam! 👋 I'm Abdimaalik's AI assistant. Ask me anything about his services, projects, or how to get in touch!" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const reply = getBotReply(text);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setTyping(false);
    }, 800 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen(true)}
        data-testid="button-ai-assistant"
        aria-label="Open AI Assistant"
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30 flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform ${open ? "hidden" : "flex"}`}
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 3, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot size={24} />
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-background animate-pulse" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] max-w-[calc(100vw-24px)] rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10"
            style={{ maxHeight: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-secondary">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">AI Assistant</div>
                  <div className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" /> Online
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(false)}
                  data-testid="button-ai-minimize"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Minimize"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  data-testid="button-ai-close"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col bg-[#0a0f1e] overflow-y-auto" style={{ height: "320px" }}>
              <div className="flex-1 p-4 space-y-3 overflow-y-auto">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-primary to-secondary text-white rounded-tr-sm"
                          : "bg-card/80 border border-white/10 text-foreground rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}

                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-card/80 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-primary block"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Suggestions */}
            <div className="px-3 py-2 bg-[#0d1226] border-t border-white/5 overflow-x-auto">
              <div className="flex gap-2 w-max">
                {SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    data-testid={`button-suggestion-${i}`}
                    className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex items-center gap-2 px-4 py-3 bg-[#0d1226] border-t border-white/10"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                data-testid="input-ai-message"
                placeholder="Ask me anything..."
                className="flex-1 bg-background/50 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                data-testid="button-ai-send"
                disabled={!input.trim() || typing}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-40 disabled:hover:scale-100"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
