import { TopBar } from "./TopBar";
import { LeftPanel } from "./LeftPanel";
import { Canvas } from "./Canvas";
import { Timeline } from "./Timeline";
import { useEditor } from "@/store/editor";
import { motion, AnimatePresence } from "motion/react";

export function StudioLayout() {
  const hasContent = useEditor((s) => s.clips.length > 0 || s.overlays.length > 0 || !!s.music);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <TopBar />

      <div className="flex-1 min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {!hasContent ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="h-full w-full flex flex-col items-center justify-center p-6 overflow-y-auto"
            >
              <div className="text-center mb-6">
                <div className="text-[10px] tracking-[0.35em] uppercase text-muted-foreground mb-2">
                  Step 1 of 2
                </div>
                <h2 className="text-2xl md:text-3xl font-bold neon-text">
                  Set up your scene
                </h2>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  Pick AI, Media, Music or Effects. Your video and timeline will appear below as soon as you generate or add a clip.
                </p>
              </div>
              <div className="w-full max-w-[420px] h-[min(620px,calc(100vh-220px))]">
                <LeftPanel />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="studio"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="h-full flex flex-col gap-2 p-2 min-h-0"
            >
              <div className="flex-1 flex gap-2 min-h-0">
                <div className="w-[320px] shrink-0">
                  <LeftPanel />
                </div>
                <div className="flex-1 min-w-0">
                  <Canvas />
                </div>
              </div>
              <div className="h-[220px] shrink-0">
                <Timeline />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
