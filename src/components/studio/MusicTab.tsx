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

  const { tracks, suggestions } = useMemo(() => {
    const ql = q.toLowerCase().trim();
    const base = MOCK_TRACKS.filter((t) => {
      if (category && t.category !== category) return false;
      if (genre && t.genre !== genre) return false;
      if (mood && t.mood !== mood) return false;
      return true;
    });
    if (!ql) return { tracks: base, suggestions: [] as MockTrack[] };

    // Score each track: substring > token-prefix > fuzzy (Levenshtein) on any field token.
    const queryTokens = ql.split(/\s+/).filter(Boolean);
    const scored = base
      .map((t) => ({ t, score: scoreTrack(t, ql, queryTokens) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    if (scored.length > 0) return { tracks: scored.map((x) => x.t), suggestions: [] };

    // No matches — fall back to fuzzy suggestions across the whole library.
    const fuzzy = base
      .map((t) => ({ t, score: fuzzyScore(t, ql, queryTokens) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .filter((x) => x.score > 0.35)
      .map((x) => x.t);
    return { tracks: [], suggestions: fuzzy };
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
        {tracks.length === 0 && suggestions.length === 0 && (
          <div className="text-center text-[11px] text-muted-foreground py-6">No tracks match your filters.</div>
        )}
        {tracks.length === 0 && suggestions.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] text-muted-foreground px-1">
              No exact match for "<span className="text-foreground">{q}</span>". Did you mean:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setQ(t.title)}
                  className="text-[11px] px-2 py-1 rounded-full border border-[oklch(0.7_0.22_280_/_0.5)] hover:border-[oklch(0.7_0.27_330)] bg-[oklch(0.16_0.04_275)] transition"
                >
                  <span className="font-medium">{t.title}</span>
                  <span className="text-muted-foreground"> · {t.artist}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ───── Fuzzy search helpers ─────
function lev(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let j = 1; j <= b.length; j++) {
    let prev = dp[0];
    dp[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const tmp = dp[i];
      dp[i] = a[i - 1] === b[j - 1] ? prev : Math.min(prev, dp[i], dp[i - 1]) + 1;
      prev = tmp;
    }
  }
  return dp[a.length];
}
function sim(a: string, b: string): number {
  const m = Math.max(a.length, b.length);
  return m ? 1 - lev(a, b) / m : 1;
}
function trackFields(t: MockTrack): string[] {
  return [t.title, t.artist, t.region, t.genre, t.category, t.mood].map((s) => s.toLowerCase());
}
function scoreTrack(t: MockTrack, ql: string, tokens: string[]): number {
  const fields = trackFields(t);
  let score = 0;
  for (const f of fields) {
    if (f === ql) score += 100;
    else if (f.includes(ql)) score += 50;
  }
  for (const tok of tokens) {
    for (const f of fields) {
      for (const w of f.split(/[\s·-]+/)) {
        if (!w) continue;
        if (w === tok) score += 20;
        else if (w.startsWith(tok)) score += 10;
        else if (tok.length >= 3 && w.includes(tok)) score += 5;
      }
    }
  }
  return score;
}
function fuzzyScore(t: MockTrack, ql: string, tokens: string[]): number {
  const fields = trackFields(t);
  let best = sim(fields.join(" "), ql) * 0.5;
  for (const f of fields) {
    best = Math.max(best, sim(f, ql));
    for (const w of f.split(/[\s·-]+/)) {
      if (!w) continue;
      for (const tok of tokens) best = Math.max(best, sim(w, tok));
    }
  }
  return best;
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
