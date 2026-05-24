import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Search, Play, Pause, Plus, Check, Music2 } from "lucide-react";
import { MOCK_TRACKS, GENRES, MOODS, CATEGORIES, type MockTrack } from "@/data/mockMusic";
import { useEditor } from "@/store/editor";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export function MusicTab() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { music, setMusic } = useEditor();

  // Lazy-init audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.7;
    const a = audioRef.current;
    return () => {
      a.pause();
      a.src = "";
    };
  }, []);

  const togglePlay = (t: MockTrack) => {
    const a = audioRef.current;
    if (!a) return;
    if (playing === t.id) {
      a.pause();
      setPlaying(null);
    } else {
      if (a.src !== t.src) a.src = t.src;
      a.currentTime = 0;
      a.play().catch(() => {});
      setPlaying(t.id);
      a.onended = () => setPlaying(null);
    }
  };

  const tracks = useMemo(() => {
    const ql = q.toLowerCase().trim();
    return MOCK_TRACKS.filter((t) => {
      if (category && t.category !== category) return false;
      if (genre && t.genre !== genre) return false;
      if (mood && t.mood !== mood) return false;
      if (!ql) return true;
      return (
        t.title.toLowerCase().includes(ql) ||
        t.artist.toLowerCase().includes(ql) ||
        t.region.toLowerCase().includes(ql) ||
        t.genre.toLowerCase().includes(ql) ||
        t.category.toLowerCase().includes(ql)
      );
    });
  }, [q, category, genre, mood]);

  const assign = (t: MockTrack) =>
    setMusic({ trackId: t.id, title: t.title, artist: t.artist, color: t.color, duration: t.duration });

  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Music2 size={14} className="text-[oklch(0.7_0.22_250)]" />
        <h3 className="text-sm font-semibold">Worldwide Library</h3>
      </div>

      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search Bollywood, Hollywood, artists, albums…"
          className="neon-input w-full pl-9 pr-3 py-2 rounded-lg text-xs"
        />
      </div>

      <Chips label="Category" items={[...CATEGORIES]} value={category} onChange={setCategory} />
      <Chips label="Genre" items={GENRES} value={genre} onChange={setGenre} />
      <Chips label="Mood" items={MOODS} value={mood} onChange={setMood} />

      <div className="text-[10px] text-muted-foreground">{tracks.length} tracks</div>

      <div className="space-y-1.5 max-h-[calc(100vh-620px)] overflow-y-auto pr-1">
        {tracks.map((t) => {
          const isPlaying = playing === t.id;
          const isActive = music?.trackId === t.id;
          return (
            <motion.div
              key={t.id}
              layout
              className={`rounded-lg p-2 flex items-center gap-2 border transition ${
                isActive
                  ? "border-[oklch(0.7_0.27_330)] bg-[oklch(0.22_0.06_295_/_0.5)]"
                  : "border-border/40 bg-[oklch(0.16_0.04_275)] hover:border-[oklch(0.7_0.22_280_/_0.6)]"
              }`}
            >
              <button
                onClick={() => togglePlay(t)}
                className="h-8 w-8 shrink-0 rounded-md flex items-center justify-center"
                style={{ background: `${t.color}33`, color: t.color }}
              >
                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
              </button>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium truncate">{t.title}</div>
                <div className="text-[10px] text-muted-foreground flex items-center gap-1.5 flex-wrap">
                  <span className="truncate">{t.artist}</span>
                  <span>·</span>
                  <span>{t.category}</span>
                  <span>·</span>
                  <span>{t.bpm} BPM</span>
                </div>
              </div>

              <Waveform color={t.color} active={isPlaying} />

              <span className="text-[10px] tabular-nums text-muted-foreground w-8 text-right">
                {fmt(t.duration)}
              </span>

              <button
                onClick={() => assign(t)}
                className="h-7 w-7 rounded-md flex items-center justify-center bg-[oklch(0.24_0.04_270)] hover:bg-[oklch(0.3_0.08_290)] transition"
                title={isActive ? "Selected" : "Add to project"}
              >
                {isActive ? <Check size={12} className="text-[oklch(0.7_0.27_330)]" /> : <Plus size={12} />}
              </button>
            </motion.div>
          );
        })}
        {tracks.length === 0 && (
          <div className="text-center text-[11px] text-muted-foreground py-6">No tracks match your filters.</div>
        )}
      </div>
    </div>
  );
}

function Chips({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => onChange(null)}
          className={`text-[10px] px-2 py-0.5 rounded-full border transition ${
            value === null
              ? "border-[oklch(0.7_0.27_330)] bg-[oklch(0.22_0.06_295_/_0.5)]"
              : "border-border/40 hover:border-[oklch(0.7_0.22_280_/_0.6)]"
          }`}
        >
          All
        </button>
        {items.map((g) => (
          <button
            key={g}
            onClick={() => onChange(value === g ? null : g)}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition ${
              value === g
                ? "border-[oklch(0.7_0.27_330)] bg-[oklch(0.22_0.06_295_/_0.5)]"
                : "border-border/40 hover:border-[oklch(0.7_0.22_280_/_0.6)]"
            }`}
          >
            {g}
          </button>
        ))}
      </div>
    </div>
  );
}

function Waveform({ color, active }: { color: string; active: boolean }) {
  const bars = useMemo(
    () => Array.from({ length: 18 }, () => 0.3 + Math.random() * 0.7),
    [],
  );
  return (
    <div className="flex items-end gap-[2px] h-6 w-16">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          style={{ background: color, height: `${h * 100}%`, opacity: active ? 0.95 : 0.45 }}
          animate={active ? { scaleY: [1, 0.4 + Math.random() * 0.8, 1] } : { scaleY: 1 }}
          transition={
            active
              ? { duration: 0.6 + (i % 4) * 0.15, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
          }
        />
      ))}
    </div>
  );
}
