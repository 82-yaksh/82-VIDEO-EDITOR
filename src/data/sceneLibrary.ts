// Curated stock video library. Each entry has keywords used to match a prompt.
// Videos are free CDN-hosted mp4s (Mixkit / Google sample bucket) — no API keys required.
export type Scene = {
  id: string;
  src: string;
  poster?: string;
  keywords: string[];
  label: string;
  duration: number;
};

export const SCENE_LIBRARY: Scene[] = [
  {
    id: "city-night",
    label: "Neon City at Night",
    src: "https://assets.mixkit.co/videos/4067/4067-720.mp4",
    keywords: ["city", "neon", "night", "tokyo", "skyline", "rain", "street", "urban", "cyberpunk"],
    duration: 8,
  },
  {
    id: "ocean-waves",
    label: "Ocean Waves at Sunset",
    src: "https://assets.mixkit.co/videos/1190/1190-720.mp4",
    keywords: ["ocean", "sea", "wave", "water", "beach", "sunset", "blue"],
    duration: 8,
  },
  {
    id: "forest",
    label: "Forest Sunlight",
    src: "https://assets.mixkit.co/videos/4974/4974-720.mp4",
    keywords: ["forest", "tree", "nature", "jungle", "green", "leaves", "wood"],
    duration: 8,
  },
  {
    id: "mountains",
    label: "Mountain Peaks",
    src: "https://assets.mixkit.co/videos/4495/4495-720.mp4",
    keywords: ["mountain", "snow", "peak", "alps", "valley", "cliff"],
    duration: 8,
  },
  {
    id: "desert",
    label: "Desert Dunes",
    src: "https://assets.mixkit.co/videos/4612/4612-720.mp4",
    keywords: ["desert", "sand", "sahara", "dune", "dry", "golden"],
    duration: 8,
  },
  {
    id: "space",
    label: "Galaxy in Space",
    src: "https://assets.mixkit.co/videos/4067/4067-720.mp4",
    keywords: ["space", "galaxy", "star", "astronaut", "planet", "cosmic", "universe", "nebula"],
    duration: 8,
  },
  {
    id: "fireworks",
    label: "Fireworks",
    src: "https://assets.mixkit.co/videos/4054/4054-720.mp4",
    keywords: ["fireworks", "celebration", "party", "festival", "explosion", "light", "sparkle"],
    duration: 8,
  },
  {
    id: "drone-city",
    label: "Drone City Flyover",
    src: "https://assets.mixkit.co/videos/4990/4990-720.mp4",
    keywords: ["drone", "aerial", "flyover", "skyline", "metropolis", "downtown", "building"],
    duration: 8,
  },
  {
    id: "car-road",
    label: "Car on Road",
    src: "https://assets.mixkit.co/videos/4090/4090-720.mp4",
    keywords: ["car", "road", "drive", "highway", "vehicle", "vintage", "race"],
    duration: 8,
  },
  {
    id: "abstract",
    label: "Abstract Liquid",
    src: "https://assets.mixkit.co/videos/4067/4067-720.mp4",
    keywords: ["abstract", "liquid", "paint", "fluid", "color", "psychedelic"],
    duration: 8,
  },
  {
    id: "snow",
    label: "Snowy Winter",
    src: "https://assets.mixkit.co/videos/4969/4969-720.mp4",
    keywords: ["snow", "winter", "cold", "ice", "frozen", "blizzard"],
    duration: 8,
  },
  {
    id: "underwater",
    label: "Underwater Coral",
    src: "https://assets.mixkit.co/videos/4990/4990-720.mp4",
    keywords: ["underwater", "fish", "coral", "diving", "reef", "deep", "marine", "jellyfish"],
    duration: 8,
  },
  {
    id: "sunset-field",
    label: "Sunset Field",
    src: "https://assets.mixkit.co/videos/4974/4974-720.mp4",
    keywords: ["sunset", "field", "grass", "golden hour", "dusk", "horizon", "sunrise"],
    duration: 8,
  },
  {
    id: "fire",
    label: "Fire Closeup",
    src: "https://assets.mixkit.co/videos/4054/4054-720.mp4",
    keywords: ["fire", "flame", "burn", "ember", "campfire", "blaze"],
    duration: 8,
  },
  {
    id: "clouds",
    label: "Clouds Timelapse",
    src: "https://assets.mixkit.co/videos/4495/4495-720.mp4",
    keywords: ["cloud", "sky", "timelapse", "weather", "storm", "rain"],
    duration: 8,
  },
];

export function pickSceneForPrompt(prompt: string): Scene {
  const p = prompt.toLowerCase();
  let best: { scene: Scene; score: number } | null = null;
  for (const s of SCENE_LIBRARY) {
    let score = 0;
    for (const k of s.keywords) if (p.includes(k)) score += k.length;
    if (!best || score > best.score) best = { scene: s, score };
  }
  if (best && best.score > 0) return best.scene;
  return SCENE_LIBRARY[Math.floor(Math.random() * SCENE_LIBRARY.length)];
}
