import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Type, Trash2, Music } from "lucide-react";
import { useEditor, totalDuration, type Clip } from "@/store/editor";
import { GlassPanel } from "@/components/GlassPanel";

const PX_PER_SEC = 60;

export function Timeline() {
  const {
    clips,
    overlays,
    music,
    selectedId,
    playhead,
    setPlayhead,
    select,
    removeClip,
    trimClip,
    addOverlay,
    updateOverlay,
    removeOverlay,
    setMusic,
  } = useEditor();
  const total = Math.max(20, totalDuration(clips));
  const trackRef = useRef<HTMLDivElement>(null);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const x = e.clientX - rect.left + (trackRef.current?.scrollLeft ?? 0);
    setPlayhead(Math.max(0, x / PX_PER_SEC));
  };

  return (
    <GlassPanel className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border/40">
        <div className="flex items-center gap-2">
          <div className="text-xs font-semibold">Timeline</div>
          <div className="text-[10px] text-muted-foreground">
            {clips.length} clip{clips.length === 1 ? "" : "s"} · {overlays.length} overlay
            {overlays.length === 1 ? "" : "s"}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => addOverlay()}
            className="text-[11px] px-2.5 py-1.5 rounded-md neon-input hover:border-[oklch(0.7_0.22_280_/_0.7)] flex items-center gap-1.5 transition"
          >
            <Type size={11} /> Add Text
          </button>
          {selectedId && (
            <button
              onClick={() => {
                if (clips.find((c) => c.id === selectedId)) removeClip(selectedId);
                else if (overlays.find((o) => o.id === selectedId)) removeOverlay(selectedId);
              }}
              className="text-[11px] px-2.5 py-1.5 rounded-md bg-destructive/20 text-destructive hover:bg-destructive/30 flex items-center gap-1.5 transition"
            >
              <Trash2 size={11} /> Delete
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden" ref={trackRef}>
        <div className="relative h-full" style={{ width: total * PX_PER_SEC + 60, minWidth: "100%" }}>
          {/* Ruler */}
          <div
            className="h-5 sticky top-0 z-10 bg-[oklch(0.16_0.04_275_/_0.9)] backdrop-blur border-b border-border/40 flex text-[9px] text-muted-foreground"
            onClick={seek}
          >
            {Array.from({ length: Math.ceil(total) + 1 }).map((_, i) => (
              <div
                key={i}
                className="border-l border-border/30 pl-1 tabular-nums"
                style={{ width: PX_PER_SEC }}
              >
                {i}s
              </div>
            ))}
          </div>

          {/* Playhead */}
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-[oklch(0.7_0.27_330)] z-20 pointer-events-none"
            style={{ left: playhead * PX_PER_SEC, boxShadow: "0 0 10px oklch(0.7 0.27 330)" }}
          >
            <div className="absolute -top-0.5 -left-1.5 w-3 h-3 rounded-full bg-[oklch(0.7_0.27_330)]" />
          </motion.div>

          {/* Video track */}
          <Track label="Video" onClick={seek}>
            {clips.map((c) => (
              <ClipBlock key={c.id} clip={c} selected={selectedId === c.id} onSelect={() => select(c.id)} onTrim={trimClip} />
            ))}
            {clips.length === 0 && <EmptyTrack hint="Drag from Media or generate with AI" />}
          </Track>

          {/* Overlay track */}
          <Track label="Text" onClick={seek}>
            {overlays.map((o) => (
              <div
                key={o.id}
                onClick={(e) => {
                  e.stopPropagation();
                  select(o.id);
                }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  const t = prompt("Edit text:", o.text);
                  if (t !== null) updateOverlay(o.id, { text: t });
                }}
                className={`absolute top-1 h-10 rounded-md px-2 flex items-center text-[10px] font-medium cursor-pointer truncate transition ${
                  selectedId === o.id ? "ring-2 ring-[oklch(0.7_0.27_330)]" : ""
                }`}
                style={{
                  left: o.start * PX_PER_SEC,
                  width: Math.max(40, o.duration * PX_PER_SEC),
                  background: "linear-gradient(135deg, oklch(0.5 0.2 320), oklch(0.4 0.18 280))",
                }}
              >
                <Type size={10} className="mr-1 shrink-0" />
                <span className="truncate">{o.text}</span>
              </div>
            ))}
            {overlays.length === 0 && <EmptyTrack hint="Click Add Text" />}
          </Track>

          {/* Music track */}
          <Track label="Music" onClick={seek}>
            {music ? (
              <div
                className="absolute top-1 h-10 rounded-md px-2 flex items-center gap-1.5 text-[10px] font-medium overflow-hidden cursor-pointer group"
                style={{
                  left: 0,
                  width: Math.max(80, music.duration * PX_PER_SEC),
                  background: `linear-gradient(90deg, ${music.color}55, ${music.color}22)`,
                  border: `1px solid ${music.color}aa`,
                }}
                onClick={() => setMusic(null)}
                title="Click to remove"
              >
                <Music size={10} style={{ color: music.color }} />
                <span className="truncate">{music.title} — {music.artist}</span>
                <div className="flex items-end gap-px h-5 ml-2 opacity-60">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-[2px] rounded-full"
                      style={{
                        height: `${30 + Math.sin(i * 0.7) * 30 + Math.random() * 30}%`,
                        background: music.color,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyTrack hint="Pick a track from Music tab" />
            )}
          </Track>
        </div>
      </div>
    </GlassPanel>
  );
}

function Track({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div className="flex border-b border-border/30 last:border-b-0">
      <div className="sticky left-0 z-10 shrink-0 w-12 bg-[oklch(0.16_0.04_275_/_0.9)] backdrop-blur border-r border-border/40 flex items-center justify-center text-[10px] text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
      <div className="relative flex-1 h-12 bg-[oklch(0.12_0.03_275_/_0.5)]" onClick={onClick}>
        {children}
      </div>
    </div>
  );
}

function EmptyTrack({ hint }: { hint: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted-foreground/60 pointer-events-none">
      {hint}
    </div>
  );
}

function ClipBlock({
  clip,
  selected,
  onSelect,
  onTrim,
}: {
  clip: Clip;
  selected: boolean;
  onSelect: () => void;
  onTrim: (id: string, ts: number, te: number) => void;
}) {
  const [dragging, setDragging] = useState<"left" | "right" | null>(null);

  const visible = Math.max(0.5, clip.trimEnd - clip.trimStart);

  const startDrag = (side: "left" | "right") => (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(side);
    const startX = e.clientX;
    const initTs = clip.trimStart;
    const initTe = clip.trimEnd;
    const move = (ev: MouseEvent) => {
      const dx = (ev.clientX - startX) / PX_PER_SEC;
      if (side === "left") {
        const nts = Math.max(0, Math.min(initTe - 0.5, initTs + dx));
        onTrim(clip.id, nts, initTe);
      } else {
        const nte = Math.max(initTs + 0.5, Math.min(clip.duration, initTe + dx));
        onTrim(clip.id, initTs, nte);
      }
    };
    const up = () => {
      setDragging(null);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const bg =
    clip.kind === "ai"
      ? clip.gradient ?? "linear-gradient(135deg,#7c3aed,#06b6d4)"
      : clip.kind === "image"
        ? "linear-gradient(135deg, oklch(0.5 0.15 200), oklch(0.4 0.18 250))"
        : "linear-gradient(135deg, oklch(0.5 0.18 30), oklch(0.4 0.2 350))";

  return (
    <motion.div
      layout
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`absolute top-1 h-10 rounded-md flex items-center px-2 text-[10px] font-medium cursor-pointer overflow-hidden ${
        selected || dragging ? "ring-2 ring-[oklch(0.7_0.27_330)]" : ""
      }`}
      style={{
        left: clip.start * PX_PER_SEC,
        width: Math.max(30, visible * PX_PER_SEC),
        background: bg,
      }}
    >
      <div
        onMouseDown={startDrag("left")}
        className="absolute left-0 top-0 bottom-0 w-1.5 cursor-ew-resize bg-white/20 hover:bg-white/50 transition"
      />
      <span className="truncate px-1">{clip.name}</span>
      <span className="ml-auto text-[9px] opacity-70 tabular-nums pl-1">{visible.toFixed(1)}s</span>
      <div
        onMouseDown={startDrag("right")}
        className="absolute right-0 top-0 bottom-0 w-1.5 cursor-ew-resize bg-white/20 hover:bg-white/50 transition"
      />
    </motion.div>
  );
}
