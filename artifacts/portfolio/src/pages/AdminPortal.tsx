import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FolderOpen, Mail, Users, Globe,
  Shield, LogOut, Eye, Plus, Trash2, Save, Settings,
  User, Code2, Phone, RefreshCw, ChevronDown, ChevronUp,
  GripVertical, CheckCircle2, Reply, MailOpen, Loader2, AlertCircle
} from "lucide-react";
import { usePortfolioContent, DEFAULT_CONTENT, EditableProject, PortfolioContent } from "@/lib/content";

/* ─── TYPES ─── */
type Message = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

/* ─── MESSAGES VIEWER ─── */
const API_BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

function MessagesViewer({ adminSecret }: { adminSecret: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const headers = { Authorization: `Bearer ${adminSecret}`, "Content-Type": "application/json" };

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/messages`, { headers });
      if (!res.ok) throw new Error(res.status === 401 ? "Wrong admin password" : "Server error");
      const data = await res.json() as Message[];
      setMessages(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminSecret]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const markRead = async (id: number) => {
    try {
      await fetch(`${API_BASE}/api/messages?id=${id}`, { method: "PATCH", headers });
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, isRead: true } : m)));
    } catch { /* ignore */ }
  };

  const deleteMsg = async (id: number) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await fetch(`${API_BASE}/api/messages?id=${id}`, { method: "DELETE", headers });
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (expanded === id) setExpanded(null);
    } catch { /* ignore */ }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (loading) return (
    <div className="flex items-center justify-center py-20 text-muted-foreground">
      <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading messages...
    </div>
  );

  if (error) return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center">
      <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
      <p className="text-red-400 font-medium">{error}</p>
      <button onClick={fetchMessages} className="mt-3 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition-colors">
        Try Again
      </button>
    </div>
  );

  if (messages.length === 0) return (
    <div className="bg-card/40 border border-white/5 rounded-2xl p-12 text-center">
      <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">No messages yet. When visitors send messages, they appear here.</p>
      <button onClick={fetchMessages} className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm mx-auto hover:bg-primary/20 transition-colors">
        <RefreshCw className="w-3.5 h-3.5" /> Refresh
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/30">
              {unreadCount} new
            </span>
          )}
          <span className="text-sm text-muted-foreground">{messages.length} total</span>
        </div>
        <button onClick={fetchMessages}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-muted-foreground text-xs hover:bg-white/10 transition-colors">
          <RefreshCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      <div className="space-y-3">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border overflow-hidden transition-colors ${
              msg.isRead ? "bg-card/30 border-white/5" : "bg-primary/5 border-primary/20"
            }`}
          >
            {/* Header row */}
            <button
              onClick={() => {
                setExpanded(expanded === msg.id ? null : msg.id);
                if (!msg.isRead) markRead(msg.id);
              }}
              className="w-full flex items-start justify-between px-5 py-4 text-left hover:bg-white/3 transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${msg.isRead ? "bg-muted-foreground/30" : "bg-primary"}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{msg.name}</span>
                    <span className="text-muted-foreground text-xs">{msg.email}</span>
                  </div>
                  <div className="text-sm text-foreground/80 truncate">{msg.subject}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {new Date(msg.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
              {expanded === msg.id ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />}
            </button>

            {/* Expanded message */}
            <AnimatePresence>
              {expanded === msg.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 border-t border-white/5">
                    <div className="mt-4 bg-background/50 rounded-xl p-4 text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </div>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:scale-[1.02] transition-transform"
                      >
                        <Reply className="w-3.5 h-3.5" /> Reply via Email
                      </a>
                      {!msg.isRead && (
                        <button onClick={() => markRead(msg.id)}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-foreground border border-white/10 text-sm hover:bg-white/10 transition-colors">
                          <MailOpen className="w-3.5 h-3.5" /> Mark as Read
                        </button>
                      )}
                      <button onClick={() => deleteMsg(msg.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 text-sm hover:bg-red-500/20 transition-colors ml-auto">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const { content } = usePortfolioContent();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === content.adminPassword) {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className={`w-full bg-background/50 border ${error ? "border-red-500" : "border-white/10 focus:border-primary"} rounded-lg px-4 py-3 outline-none transition-colors text-foreground focus:ring-1 focus:ring-primary`}
            />
            {error && <p className="text-red-400 text-xs mt-1">Incorrect password. Try again.</p>}
          </div>
          <button type="submit" className="w-full h-12 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:scale-[1.02] transition-transform">
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5 mt-6">
      {saved && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
          className="flex items-center gap-2 text-green-400 text-sm">
          <CheckCircle2 className="w-4 h-4" /> Saved successfully
        </motion.div>
      )}
      <button onClick={onSave}
        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:scale-[1.02] transition-transform">
        <Save className="w-4 h-4" /> Save Changes
      </button>
    </div>
  );
}

function FieldInput({ label, value, onChange, multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  const cls = "w-full bg-background/50 border border-white/10 focus:border-primary rounded-lg px-4 py-2.5 outline-none transition-colors text-foreground text-sm focus:ring-1 focus:ring-primary";
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} placeholder={placeholder} className={`${cls} resize-y`} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}

/* ─── HERO EDITOR ─── */
function HeroEditor() {
  const { content, updateContent } = usePortfolioContent();
  const [draft, setDraft] = useState(content.hero);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateContent({ ...content, hero: draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateRole = (idx: number, val: string) =>
    setDraft({ ...draft, roles: draft.roles.map((r, i) => (i === idx ? val : r)) });
  const addRole = () => setDraft({ ...draft, roles: [...draft.roles, "New Role"] });
  const removeRole = (idx: number) => setDraft({ ...draft, roles: draft.roles.filter((_, i) => i !== idx) });

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Edit Hero Section</h2>
      <FieldInput label="Your Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} placeholder="Abdimaalik Developer" />
      <FieldInput label="Tagline / Description" value={draft.tagline} onChange={(v) => setDraft({ ...draft, tagline: v })} multiline placeholder="Describe yourself..." />

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Roles (typewriter)</label>
          <button onClick={addRole} className="flex items-center gap-1 text-xs text-primary hover:underline">
            <Plus className="w-3 h-3" /> Add Role
          </button>
        </div>
        <div className="space-y-2">
          {draft.roles.map((role, idx) => (
            <div key={idx} className="flex gap-2">
              <input value={role} onChange={(e) => updateRole(idx, e.target.value)}
                className="flex-1 bg-background/50 border border-white/10 focus:border-primary rounded-lg px-4 py-2 outline-none text-sm text-foreground" />
              <button onClick={() => removeRole(idx)} disabled={draft.roles.length <= 1}
                className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center disabled:opacity-30">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

/* ─── ABOUT EDITOR ─── */
function AboutEditor() {
  const { content, updateContent } = usePortfolioContent();
  const [draft, setDraft] = useState(content.about);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateContent({ ...content, about: draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateBio = (idx: number, val: string) =>
    setDraft({ ...draft, bio: draft.bio.map((b, i) => (i === idx ? val : b)) });
  const addBio = () => setDraft({ ...draft, bio: [...draft.bio, "New paragraph..."] });
  const removeBio = (idx: number) => setDraft({ ...draft, bio: draft.bio.filter((_, i) => i !== idx) });

  const updateStat = (idx: number, field: "label" | "value", val: string) =>
    setDraft({
      ...draft,
      stats: draft.stats.map((s, i) => (i === idx ? { ...s, [field]: field === "value" ? Number(val) : val } : s)),
    });

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Edit About Section</h2>
      <FieldInput label="Subtitle" value={draft.subtitle} onChange={(v) => setDraft({ ...draft, subtitle: v })} />

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bio Paragraphs</label>
          <button onClick={addBio} className="flex items-center gap-1 text-xs text-primary hover:underline">
            <Plus className="w-3 h-3" /> Add Paragraph
          </button>
        </div>
        <div className="space-y-2">
          {draft.bio.map((para, idx) => (
            <div key={idx} className="flex gap-2 items-start">
              <textarea value={para} onChange={(e) => updateBio(idx, e.target.value)} rows={3}
                className="flex-1 bg-background/50 border border-white/10 focus:border-primary rounded-lg px-4 py-2 outline-none text-sm text-foreground resize-y" />
              <button onClick={() => removeBio(idx)} disabled={draft.bio.length <= 1}
                className="mt-1 w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center disabled:opacity-30">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Stats</label>
        <div className="grid grid-cols-2 gap-3">
          {draft.stats.map((stat, idx) => (
            <div key={idx} className="bg-card/40 border border-white/5 rounded-xl p-3 space-y-2">
              <input value={stat.label} onChange={(e) => updateStat(idx, "label", e.target.value)} placeholder="Label"
                className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none text-foreground" />
              <input type="number" value={stat.value} onChange={(e) => updateStat(idx, "value", e.target.value)} placeholder="Number"
                className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none text-foreground" />
            </div>
          ))}
        </div>
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

/* ─── CONTACT EDITOR ─── */
function ContactEditor() {
  const { content, updateContent } = usePortfolioContent();
  const [draft, setDraft] = useState(content.contact);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateContent({ ...content, contact: draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Edit Contact Info</h2>
      <FieldInput label="Email" value={draft.email} onChange={(v) => setDraft({ ...draft, email: v })} placeholder="your@email.com" />
      <FieldInput label="WhatsApp Number (digits only, e.g. 252656042512)" value={draft.whatsapp} onChange={(v) => setDraft({ ...draft, whatsapp: v })} placeholder="252656042512" />
      <FieldInput label="WhatsApp Display Text" value={draft.whatsappDisplay} onChange={(v) => setDraft({ ...draft, whatsappDisplay: v })} placeholder="+252 656 042 512" />
      <FieldInput label="Telegram Username (with @)" value={draft.telegram} onChange={(v) => setDraft({ ...draft, telegram: v })} placeholder="@username" />
      <FieldInput label="LinkedIn URL" value={draft.linkedin} onChange={(v) => setDraft({ ...draft, linkedin: v })} placeholder="https://linkedin.com/in/..." />
      <FieldInput label="GitHub URL" value={draft.github} onChange={(v) => setDraft({ ...draft, github: v })} placeholder="https://github.com/..." />
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

/* ─── SKILLS EDITOR ─── */
function SkillsEditor() {
  const { content, updateContent } = usePortfolioContent();
  const [draft, setDraft] = useState(content.skills);
  const [saved, setSaved] = useState(false);

  const save = () => {
    updateContent({ ...content, skills: draft });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSkill = (idx: number, field: "name" | "percentage", val: string) =>
    setDraft({
      ...draft,
      core: draft.core.map((s, i) => (i === idx ? { ...s, [field]: field === "percentage" ? Math.min(100, Math.max(0, Number(val))) : val } : s)),
    });

  const addSkill = () => setDraft({ ...draft, core: [...draft.core, { name: "New Skill", percentage: 70 }] });
  const removeSkill = (idx: number) => setDraft({ ...draft, core: draft.core.filter((_, i) => i !== idx) });

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Edit Skills</h2>
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Core Proficiency</label>
        <button onClick={addSkill} className="flex items-center gap-1 text-xs text-primary hover:underline">
          <Plus className="w-3 h-3" /> Add Skill
        </button>
      </div>
      <div className="space-y-3">
        {draft.core.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-card/40 border border-white/5 rounded-xl p-3">
            <div className="flex-1 space-y-1">
              <input value={skill.name} onChange={(e) => updateSkill(idx, "name", e.target.value)}
                className="w-full bg-background/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none text-foreground" />
              <div className="flex items-center gap-2">
                <input type="range" min={0} max={100} value={skill.percentage}
                  onChange={(e) => updateSkill(idx, "percentage", e.target.value)}
                  className="flex-1 accent-primary" />
                <span className="text-xs text-muted-foreground w-8 text-right">{skill.percentage}%</span>
              </div>
            </div>
            <button onClick={() => removeSkill(idx)} disabled={draft.core.length <= 1}
              className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center disabled:opacity-30">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <SaveBar onSave={save} saved={saved} />
    </div>
  );
}

/* ─── PROJECTS EDITOR ─── */
function ProjectForm({ project, onSave, onDelete }: {
  project: EditableProject;
  onSave: (p: EditableProject) => void;
  onDelete: () => void;
}) {
  const [draft, setDraft] = useState(project);
  const [open, setOpen] = useState(false);

  const set = (field: keyof EditableProject, val: unknown) => setDraft({ ...draft, [field]: val });

  return (
    <div className="bg-card/40 border border-white/5 hover:border-primary/20 rounded-xl overflow-hidden transition-colors">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left">
        <div className="flex items-center gap-3">
          <GripVertical className="w-4 h-4 text-muted-foreground" />
          <div>
            <div className="font-semibold text-sm">{draft.title}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              <span className={`px-2 py-0.5 rounded-full ${draft.isLive ? "bg-green-500/10 text-green-400" : "bg-secondary/10 text-muted-foreground"}`}>
                {draft.isLive ? "Live" : "Personal"}
              </span>
            </div>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
              <FieldInput label="Title" value={draft.title} onChange={(v) => set("title", v)} />
              <FieldInput label="Description" value={draft.description} onChange={(v) => set("description", v)} multiline />
              <FieldInput label="Tags (comma separated)" value={draft.tags.join(", ")}
                onChange={(v) => set("tags", v.split(",").map((t) => t.trim()).filter(Boolean))} placeholder="React, Node.js, TypeScript" />
              <FieldInput label="Live URL (leave empty if none)" value={draft.liveUrl} onChange={(v) => set("liveUrl", v)} placeholder="https://example.com" />
              <FieldInput label="GitHub URL" value={draft.githubUrl} onChange={(v) => set("githubUrl", v)} placeholder="https://github.com/..." />
              <FieldInput label="Screenshot URL (leave empty for auto)" value={draft.screenshotUrl} onChange={(v) => set("screenshotUrl", v)} placeholder="https://image.thum.io/get/..." />

              <div className="flex items-center gap-3">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Type:</label>
                <button onClick={() => set("isLive", true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${draft.isLive ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-white/5 text-muted-foreground border-white/10"}`}>
                  Live Website
                </button>
                <button onClick={() => set("isLive", false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${!draft.isLive ? "bg-primary/20 text-primary border-primary/30" : "bg-white/5 text-muted-foreground border-white/10"}`}>
                  Personal Project
                </button>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => { onSave(draft); setOpen(false); }}
                  className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold hover:scale-[1.02] transition-transform">
                  <Save className="w-3.5 h-3.5" /> Save Project
                </button>
                <button onClick={onDelete}
                  className="w-9 h-9 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 flex items-center justify-center transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectsEditor() {
  const { content, updateContent } = usePortfolioContent();
  const [projects, setProjects] = useState<EditableProject[]>(content.projects);
  const [saved, setSaved] = useState(false);

  const saveProject = (updated: EditableProject) => {
    const next = projects.map((p) => (p.id === updated.id ? updated : p));
    setProjects(next);
    updateContent({ ...content, projects: next });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const deleteProject = (id: string) => {
    const next = projects.filter((p) => p.id !== id);
    setProjects(next);
    updateContent({ ...content, projects: next });
  };

  const addProject = () => {
    const newProject: EditableProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Describe your project here...",
      tags: ["React"],
      liveUrl: "",
      githubUrl: "https://github.com/ablayaanonline",
      screenshotUrl: "",
      isLive: false,
    };
    const next = [...projects, newProject];
    setProjects(next);
    updateContent({ ...content, projects: next });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Edit Projects</h2>
        <button onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary border border-primary/20 text-sm font-medium hover:bg-primary hover:text-white transition-colors">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>
      {saved && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="flex items-center gap-2 text-green-400 text-sm mb-4">
          <CheckCircle2 className="w-4 h-4" /> Saved
        </motion.div>
      )}
      <div className="space-y-3">
        {projects.map((project) => (
          <ProjectForm key={project.id} project={project}
            onSave={saveProject} onDelete={() => deleteProject(project.id)} />
        ))}
      </div>
      {projects.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <FolderOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p>No projects yet. Add your first project above.</p>
        </div>
      )}
    </div>
  );
}

/* ─── SETTINGS EDITOR ─── */
function SettingsEditor() {
  const { content, updateContent, resetContent } = usePortfolioContent();
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passError, setPassError] = useState("");
  const [passSaved, setPassSaved] = useState(false);

  const changePassword = () => {
    if (newPass.length < 6) return setPassError("Password must be at least 6 characters.");
    if (newPass !== confirmPass) return setPassError("Passwords do not match.");
    updateContent({ ...content, adminPassword: newPass });
    setNewPass("");
    setConfirmPass("");
    setPassError("");
    setPassSaved(true);
    setTimeout(() => setPassSaved(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure? This will reset ALL portfolio content to defaults.")) {
      resetContent();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Settings</h2>
      <div className="bg-card/40 border border-white/5 rounded-2xl p-6 mb-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Change Admin Password</h3>
        <div className="space-y-3">
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)}
            placeholder="New password" className="w-full bg-background/50 border border-white/10 focus:border-primary rounded-lg px-4 py-2.5 outline-none text-sm text-foreground" />
          <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Confirm new password" className="w-full bg-background/50 border border-white/10 focus:border-primary rounded-lg px-4 py-2.5 outline-none text-sm text-foreground" />
          {passError && <p className="text-red-400 text-xs">{passError}</p>}
          {passSaved && <p className="text-green-400 text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Password changed!</p>}
          <button onClick={changePassword} className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold">
            <Save className="w-4 h-4" /> Update Password
          </button>
        </div>
      </div>
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
        <h3 className="font-semibold mb-2 text-red-400 flex items-center gap-2"><RefreshCw className="w-4 h-4" /> Reset All Content</h3>
        <p className="text-muted-foreground text-sm mb-4">This will reset all portfolio content back to the original defaults. This cannot be undone.</p>
        <button onClick={handleReset} className="px-5 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 text-sm font-semibold transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}

/* ─── SIDEBAR TABS ─── */
const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "hero", label: "Edit Hero", icon: User },
  { id: "about", label: "Edit About", icon: User },
  { id: "projects", label: "Edit Projects", icon: FolderOpen },
  { id: "skills", label: "Edit Skills", icon: Code2 },
  { id: "contact", label: "Edit Contact", icon: Phone },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "visitors", label: "Visitors", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

/* ─── DASHBOARD ─── */
function Dashboard({ content }: { content: PortfolioContent }) {
  const liveCount = content.projects.filter((p) => p.isLive).length;
  const personalCount = content.projects.filter((p) => !p.isLive).length;
  const stats = [
    { label: "Live Projects", value: String(liveCount), icon: Globe, color: "text-primary" },
    { label: "Personal Projects", value: String(personalCount), icon: FolderOpen, color: "text-secondary" },
    { label: "Skills", value: String(content.skills.core.length), icon: Code2, color: "text-green-400" },
    { label: "Messages", value: "0", icon: Mail, color: "text-yellow-400" },
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">Welcome back, Abdimaalik.</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-card/40 border border-white/5 rounded-2xl p-6">
            <s.icon className={`w-6 h-6 mb-3 ${s.color}`} />
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="bg-card/40 border border-white/5 rounded-2xl p-6 mb-4">
        <h2 className="font-bold mb-1">Your Portfolio</h2>
        <p className="text-sm text-muted-foreground mb-4">Use the left sidebar to edit any section of your portfolio. Changes are saved instantly in your browser.</p>
        <div className="flex flex-wrap gap-3">
          <a href="/" target="_blank" className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20 text-sm hover:bg-primary hover:text-white transition-colors">
            View Portfolio ↗
          </a>
          <a href="https://github.com/ablayaanonline" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-white/5 text-foreground border border-white/10 text-sm hover:bg-white/10 transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function AdminPortal() {
  const { content } = usePortfolioContent();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  if (!authenticated) return <LoginScreen onLogin={() => setAuthenticated(true)} />;

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-foreground flex">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 bg-card/40 border-r border-white/5 backdrop-blur-sm z-10 hidden md:flex flex-col">
        <div className="p-5 border-b border-white/5">
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

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {TABS.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
              }`}>
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-0.5">
          <button onClick={() => setAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
          <a href="/" target="_blank"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all">
            <Eye className="w-4 h-4" /> View Portfolio
          </a>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-card/90 border-b border-white/5 flex items-center justify-between px-4 h-14 backdrop-blur-sm">
        <span className="font-bold text-sm">Management Portal</span>
        <button onClick={() => setMobileNavOpen(!mobileNavOpen)} className="p-2 text-muted-foreground">
          <LayoutDashboard className="w-5 h-5" />
        </button>
      </div>
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-[#0a0f1e] pt-14 overflow-y-auto">
          <nav className="p-3 space-y-0.5">
            {TABS.map((item) => (
              <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileNavOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                  activeTab === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground"
                }`}>
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Content */}
      <main className="md:ml-60 flex-1 p-6 md:p-10 pt-20 md:pt-10">
        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {activeTab === "dashboard"  && <Dashboard content={content} />}
          {activeTab === "hero"       && <HeroEditor />}
          {activeTab === "about"      && <AboutEditor />}
          {activeTab === "projects"   && <ProjectsEditor />}
          {activeTab === "skills"     && <SkillsEditor />}
          {activeTab === "contact"    && <ContactEditor />}
          {activeTab === "messages"   && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Messages</h1>
              <p className="text-muted-foreground mb-6">Real-time messages from your portfolio contact form.</p>
              <MessagesViewer adminSecret={content.adminPassword} />
            </div>
          )}
          {activeTab === "visitors"   && (
            <div>
              <h1 className="text-2xl font-bold mb-2">Visitors</h1>
              <p className="text-muted-foreground mb-8">Connect an analytics service to see visitor data.</p>
              <div className="bg-card/40 border border-white/5 rounded-2xl p-12 text-center">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Add Vercel Analytics or Google Analytics to track visitors.</p>
              </div>
            </div>
          )}
          {activeTab === "settings"   && <SettingsEditor />}
        </motion.div>
      </main>
    </div>
  );
}
