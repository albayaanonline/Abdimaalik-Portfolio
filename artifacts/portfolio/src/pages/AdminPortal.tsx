import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, Mail, Globe,
  Users, TrendingUp, Eye, Lock, LogOut, Shield
} from "lucide-react";

const ADMIN_PASSWORD = "abdimaalik2026";

const stats = [
  { label: "Live Projects", value: "2", icon: Globe, color: "text-primary" },
  { label: "Personal Projects", value: "6", icon: FolderOpen, color: "text-secondary" },
  { label: "Technologies", value: "20+", icon: TrendingUp, color: "text-green-400" },
  { label: "Messages", value: "0", icon: Mail, color: "text-yellow-400" },
];

const projects = [
  { name: "Albayaan Online", url: "https://albayaanonline.com", status: "Live" },
  { name: "Albayaan Pro", url: "https://albayaan.pro", status: "Live" },
  { name: "Quran Learning Platform", url: "#", status: "Personal" },
  { name: "AI WhatsApp Agent", url: "#", status: "Personal" },
  { name: "Business Management Dashboard", url: "#", status: "Personal" },
  { name: "Online Learning System", url: "#", status: "Personal" },
];

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white">Management Portal</h1>
          <p className="text-muted-foreground text-sm mt-1">Abdimaalik Developer — Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-muted-foreground mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-admin-password"
                placeholder="Enter admin password"
                className={`w-full bg-background/50 border ${error ? "border-red-500" : "border-white/10 focus:border-primary"} rounded-lg pl-10 pr-4 py-3 outline-none transition-colors text-foreground focus:ring-1 focus:ring-primary`}
              />
            </div>
            {error && <p className="text-red-400 text-xs mt-1">Incorrect password. Try again.</p>}
          </div>
          <button
            type="submit"
            data-testid="button-admin-login"
            className="w-full h-12 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-[1.02] transition-transform"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminPortal() {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-foreground">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-card/40 border-r border-white/5 backdrop-blur-sm z-10 hidden md:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 overflow-hidden">
              <img src="/profile-logo.jpg" alt="Admin" className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className="font-bold text-sm">Abdimaalik</div>
              <div className="text-xs text-primary">Administrator</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "projects", label: "Projects", icon: FolderOpen },
            { id: "messages", label: "Messages", icon: Mail },
            { id: "visitors", label: "Visitors", icon: Users },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              data-testid={`tab-admin-${item.id}`}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => setAuthenticated(false)}
            data-testid="button-admin-logout"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
          <a
            href="/"
            className="mt-1 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
          >
            <Eye className="w-4 h-4" /> View Portfolio
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 p-6 md:p-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "dashboard" && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground mb-8">Welcome back, Abdimaalik.</p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-card/40 border border-white/5 rounded-2xl p-6"
                  >
                    <s.icon className={`w-6 h-6 mb-3 ${s.color}`} />
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-card/40 border border-white/5 rounded-2xl p-6">
                <h2 className="font-bold mb-4">Quick Links</h2>
                <div className="flex flex-wrap gap-3">
                  <a href="https://albayaanonline.com" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm hover:bg-primary hover:text-primary-foreground transition-colors">
                    albayaanonline.com
                  </a>
                  <a href="https://albayaan.pro" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-secondary/10 text-secondary-foreground border border-secondary/20 text-sm hover:bg-secondary/30 transition-colors">
                    albayaan.pro
                  </a>
                  <a href="https://github.com/ablayaanonline" target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg bg-white/5 text-foreground border border-white/10 text-sm hover:bg-white/10 transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Projects</h1>
              <p className="text-muted-foreground mb-8">Manage your portfolio projects.</p>
              <div className="space-y-3">
                {projects.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center justify-between bg-card/40 border border-white/5 rounded-xl px-6 py-4 hover:border-primary/20 transition-colors"
                  >
                    <div>
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-muted-foreground">{p.url}</div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      p.status === "Live"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-secondary/10 text-muted-foreground border-secondary/20"
                    }`}>
                      {p.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "messages" && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Messages</h1>
              <p className="text-muted-foreground mb-8">Contact form submissions will appear here.</p>
              <div className="bg-card/40 border border-white/5 rounded-2xl p-12 text-center">
                <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No messages yet. When visitors send messages via your contact form, they will appear here.</p>
              </div>
            </div>
          )}

          {activeTab === "visitors" && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Visitors</h1>
              <p className="text-muted-foreground mb-8">Portfolio visitor analytics.</p>
              <div className="bg-card/40 border border-white/5 rounded-2xl p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Connect an analytics service (e.g. Vercel Analytics or Google Analytics) to see visitor data here.</p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
