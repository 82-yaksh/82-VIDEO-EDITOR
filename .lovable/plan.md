
# 82 VIDEO AI — Build Plan

A frontend-only, fully interactive AI video editor demo inspired by Filmora, with a deep-dark futuristic aesthetic, neon blue/purple shining borders, glassmorphism, and Framer Motion transitions. No backend, no API keys — all features are simulated with mock data and fake loading states.

## Design System (src/styles.css)

- Deep dark background (near-black with subtle blue tint), elevated glass surfaces with `backdrop-filter: blur()` and translucent borders.
- Neon palette: electric blue `#3b82f6` → violet `#8b5cf6` → magenta `#d946ef`.
- Reusable tokens: `--neon-blue`, `--neon-purple`, `--neon-magenta`, `--gradient-neon`, `--glass-bg`, `--glass-border`, `--shadow-glow`.
- Utility classes:
  - `.glass` — glassmorphism card
  - `.shining-border` — animated conic-gradient border that rotates (neon blue→purple)
  - `.neon-text` — gradient text
  - `.glow-button` — pulsing glow on hover
- Install `motion` (Framer Motion for React).

## Routes (TanStack Start, file-based)

```
src/routes/
  __root.tsx           (existing — keep, add HeadContent meta for the brand)
  index.tsx            — Landing page (hero, features, CTA → opens auth modal or routes to /studio)
  studio.tsx           — Main editor (split-screen dashboard)
```

Each route gets its own `head()` with route-specific title/description/og tags.

## Components (src/components/)

- `BrandLogo.tsx` — "82 VIDEO AI" wordmark with gradient + subtle glow.
- `ShiningBorder.tsx` — wrapper that renders an animated rotating neon border around children.
- `GlassPanel.tsx` — frosted glass container.
- `auth/AuthModal.tsx` — Sign-in / Sign-up popup with tabs, shining border, social buttons (visual only). Stores `{ email, name }` in localStorage to simulate session.
- `studio/StudioLayout.tsx` — split-screen shell: left control rail, right canvas, bottom timeline.
- `studio/LeftPanel.tsx` — tabbed sidebar: **Text-to-Video**, **Media**, **Music**, **Effects**.
  - `TextToVideoTab.tsx` — glowing textarea + "Generate with AI" button → simulated 3s progress + adds a mock generated clip (gradient placeholder + prompt label) to timeline.
  - `MediaTab.tsx` — drag-and-drop dropzone (`react-dropzone` not required; native DnD). Accepts images/videos via `URL.createObjectURL`; thumbnails appear; click or drag onto timeline.
  - `MusicTab.tsx` — searchable list of ~30 mock worldwide tracks with `genre`, `mood`, `region`, `duration`, waveform bar. Category chips (Pop, Hip-Hop, Cinematic, Lo-Fi, EDM, Afrobeats, K-Pop, Latin, Bollywood, Ambient). Mood chips (Energetic, Chill, Epic, Romantic, Dark). Play/pause toggles a fake animated waveform. "Add to project" sends to timeline music track.
- `studio/Canvas.tsx` — preview area. Shows currently-selected clip (image, video, or generated placeholder). Play/pause, scrub indicator, aspect-ratio toggles (16:9 / 9:16 / 1:1), watermark overlay "82 VIDEO AI · Preview".
- `studio/Timeline.tsx` — multi-track timeline at the bottom:
  - Video track, Overlay/text track, Music track.
  - Drag to reorder, drag handles on clip edges to trim (mouse-drag updates `start`/`end` in state), click to select, delete key removes.
  - "Add text overlay" button inserts an editable text block on the overlay track; double-click to edit text and font/color.
  - Playhead with play/pause that advances using `requestAnimationFrame`.
- `studio/TopBar.tsx` — project name (editable), undo/redo (basic state history), avatar (opens auth modal if not signed in), **Export** button.
- `studio/ExportDialog.tsx` — "Download 4K" modal. Resolution chips (720p / 1080p / 4K / 8K). Clicking Start runs a simulated render: animated progress bar (0→100% over ~4s) with stage labels ("Compositing…", "Encoding…", "Upscaling to 4K…", "Finalizing…"). On complete, triggers a download of a small generated `.txt` "project manifest" as a stand-in (no real video encoding possible in browser without heavy deps) — clearly labeled as demo export.

## State

- `src/store/editor.ts` — Zustand store: `clips`, `overlays`, `musicTracks`, `selectedId`, `playhead`, `isPlaying`, actions (`addClip`, `trimClip`, `removeClip`, `addOverlay`, `setMusic`, etc.).
- `src/store/auth.ts` — Zustand store: `user`, `signIn`, `signUp`, `signOut` (localStorage-backed mock).
- Install `zustand`.

## Mock Data

- `src/data/mockMusic.ts` — ~30 tracks: `{ id, title, artist, region, genre, mood, duration, bpm, color }` covering global regions.
- `src/data/mockTemplates.ts` — a few "AI generation" presets the Text-to-Video tab suggests as chips.

## Animations (Framer Motion)

- Page transitions on route change (fade + slight Y).
- Panel mount: spring scale-in.
- Tab switches: shared layout cross-fade.
- Modal: scale + blur backdrop.
- Buttons: hover glow + tap scale.
- Timeline clips: layout animations on reorder/trim.
- Shining border: CSS `@property --angle` rotation, no JS.

## Landing Page (index.tsx)

Hero with brand, animated gradient orb background, tagline "Cinema-grade AI video, in your browser", primary CTA "Enter Studio" → `/studio`, secondary "Sign in" → opens AuthModal. Feature grid (Text-to-Video, Smart Editor, 4K Export, Global Music). Footer.

## Files to create / modify

```
src/styles.css                         (extend tokens + utilities)
src/routes/index.tsx                   (replace placeholder)
src/routes/studio.tsx                  (new)
src/components/BrandLogo.tsx
src/components/ShiningBorder.tsx
src/components/GlassPanel.tsx
src/components/auth/AuthModal.tsx
src/components/studio/StudioLayout.tsx
src/components/studio/TopBar.tsx
src/components/studio/LeftPanel.tsx
src/components/studio/TextToVideoTab.tsx
src/components/studio/MediaTab.tsx
src/components/studio/MusicTab.tsx
src/components/studio/Canvas.tsx
src/components/studio/Timeline.tsx
src/components/studio/ExportDialog.tsx
src/store/editor.ts
src/store/auth.ts
src/data/mockMusic.ts
src/data/mockTemplates.ts
package.json                           (add motion, zustand)
```

## Out of scope (explicit)

- Real AI video generation, real audio playback files, real video encoding — all simulated.
- No backend, no Lovable Cloud, no real auth — auth state lives in localStorage.
- No API keys requested.

Ready to switch to build mode when you approve.
