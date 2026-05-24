import { create } from "zustand";

export type ClipKind = "ai" | "image" | "video";

export type Clip = {
  id: string;
  kind: ClipKind;
  name: string;
  src?: string; // object URL for media
  prompt?: string; // for AI clips
  gradient?: string; // for AI clip preview
  start: number; // seconds, on the timeline
  duration: number; // seconds
  trimStart: number; // 0..duration
  trimEnd: number; // 0..duration
};

export type Overlay = {
  id: string;
  text: string;
  start: number;
  duration: number;
  color: string;
  fontSize: number;
};

export type MusicAssign = {
  trackId: string;
  title: string;
  artist: string;
  color: string;
  duration: number;
};

type EditorState = {
  clips: Clip[];
  overlays: Overlay[];
  music: MusicAssign | null;
  selectedId: string | null;
  playhead: number;
  isPlaying: boolean;
  aspect: "16:9" | "9:16" | "1:1";

  addClip: (c: Omit<Clip, "id" | "start" | "trimStart" | "trimEnd"> & Partial<Pick<Clip, "trimStart" | "trimEnd">>) => void;
  removeClip: (id: string) => void;
  trimClip: (id: string, trimStart: number, trimEnd: number) => void;
  moveClip: (id: string, newStart: number) => void;
  select: (id: string | null) => void;
  addOverlay: (text?: string) => void;
  updateOverlay: (id: string, patch: Partial<Overlay>) => void;
  removeOverlay: (id: string) => void;
  setMusic: (m: MusicAssign | null) => void;
  setPlaying: (p: boolean) => void;
  setPlayhead: (t: number) => void;
  setAspect: (a: EditorState["aspect"]) => void;
};

const recalcStarts = (clips: Clip[]): Clip[] => {
  let t = 0;
  return clips.map((c) => {
    const visible = Math.max(0.5, c.trimEnd - c.trimStart);
    const updated = { ...c, start: t };
    t += visible;
    return updated;
  });
};

const uid = () => Math.random().toString(36).slice(2, 10);

export const useEditor = create<EditorState>((set, get) => ({
  clips: [],
  overlays: [],
  music: null,
  selectedId: null,
  playhead: 0,
  isPlaying: false,
  aspect: "16:9",

  addClip: (c) => {
    const newClip: Clip = {
      id: uid(),
      start: 0,
      trimStart: c.trimStart ?? 0,
      trimEnd: c.trimEnd ?? c.duration,
      ...c,
    };
    const next = recalcStarts([...get().clips, newClip]);
    set({ clips: next, selectedId: newClip.id });
  },
  removeClip: (id) => {
    const next = recalcStarts(get().clips.filter((c) => c.id !== id));
    set({ clips: next, selectedId: null });
  },
  trimClip: (id, trimStart, trimEnd) => {
    const clips = get().clips.map((c) => (c.id === id ? { ...c, trimStart, trimEnd } : c));
    set({ clips: recalcStarts(clips) });
  },
  moveClip: (id, newStart) => {
    const clips = [...get().clips].sort((a, b) => {
      if (a.id === id) return newStart - b.start;
      if (b.id === id) return a.start - newStart;
      return a.start - b.start;
    });
    set({ clips: recalcStarts(clips) });
  },
  select: (id) => set({ selectedId: id }),
  addOverlay: (text = "Your text here") => {
    const o: Overlay = {
      id: uid(),
      text,
      start: get().playhead,
      duration: 3,
      color: "#ffffff",
      fontSize: 48,
    };
    set({ overlays: [...get().overlays, o], selectedId: o.id });
  },
  updateOverlay: (id, patch) =>
    set({ overlays: get().overlays.map((o) => (o.id === id ? { ...o, ...patch } : o)) }),
  removeOverlay: (id) =>
    set({ overlays: get().overlays.filter((o) => o.id !== id), selectedId: null }),
  setMusic: (m) => set({ music: m }),
  setPlaying: (p) => set({ isPlaying: p }),
  setPlayhead: (t) => set({ playhead: Math.max(0, t) }),
  setAspect: (a) => set({ aspect: a }),
}));

export const totalDuration = (clips: Clip[]) =>
  clips.reduce((sum, c) => sum + Math.max(0.5, c.trimEnd - c.trimStart), 0);
