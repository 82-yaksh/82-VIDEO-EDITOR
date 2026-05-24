import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { useEditor, totalDuration, type Clip } from "@/store/editor";
import { GlassPanel } from "@/components/GlassPanel";

const ASPECTS = [
  { id: "16:9", label: "16:9", ratio: 16 / 9 },
  { id: "9:16", label: "9:16", ratio: 9 / 16 },
  { id: "1:1", label: "1:1", ratio: 1 },
] as const;

function activeClipAt(clips: Clip[], t: number): Clip | null {
  for (const c of clips) {
    const visible = Math.max(0.5, c.trimEnd - c.trimStart);
    if (t >= c.start && t < c.start + visible) return c;
  }
  return clips[clips.length - 1] ?? null;
}

export function Canvas() {
  const { clips, overlays, aspect, setAspect, playhead, setPlayhead, isPlaying, setPlaying } = useEditor();
  const total = totalDuration(clips);
  const ratio = ASPECTS.find((a) => a.id === aspect)!.ratio;
  const current = activeClipAt(clips, playhead);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Animation loop for playhead
  useEffect(() => {
    if (!isPlaying) return;
    let raf: number;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      const next = playhead + dt;
      if (next >= total) {
        setPlayhead(0);
        setPlaying(false);
        return;
      }
      setPlayhead(next);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, total]);

  // sync video element
  useEffect(() => {
    if (current?.kind === "video" && videoRef.current) {
      if (isPlaying) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [isPlaying, current?.id, current?.kind]);

  const visibleOverlays = overlays.filter(
    (o) => playhead >= o.start && playhead < o.start + o.duration,
  );

  return (
    <GlassPanel className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/40">
        <div className="text-xs text-muted-foreground">Preview</div>
        <div className="flex gap-1 p-1 rounded-lg bg-[oklch(0.16_0.04_275)]">
          {ASPECTS.map((a) => (
            <button
              key={a.id}
              onClick={() => setAspect(a.id)}
              className={`text-[11px] px-2.5 py-1 rounded-md transition ${
                aspect === a.id ? "bg-gradient-to-r from-[oklch(0.7_0.22_250)] to-[oklch(0.65_0.26_295)] text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 grid-bg relative">
        <div
          className="shining-border rounded-xl shadow-2xl"
          style={{
            aspectRatio: ratio,
            maxHeight: "100%",
            maxWidth: "100%",
            height: ratio >= 1 ? undefined : "100%",
            width: ratio >= 1 ? "100%" : undefined,
          }}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: ratio }}>
            <AnimatePresence mode="wait">
              {current ? (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  {current.kind === "image" && (
                    <img src={current.src} alt="" className="w-full h-full object-contain" />
                  )}
                  {current.kind === "video" && (
                    <video ref={videoRef} src={current.src} className="w-full h-full object-contain" muted />
                  )}
                  {current.kind === "ai" && (
                    <div
                      className="w-full h-full flex items-center justify-center text-center p-8 relative overflow-hidden"
                      style={{ background: current.gradient }}
                    >
                      <div className="absolute inset-0 bg-black/30" />
                      <div className="relative">
                        <div className="text-[10px] tracking-[0.3em] uppercase mb-2 opacity-80">AI Generated</div>
                        <div className="text-xl font-bold max-w-md mx-auto leading-tight">{current.prompt}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center text-center"
                >
                  <div>
                    <div className="text-lg font-semibold neon-text">82 Video AI Studio</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Generate, upload, or drop media to begin.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {visibleOverlays.map((o) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-0 bottom-[18%] text-center px-6 pointer-events-none"
                style={{ color: o.color, fontSize: o.fontSize / 2, textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
              >
                <span className="font-bold">{o.text}</span>
              </motion.div>
            ))}

            <div className="absolute top-3 right-3 text-[9px] tracking-[0.25em] uppercase px-2 py-1 rounded bg-black/50 backdrop-blur">
              82 VIDEO AI · PREVIEW
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 px-4 py-3 border-t border-border/40">
        <button
          onClick={() => {
            setPlayhead(0);
            setPlaying(false);
          }}
          className="h-9 w-9 rounded-full flex items-center justify-center bg-[oklch(0.24_0.04_270)] hover:bg-[oklch(0.3_0.06_280)] transition"
        >
          <RotateCcw size={14} />
        </button>
        <button
          onClick={() => setPlaying(!isPlaying)}
          disabled={total === 0}
          className="h-11 w-11 rounded-full flex items-center justify-center glow-button disabled:opacity-50"
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>
        <div className="text-[11px] tabular-nums text-muted-foreground">
          {playhead.toFixed(1)}s / {total.toFixed(1)}s
        </div>
      </div>
    </GlassPanel>
  );
}
