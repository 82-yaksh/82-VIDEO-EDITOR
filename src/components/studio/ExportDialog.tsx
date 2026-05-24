import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Download, CheckCircle2, Sparkles } from "lucide-react";
import { ShiningBorder } from "@/components/ShiningBorder";
import { useEditor, totalDuration } from "@/store/editor";

const RES = [
  { id: "720p", label: "HD 720p" },
  { id: "1080p", label: "Full HD 1080p" },
  { id: "4k", label: "4K Ultra HD" },
  { id: "8k", label: "8K Cinema" },
] as const;

const STAGES = ["Compositing scenes…", "Encoding video…", "Mixing audio…", "Upscaling…", "Finalizing…"];

export function ExportDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [res, setRes] = useState<(typeof RES)[number]["id"]>("4k");
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const { clips, overlays, music } = useEditor();

  const run = async () => {
    setProgress(0);
    setDone(false);
    for (let i = 0; i < STAGES.length; i++) {
      setStage(STAGES[i]);
      const target = ((i + 1) / STAGES.length) * 100;
      while (true) {
        await new Promise((r) => setTimeout(r, 25));
        let stop = false;
        setProgress((p) => {
          const np = Math.min(target, p + 1.2);
          if (np >= target) stop = true;
          return np;
        });
        if (stop) break;
      }
    }
    setStage("Done!");
    setDone(true);
    // download a manifest
    const manifest = {
      project: "82 Video AI Export",
      resolution: res,
      duration: totalDuration(clips),
      clips: clips.map((c) => ({ name: c.name, kind: c.kind, prompt: c.prompt, duration: c.trimEnd - c.trimStart })),
      overlays: overlays.map((o) => ({ text: o.text, start: o.start, duration: o.duration })),
      music: music?.title ?? null,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `82video-export-${res}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setProgress(0);
    setStage(null);
    setDone(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={reset}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="relative w-full max-w-md"
          >
            <ShiningBorder inner="glass rounded-2xl p-7">
              <button
                onClick={reset}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>

              <div className="text-center mb-5">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.7_0.22_250)] to-[oklch(0.7_0.27_330)] mb-2 neon-glow">
                  <Download className="text-white" size={20} />
                </div>
                <h2 className="text-xl font-bold neon-text">Export Project</h2>
                <p className="text-xs text-muted-foreground mt-1">Choose resolution & render</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-5">
                {RES.map((r) => (
                  <button
                    key={r.id}
                    disabled={!!stage && !done}
                    onClick={() => setRes(r.id)}
                    className={`p-3 rounded-lg border text-left transition ${
                      res === r.id
                        ? "border-[oklch(0.7_0.27_330)] bg-[oklch(0.22_0.06_295_/_0.4)]"
                        : "border-border/40 hover:border-[oklch(0.7_0.22_280_/_0.6)]"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{r.id}</div>
                    <div className="text-sm font-semibold">{r.label}</div>
                  </button>
                ))}
              </div>

              {stage && (
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      {done ? (
                        <CheckCircle2 size={12} className="text-[oklch(0.7_0.27_330)]" />
                      ) : (
                        <Sparkles size={12} className="text-[oklch(0.7_0.22_250)] animate-pulse" />
                      )}
                      {stage}
                    </span>
                    <span className="tabular-nums">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[oklch(0.2_0.04_275)] overflow-hidden relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[oklch(0.7_0.22_250)] via-[oklch(0.65_0.26_295)] to-[oklch(0.7_0.27_330)] relative"
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear", duration: 0.05 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  </div>
                </div>
              )}

              <button
                onClick={done ? reset : run}
                disabled={!!stage && !done}
                className="glow-button w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {done ? (
                  <>
                    <CheckCircle2 size={16} /> Done — Close
                  </>
                ) : (
                  <>
                    <Download size={16} /> {res === "4k" ? "Download 4K" : `Download ${res.toUpperCase()}`}
                  </>
                )}
              </button>
              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Demo export — a project manifest will download.
              </p>
            </ShiningBorder>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
