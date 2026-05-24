// Curated stock video library. Each entry has keywords used to match a prompt.
// Each scene has a UNIQUE src so different prompts always pick different visuals.
export type Scene = {
  id: string;
  src: string;
  poster?: string;
  keywords: string[];
  label: string;
  duration: number;
};

// Google's public sample bucket — reliably hosted, no API keys.
const GTV = (name: string) =>
  `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${name}.mp4`;

export const SCENE_LIBRARY: Scene[] = [
  {
    id: "city-night",
    label: "Neon City at Night",
    src: "https://assets.mixkit.co/videos/4067/4067-720.mp4",
    keywords: ["city", "neon", "night", "tokyo", "skyline", "rain", "street", "urban", "cyberpunk", "downtown", "lights"],
    duration: 8,
  },
  {
    id: "ocean-waves",
    label: "Ocean Waves at Sunset",
    src: "https://assets.mixkit.co/videos/1190/1190-720.mp4",
    keywords: ["ocean", "sea", "wave", "water", "beach", "sunset", "blue", "tide", "shore", "coast"],
    duration: 8,
  },
  {
    id: "forest",
    label: "Forest Sunlight",
    src: "https://assets.mixkit.co/videos/4974/4974-720.mp4",
    keywords: ["forest", "tree", "nature", "jungle", "green", "leaves", "wood", "woods", "rainforest"],
    duration: 8,
  },
  {
    id: "mountains",
    label: "Mountain Peaks",
    src: "https://assets.mixkit.co/videos/4495/4495-720.mp4",
    keywords: ["mountain", "snow", "peak", "alps", "valley", "cliff", "hill", "himalaya", "summit"],
    duration: 8,
  },
  {
    id: "desert",
    label: "Desert Dunes",
    src: "https://assets.mixkit.co/videos/4612/4612-720.mp4",
    keywords: ["desert", "sand", "sahara", "dune", "dry", "golden", "arid", "wasteland"],
    duration: 8,
  },
  {
    id: "drone-city",
    label: "Drone City Flyover",
    src: "https://assets.mixkit.co/videos/4990/4990-720.mp4",
    keywords: ["drone", "aerial", "flyover", "skyline", "metropolis", "downtown", "building", "city"],
    duration: 8,
  },
  {
    id: "car-road",
    label: "Car on Road",
    src: "https://assets.mixkit.co/videos/4090/4090-720.mp4",
    keywords: ["car", "road", "drive", "highway", "vehicle", "vintage", "race", "speed", "auto"],
    duration: 8,
  },
  {
    id: "snow",
    label: "Snowy Winter",
    src: "https://assets.mixkit.co/videos/4969/4969-720.mp4",
    keywords: ["snow", "winter", "cold", "ice", "frozen", "blizzard", "arctic"],
    duration: 8,
  },
  // Distinct fallbacks from gtv bucket — guaranteed to play.
  {
    id: "space",
    label: "Cosmic Voyage",
    src: GTV("Sintel"),
    keywords: ["space", "galaxy", "star", "astronaut", "planet", "cosmic", "universe", "nebula", "sci-fi", "scifi", "alien", "futuristic"],
    duration: 8,
  },
  {
    id: "fireworks",
    label: "Fireworks",
    src: GTV("ForBiggerBlazes"),
    keywords: ["fireworks", "celebration", "party", "festival", "explosion", "light", "sparkle", "diwali", "newyear"],
    duration: 8,
  },
  {
    id: "abstract",
    label: "Abstract Motion",
    src: GTV("ElephantsDream"),
    keywords: ["abstract", "liquid", "paint", "fluid", "color", "psychedelic", "dream", "surreal", "art"],
    duration: 8,
  },
  {
    id: "underwater",
    label: "Underwater World",
    src: GTV("ForBiggerEscapes"),
    keywords: ["underwater", "fish", "coral", "diving", "reef", "deep", "marine", "jellyfish", "aquarium"],
    duration: 8,
  },
  {
    id: "sunset-field",
    label: "Golden Hour Field",
    src: GTV("ForBiggerJoyrides"),
    keywords: ["sunset", "field", "grass", "golden", "dusk", "horizon", "sunrise", "dawn", "meadow", "countryside"],
    duration: 8,
  },
  {
    id: "fire",
    label: "Fire Closeup",
    src: GTV("ForBiggerMeltdowns"),
    keywords: ["fire", "flame", "burn", "ember", "campfire", "blaze", "hot", "lava"],
    duration: 8,
  },
  {
    id: "clouds",
    label: "Sky Timelapse",
    src: GTV("ForBiggerFun"),
    keywords: ["cloud", "sky", "timelapse", "weather", "storm", "rain", "thunder", "atmosphere"],
    duration: 8,
  },
  {
    id: "action",
    label: "Action Sequence",
    src: GTV("TearsOfSteel"),
    keywords: ["action", "fight", "hero", "robot", "war", "battle", "mecha", "epic", "cinematic", "movie", "trailer"],
    duration: 8,
  },
  {
    id: "race",
    label: "Race & Speed",
    src: GTV("SubaruOutbackOnStreetAndDirt"),
    keywords: ["race", "rally", "dirt", "off-road", "track", "speed", "drift", "sport"],
    duration: 8,
  },
  {
    id: "wildlife",
    label: "Wildlife",
    src: GTV("BigBuckBunny"),
    keywords: ["animal", "wildlife", "rabbit", "bunny", "creature", "cute", "cartoon", "safari", "bird"],
    duration: 8,
  },
];

const STOPWORDS = new Set([
  "a","an","the","of","in","on","at","with","and","or","to","for","by","is","are","was","were",
  "be","been","it","its","this","that","these","those","my","your","our","their","i","we","you",
  "they","he","she","cinematic","shot","scene","video","clip","beautiful","stunning","ai","style",
  "look","like","very","really","super","over","into","from","as","while","then","also"
]);

function tokenize(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").split(/\s+/).filter(
    (w) => w.length > 1 && !STOPWORDS.has(w),
  );
}

export function pickSceneForPrompt(prompt: string): Scene {
  const tokens = tokenize(prompt);
  if (tokens.length === 0) {
    return SCENE_LIBRARY[Math.floor(Math.random() * SCENE_LIBRARY.length)];
  }
  let best: { scene: Scene; score: number } | null = null;
  for (const s of SCENE_LIBRARY) {
    let score = 0;
    for (const tok of tokens) {
      for (const k of s.keywords) {
        if (k === tok) score += 10;
        else if (k.includes(tok) || tok.includes(k)) score += 4;
      }
    }
    if (!best || score > best.score) best = { scene: s, score };
  }
  if (best && best.score > 0) return best.scene;
  // Deterministic fallback based on prompt so different prompts -> different scenes.
  const hash = tokens.join("").split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return SCENE_LIBRARY[hash % SCENE_LIBRARY.length];
}
