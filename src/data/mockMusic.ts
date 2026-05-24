export type MockTrack = {
  id: string;
  title: string;
  artist: string;
  region: string;
  genre: string;
  mood: string;
  duration: number; // seconds
  bpm: number;
  color: string; // hex for waveform tint
};

export const GENRES = ["Pop", "Hip-Hop", "Cinematic", "Lo-Fi", "EDM", "Afrobeats", "K-Pop", "Latin", "Bollywood", "Ambient", "Rock", "Jazz"];
export const MOODS = ["Energetic", "Chill", "Epic", "Romantic", "Dark", "Uplifting", "Mysterious"];
export const REGIONS = ["Global", "USA", "UK", "Korea", "Japan", "India", "Brazil", "Nigeria", "Mexico", "France"];

export const MOCK_TRACKS: MockTrack[] = [
  { id: "t1", title: "Neon Skyline", artist: "AURA", region: "Global", genre: "EDM", mood: "Energetic", duration: 184, bpm: 128, color: "#3b82f6" },
  { id: "t2", title: "Midnight Drift", artist: "Kaito Mori", region: "Japan", genre: "Lo-Fi", mood: "Chill", duration: 212, bpm: 84, color: "#8b5cf6" },
  { id: "t3", title: "Lagos Heat", artist: "Tola", region: "Nigeria", genre: "Afrobeats", mood: "Energetic", duration: 198, bpm: 110, color: "#f59e0b" },
  { id: "t4", title: "Seoul Bloom", artist: "HYE", region: "Korea", genre: "K-Pop", mood: "Uplifting", duration: 176, bpm: 124, color: "#ec4899" },
  { id: "t5", title: "Bombay Express", artist: "Raahi", region: "India", genre: "Bollywood", mood: "Energetic", duration: 224, bpm: 118, color: "#f97316" },
  { id: "t6", title: "Crimson Orbit", artist: "Vael", region: "Global", genre: "Cinematic", mood: "Epic", duration: 256, bpm: 96, color: "#ef4444" },
  { id: "t7", title: "Paris After Dark", artist: "Lune", region: "France", genre: "Jazz", mood: "Romantic", duration: 240, bpm: 92, color: "#a855f7" },
  { id: "t8", title: "Favela Sunrise", artist: "Bruno R.", region: "Brazil", genre: "Latin", mood: "Uplifting", duration: 194, bpm: 105, color: "#22c55e" },
  { id: "t9", title: "Shadow Protocol", artist: "NULLR", region: "Global", genre: "Cinematic", mood: "Dark", duration: 268, bpm: 88, color: "#64748b" },
  { id: "t10", title: "Velvet Static", artist: "Mira", region: "USA", genre: "Pop", mood: "Chill", duration: 202, bpm: 100, color: "#06b6d4" },
  { id: "t11", title: "Glass Tower", artist: "AURA", region: "Global", genre: "Ambient", mood: "Mysterious", duration: 312, bpm: 70, color: "#0ea5e9" },
  { id: "t12", title: "Trap Royal", artist: "King Z", region: "USA", genre: "Hip-Hop", mood: "Energetic", duration: 188, bpm: 140, color: "#eab308" },
  { id: "t13", title: "London Fog", artist: "Ash", region: "UK", genre: "Rock", mood: "Dark", duration: 232, bpm: 116, color: "#475569" },
  { id: "t14", title: "Pulse Rider", artist: "Volt", region: "Global", genre: "EDM", mood: "Epic", duration: 220, bpm: 132, color: "#3b82f6" },
  { id: "t15", title: "Sakura Drift", artist: "Yuki", region: "Japan", genre: "Lo-Fi", mood: "Romantic", duration: 198, bpm: 78, color: "#f472b6" },
  { id: "t16", title: "Desert Mirage", artist: "Zahir", region: "Global", genre: "Cinematic", mood: "Mysterious", duration: 276, bpm: 92, color: "#d97706" },
  { id: "t17", title: "Reggaeton Rush", artist: "Dario", region: "Mexico", genre: "Latin", mood: "Energetic", duration: 192, bpm: 96, color: "#10b981" },
  { id: "t18", title: "Mumbai Monsoon", artist: "Ira", region: "India", genre: "Bollywood", mood: "Romantic", duration: 248, bpm: 88, color: "#a78bfa" },
  { id: "t19", title: "Soho Strut", artist: "Ash", region: "UK", genre: "Pop", mood: "Uplifting", duration: 184, bpm: 120, color: "#f43f5e" },
  { id: "t20", title: "Tokyo Neon", artist: "Kaito Mori", region: "Japan", genre: "EDM", mood: "Energetic", duration: 210, bpm: 130, color: "#22d3ee" },
  { id: "t21", title: "Echo Chamber", artist: "NULLR", region: "Global", genre: "Ambient", mood: "Dark", duration: 320, bpm: 64, color: "#334155" },
  { id: "t22", title: "Studio Gold", artist: "King Z", region: "USA", genre: "Hip-Hop", mood: "Chill", duration: 204, bpm: 92, color: "#facc15" },
  { id: "t23", title: "Carnival Lights", artist: "Bruno R.", region: "Brazil", genre: "Latin", mood: "Energetic", duration: 196, bpm: 112, color: "#84cc16" },
  { id: "t24", title: "Hangul Hearts", artist: "HYE", region: "Korea", genre: "K-Pop", mood: "Romantic", duration: 218, bpm: 102, color: "#e879f9" },
  { id: "t25", title: "Iron Sky", artist: "Vael", region: "Global", genre: "Cinematic", mood: "Epic", duration: 280, bpm: 100, color: "#94a3b8" },
  { id: "t26", title: "Naija Vibe", artist: "Tola", region: "Nigeria", genre: "Afrobeats", mood: "Uplifting", duration: 200, bpm: 108, color: "#fb923c" },
  { id: "t27", title: "Pastel Dreams", artist: "Mira", region: "USA", genre: "Pop", mood: "Romantic", duration: 188, bpm: 96, color: "#fda4af" },
  { id: "t28", title: "Cassette Future", artist: "Volt", region: "Global", genre: "Lo-Fi", mood: "Chill", duration: 224, bpm: 82, color: "#60a5fa" },
  { id: "t29", title: "Last Train Home", artist: "Lune", region: "France", genre: "Jazz", mood: "Mysterious", duration: 256, bpm: 86, color: "#c084fc" },
  { id: "t30", title: "Solar Flare", artist: "AURA", region: "Global", genre: "EDM", mood: "Epic", duration: 244, bpm: 138, color: "#fb7185" },
];
