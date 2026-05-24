import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Loader2, Wand2 } from "lucide-react";
import { useEditor } from "@/store/editor";
import { PROMPT_PRESETS } from "@/data/mockTemplates";
import { pickSceneForPrompt } from "@/data/sceneLibrary";

const GRADIENTS = [
  "linear-gradient(135deg,#7c3aed,#06b6d4)",
  "linear-gradient(135deg,#ec4899,#f97316)",
  "linear-gradient(135deg,#3b82f6,#10b981)",
  "linear-gradient(135deg,#f43f5e,#a855f7)",
  "linear-gradient(135deg,#14b8a6,#6366f1)",
];

export function TextToVideoTab() {
  const [prompt, setPrompt] = useState("");
  const [stage, setStage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const addClip = useEditor((s) => s.addClip);

  const generate = async () => {
    const p = prompt.trim() || PROMPT_PRESETS[Math.floor(Math.random() * PROMPT_PRESETS.length)];
    const stages = ["Analyzing prompt…", "Composing scene…", "Rendering frames…", "Polishing…"];
    setProgress(0);
    for (let i = 0; i < stages.length; i++) {
      setStage(stages[i]);
      for (let p2 = 0; p2 < 25; p2++) {
        await new Promise((r) => setTimeout(r, 30));
        setProgress((prev) => Math.min(100, prev + 1));
      }
    }
    const scene = pickSceneForPrompt(p);
    addClip({
      kind: "ai",
      name: p.slice(0, 32) + (p.length > 32 ? "…" : ""),
      prompt: p,
      src: scene.src,
      gradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
      duration: scene.duration,
    });
    setStage(null);
    setProgress(0);
    setPrompt("");
  };

  return (
    <div className="p-5 space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Wand2 size={14} className="text-[oklch(0.7_0.27_330)]" />
          <h3 className="text-sm font-semibold">Text to Video</h3>
        </div>
        <p className="text-xs text-muted-foreground">Describe a scene. AI matches it to a cinematic clip.</p>
      </div>

      <div className="shining-border rounded-xl">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A cinematic shot of a neon city at dusk, rain reflections on the pavement..."
          rows={5}
          className="w-full p-3 rounded-xl bg-[oklch(0.16_0.04_275)] text-sm resize-none focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {PROMPT_PRESETS.slice(0, 4).map((p) => (
          <button
            key={p}
            onClick={() => setPrompt(p)}
            className="text-[10px] px-2 py-1 rounded-full neon-input hover:border-[oklch(0.7_0.22_280_/_0.7)] transition"
          >
            {p.slice(0, 28)}…
          </button>
        ))}
      </div>

      <button
        disabled={!!stage}
        onClick={generate}
        className="glow-button w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {stage ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
        {stage ? stage : "Generate with AI"}
      </button>

      {stage && (
        <div className="space-y-2">
          <div className="h-1.5 rounded-full bg-[oklch(0.2_0.04_275)] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[oklch(0.7_0.22_250)] via-[oklch(0.65_0.26_295)] to-[oklch(0.7_0.27_330)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.05 }}
            />
          </div>
          <div className="text-[11px] text-muted-foreground text-right">{progress}%</div>
        </div>
      )}
    </div>
  );
}
