import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles, Folder, Music, Wand2 } from "lucide-react";
import { TextToVideoTab } from "./TextToVideoTab";
import { MediaTab } from "./MediaTab";
import { MusicTab } from "./MusicTab";
import { GlassPanel } from "@/components/GlassPanel";

const TABS = [
  { id: "ai", label: "AI", icon: Sparkles },
  { id: "media", label: "Media", icon: Folder },
  { id: "music", label: "Music", icon: Music },
  { id: "fx", label: "Effects", icon: Wand2 },
] as const;
type TabId = (typeof TABS)[number]["id"];

export function LeftPanel() {
  const [tab, setTab] = useState<TabId>("ai");

  return (
    <GlassPanel className="h-full flex flex-col overflow-hidden">
      <div className="flex border-b border-border/40">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`relative flex-1 py-3 text-[11px] font-medium flex flex-col items-center gap-1 transition ${
              tab === id ? "text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon size={14} />
            {label}
            {tab === id && (
              <motion.div
                layoutId="left-tab"
                className="absolute bottom-0 inset-x-3 h-[2px] rounded-full bg-gradient-to-r from-[oklch(0.7_0.22_250)] to-[oklch(0.7_0.27_330)]"
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {tab === "ai" && <TextToVideoTab />}
            {tab === "media" && <MediaTab />}
            {tab === "music" && <MusicTab />}
            {tab === "fx" && <EffectsTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
}

function EffectsTab() {
  const FX = ["Cinematic LUT", "Film Grain", "Glow Bloom", "Chromatic Aberration", "VHS", "Slow Motion", "Speed Ramp", "Color Pop", "Vignette"];
  return (
    <div className="p-5 space-y-3">
      <h3 className="text-sm font-semibold">Effects</h3>
      <p className="text-xs text-muted-foreground">Click to preview (demo).</p>
      <div className="grid grid-cols-2 gap-2">
        {FX.map((f, i) => (
          <button
            key={f}
            className="aspect-video rounded-lg p-2 text-[11px] font-medium text-left relative overflow-hidden hover:scale-[1.02] transition"
            style={{
              background: `linear-gradient(135deg, hsl(${(i * 40) % 360},70%,40%), hsl(${(i * 40 + 60) % 360},70%,30%))`,
            }}
          >
            <span className="relative z-10">{f}</span>
            <div className="absolute inset-0 bg-black/10" />
          </button>
        ))}
      </div>
    </div>
  );
}
