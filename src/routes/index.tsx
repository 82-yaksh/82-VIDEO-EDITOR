import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Sparkles, Film, Music, Download, Wand2, Play, Globe } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { ShiningBorder } from "@/components/ShiningBorder";
import { AuthModal } from "@/components/auth/AuthModal";
import { useAuth } from "@/store/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "82 Video AI — Cinematic AI Video Studio" },
      { name: "description", content: "Generate, edit, and export 4K AI video. Text-to-video, smart timeline editor, and a worldwide music library." },
      { property: "og:title", content: "82 Video AI — Cinematic AI Video Studio" },
      { property: "og:description", content: "Generate, edit, and export 4K AI video. Text-to-video, smart timeline editor, and a worldwide music library." },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: Sparkles, title: "Text to Video", desc: "Describe a scene and generate cinematic footage in seconds." },
  { icon: Film, title: "Smart Editor", desc: "Drag, trim, and layer clips on a Filmora-style multi-track timeline." },
  { icon: Music, title: "Worldwide Music", desc: "Browse 30+ tracks across genres, moods, and regions." },
  { icon: Download, title: "4K Export", desc: "Render to 720p, 1080p, 4K or 8K with a single click." },
  { icon: Wand2, title: "AI Effects", desc: "Cinematic LUTs, glow bloom, color pop, slow-mo and more." },
  { icon: Globe, title: "Browser-native", desc: "Runs entirely in your browser. No installs, no friction." },
];

function Landing() {
  const { openModal, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* animated background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.5 0.25 280 / 0.5), transparent 70%)" }}
          animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[20%] right-[-15%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.5 0.25 330 / 0.4), transparent 70%)" }}
          animate={{ x: [0, -100, 0], y: [0, 80, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.5 0.25 250 / 0.4), transparent 70%)" }}
          animate={{ x: [0, 60, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 grid-bg opacity-30" />
      </div>

      <header className="px-6 lg:px-12 py-5 flex items-center justify-between">
        <BrandLogo />
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#showcase" className="hover:text-foreground transition">Showcase</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          {!user && (
            <button
              onClick={openModal}
              className="text-sm px-3 py-1.5 rounded-lg neon-input hover:border-[oklch(0.7_0.22_280_/_0.7)] transition"
            >
              Sign in
            </button>
          )}
          <Link to="/studio" className="text-sm px-3 py-1.5 rounded-lg glow-button font-medium">
            Open Studio
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.7_0.27_330)] pulse-glow" />
          New · Text-to-Video v2 is live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-5xl md:text-7xl font-black tracking-tight max-w-4xl leading-[1.05]"
        >
          Cinema-grade AI video,
          <br />
          <span className="neon-text">in your browser.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-muted-foreground max-w-xl mt-5 text-base md:text-lg"
        >
          Generate scenes from text, edit on a pro timeline, drop in worldwide music, and export
          to 4K — all in one futuristic studio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-8"
        >
          <Link
            to="/studio"
            className="glow-button px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
          >
            <Play size={16} /> Launch Studio
          </Link>
          <button
            onClick={openModal}
            className="px-6 py-3 rounded-xl font-semibold neon-input hover:border-[oklch(0.7_0.22_280_/_0.7)] transition"
          >
            Create free account
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-16 w-full max-w-5xl"
        >
          <ShiningBorder inner="rounded-2xl overflow-hidden">
            <div className="aspect-video bg-[oklch(0.1_0.03_275)] relative">
              <div className="absolute inset-0 grid-bg opacity-50" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.4 0.2 295 / 0.4), transparent 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                <div>
                  <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                    Studio Preview
                  </div>
                  <div className="text-3xl md:text-4xl font-bold neon-text">
                    Generate. Edit. Export.
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    Built for creators who think in scenes, not slides.
                  </div>
                </div>
              </div>
              <div className="absolute top-3 right-3 text-[9px] tracking-[0.25em] uppercase px-2 py-1 rounded bg-black/50 backdrop-blur">
                82 VIDEO AI · LIVE
              </div>
            </div>
          </ShiningBorder>
        </motion.div>
      </main>

      <section id="features" className="px-6 lg:px-12 py-20 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Everything you need to ship a film</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            A futuristic editor with the muscle of a pro studio — minus the learning curve.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:border-[oklch(0.7_0.22_280_/_0.6)] transition"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[oklch(0.7_0.22_250)] to-[oklch(0.7_0.27_330)] flex items-center justify-center mb-4">
                <f.icon size={18} className="text-white" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1.5">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="px-6 lg:px-12 py-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
        <BrandLogo />
        <div>© 2026 82 Video AI · A futuristic studio for cinematic creators.</div>
      </footer>

      <AuthModal />
    </div>
  );
}
