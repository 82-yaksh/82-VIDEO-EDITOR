export type MockTrack = {
  id: string;
  title: string;
  artist: string;
  region: string;
  genre: string;
  mood: string;
  category: "Bollywood" | "Punjabi" | "Hollywood" | "Album" | "Solo" | "K-Pop" | "Latin" | "Afrobeats";
  duration: number; // seconds
  bpm: number;
  color: string;
  src: string; // real playable audio URL
};

export const GENRES = ["Pop", "Hip-Hop", "Cinematic", "Lo-Fi", "EDM", "Afrobeats", "K-Pop", "Latin", "Bollywood", "Punjabi", "Ambient", "Rock", "Jazz", "R&B", "Indie"];
export const MOODS = ["Energetic", "Chill", "Epic", "Romantic", "Dark", "Uplifting", "Mysterious", "Sad"];
export const CATEGORIES = ["Bollywood", "Punjabi", "Hollywood", "Album", "Solo", "K-Pop", "Latin", "Afrobeats"] as const;

// SoundHelix free CC audio examples — 16 tracks we cycle through for previews.
const AUDIO = (n: number) =>
  `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${((n - 1) % 16) + 1}.mp3`;

export const MOCK_TRACKS: MockTrack[] = [
  // ───── Bollywood ─────
  { id: "b1",  title: "Tum Hi Ho",            artist: "Arijit Singh",      region: "India",  genre: "Bollywood", mood: "Romantic", category: "Bollywood", duration: 262, bpm: 88,  color: "#f97316", src: AUDIO(1)  },
  { id: "b2",  title: "Kesariya",             artist: "Pritam · Arijit",   region: "India",  genre: "Bollywood", mood: "Romantic", category: "Bollywood", duration: 268, bpm: 96,  color: "#f59e0b", src: AUDIO(2)  },
  { id: "b3",  title: "Jhoome Jo Pathaan",    artist: "Vishal · Sheykhar", region: "India",  genre: "Bollywood", mood: "Energetic",category: "Bollywood", duration: 195, bpm: 122, color: "#ef4444", src: AUDIO(3)  },
  { id: "b4",  title: "Channa Mereya",        artist: "Arijit Singh",      region: "India",  genre: "Bollywood", mood: "Sad",      category: "Bollywood", duration: 285, bpm: 78,  color: "#a855f7", src: AUDIO(4)  },
  { id: "b5",  title: "Apna Bana Le",         artist: "Sachin-Jigar",      region: "India",  genre: "Bollywood", mood: "Romantic", category: "Bollywood", duration: 246, bpm: 92,  color: "#ec4899", src: AUDIO(5)  },
  { id: "b6",  title: "Naatu Naatu",          artist: "M.M. Keeravani",    region: "India",  genre: "Bollywood", mood: "Energetic",category: "Bollywood", duration: 207, bpm: 138, color: "#fb7185", src: AUDIO(6)  },
  { id: "b7",  title: "Raataan Lambiyan",     artist: "Tanishk · Asees",   region: "India",  genre: "Bollywood", mood: "Romantic", category: "Bollywood", duration: 232, bpm: 84,  color: "#f472b6", src: AUDIO(7)  },
  { id: "b8",  title: "Brown Munde",          artist: "AP Dhillon",        region: "India",  genre: "Bollywood", mood: "Energetic",category: "Bollywood", duration: 199, bpm: 118, color: "#eab308", src: AUDIO(8)  },
  { id: "b9",  title: "Bombay Express",       artist: "Raahi",             region: "India",  genre: "Bollywood", mood: "Energetic",category: "Bollywood", duration: 224, bpm: 118, color: "#f97316", src: AUDIO(9)  },
  { id: "b10", title: "Mumbai Monsoon",       artist: "Ira",               region: "India",  genre: "Bollywood", mood: "Romantic", category: "Bollywood", duration: 248, bpm: 88,  color: "#a78bfa", src: AUDIO(10) },

  // ───── Punjabi ─────
  { id: "p1",  title: "Jhol",                  artist: "Maanu · Annural Khalid", region: "Pakistan", genre: "Punjabi", mood: "Romantic", category: "Punjabi", duration: 195, bpm: 92,  color: "#22d3ee", src: AUDIO(11) },
  { id: "p2",  title: "Husn",                  artist: "Anuv Jain",         region: "India",  genre: "Punjabi", mood: "Romantic", category: "Punjabi", duration: 220, bpm: 80,  color: "#f472b6", src: AUDIO(12) },
  { id: "p3",  title: "Excuses",               artist: "AP Dhillon · Gurinder Gill", region: "Canada", genre: "Punjabi", mood: "Chill",    category: "Punjabi", duration: 187, bpm: 92,  color: "#fb923c", src: AUDIO(13) },
  { id: "p4",  title: "Talwinder",             artist: "Talwiinder · NDS",  region: "India",  genre: "Punjabi", mood: "Chill",    category: "Punjabi", duration: 198, bpm: 94,  color: "#34d399", src: AUDIO(14) },
  { id: "p5",  title: "Raat Di Gedi",          artist: "Talwiinder",        region: "India",  genre: "Punjabi", mood: "Chill",    category: "Punjabi", duration: 210, bpm: 90,  color: "#60a5fa", src: AUDIO(15) },
  { id: "p6",  title: "Insane",                artist: "AP Dhillon",        region: "Canada", genre: "Punjabi", mood: "Energetic",category: "Punjabi", duration: 188, bpm: 118, color: "#f43f5e", src: AUDIO(16) },
  { id: "p7",  title: "Dhurandhar (Theme)",    artist: "Pritam",            region: "India",  genre: "Cinematic", mood: "Epic", category: "Punjabi", duration: 232, bpm: 108, color: "#ef4444", src: AUDIO(1)  },
  { id: "p8",  title: "Softly",                artist: "Karan Aujla",       region: "Canada", genre: "Punjabi", mood: "Romantic", category: "Punjabi", duration: 196, bpm: 96,  color: "#a78bfa", src: AUDIO(2)  },
  { id: "p9",  title: "Tauba Tauba",           artist: "Karan Aujla",       region: "Canada", genre: "Punjabi", mood: "Energetic",category: "Punjabi", duration: 192, bpm: 124, color: "#fb7185", src: AUDIO(3)  },
  { id: "p10", title: "Laembadgini",           artist: "Diljit Dosanjh",    region: "India",  genre: "Punjabi", mood: "Energetic",category: "Punjabi", duration: 210, bpm: 122, color: "#facc15", src: AUDIO(4)  },
  { id: "p11", title: "G.O.A.T.",              artist: "Diljit Dosanjh",    region: "India",  genre: "Punjabi", mood: "Energetic",category: "Punjabi", duration: 207, bpm: 120, color: "#fde047", src: AUDIO(5)  },
  { id: "p12", title: "295",                   artist: "Sidhu Moose Wala",  region: "India",  genre: "Punjabi", mood: "Dark",     category: "Punjabi", duration: 234, bpm: 96,  color: "#64748b", src: AUDIO(6)  },

  // ───── Hollywood / Global Pop ─────
  { id: "h1",  title: "Blinding Lights",      artist: "The Weeknd",        region: "USA", genre: "Pop",      mood: "Energetic",category: "Hollywood", duration: 200, bpm: 171, color: "#ef4444", src: AUDIO(11) },
  { id: "h2",  title: "Flowers",              artist: "Miley Cyrus",       region: "USA", genre: "Pop",      mood: "Uplifting",category: "Hollywood", duration: 200, bpm: 118, color: "#f43f5e", src: AUDIO(12) },
  { id: "h3",  title: "As It Was",            artist: "Harry Styles",      region: "UK",  genre: "Pop",      mood: "Chill",    category: "Hollywood", duration: 167, bpm: 173, color: "#06b6d4", src: AUDIO(13) },
  { id: "h4",  title: "Anti-Hero",            artist: "Taylor Swift",      region: "USA", genre: "Pop",      mood: "Chill",    category: "Hollywood", duration: 200, bpm: 97,  color: "#a855f7", src: AUDIO(14) },
  { id: "h5",  title: "Cruel Summer",         artist: "Taylor Swift",      region: "USA", genre: "Pop",      mood: "Energetic",category: "Hollywood", duration: 178, bpm: 170, color: "#ec4899", src: AUDIO(15) },
  { id: "h6",  title: "Espresso",             artist: "Sabrina Carpenter", region: "USA", genre: "Pop",      mood: "Uplifting",category: "Hollywood", duration: 175, bpm: 104, color: "#facc15", src: AUDIO(16) },
  { id: "h7",  title: "God's Plan",           artist: "Drake",             region: "USA", genre: "Hip-Hop",  mood: "Chill",    category: "Hollywood", duration: 198, bpm: 77,  color: "#eab308", src: AUDIO(1)  },
  { id: "h8",  title: "Bad Habit",            artist: "Steve Lacy",        region: "USA", genre: "R&B",      mood: "Romantic", category: "Hollywood", duration: 232, bpm: 168, color: "#22c55e", src: AUDIO(2)  },
  { id: "h9",  title: "Stay",                 artist: "Kid LAROI · Bieber",region: "USA", genre: "Pop",      mood: "Sad",      category: "Hollywood", duration: 141, bpm: 170, color: "#60a5fa", src: AUDIO(3)  },
  { id: "h10", title: "Levitating",           artist: "Dua Lipa",          region: "UK",  genre: "Pop",      mood: "Energetic",category: "Hollywood", duration: 203, bpm: 103, color: "#e879f9", src: AUDIO(4)  },

  // ───── K-Pop ─────
  { id: "k1", title: "Dynamite",   artist: "BTS",        region: "Korea", genre: "K-Pop", mood: "Energetic",category: "K-Pop", duration: 199, bpm: 114, color: "#f472b6", src: AUDIO(5) },
  { id: "k2", title: "How You Like That", artist: "BLACKPINK", region: "Korea", genre: "K-Pop", mood: "Energetic",category: "K-Pop", duration: 182, bpm: 130, color: "#ec4899", src: AUDIO(6) },
  { id: "k3", title: "Seoul Bloom", artist: "HYE",       region: "Korea", genre: "K-Pop", mood: "Uplifting",category: "K-Pop", duration: 176, bpm: 124, color: "#fb7185", src: AUDIO(7) },
  { id: "k4", title: "Hangul Hearts", artist: "HYE",     region: "Korea", genre: "K-Pop", mood: "Romantic", category: "K-Pop", duration: 218, bpm: 102, color: "#e879f9", src: AUDIO(8) },

  // ───── Latin ─────
  { id: "l1", title: "Despacito",      artist: "Luis Fonsi",  region: "Puerto Rico", genre: "Latin", mood: "Energetic", category: "Latin", duration: 229, bpm: 89,  color: "#22c55e", src: AUDIO(9)  },
  { id: "l2", title: "Tití Me Preguntó", artist: "Bad Bunny", region: "Puerto Rico", genre: "Latin", mood: "Energetic", category: "Latin", duration: 242, bpm: 106, color: "#84cc16", src: AUDIO(10) },
  { id: "l3", title: "Reggaeton Rush", artist: "Dario",       region: "Mexico",      genre: "Latin", mood: "Energetic", category: "Latin", duration: 192, bpm: 96,  color: "#10b981", src: AUDIO(11) },
  { id: "l4", title: "Carnival Lights",artist: "Bruno R.",    region: "Brazil",      genre: "Latin", mood: "Energetic", category: "Latin", duration: 196, bpm: 112, color: "#facc15", src: AUDIO(12) },

  // ───── Afrobeats ─────
  { id: "a1", title: "Last Last", artist: "Burna Boy", region: "Nigeria", genre: "Afrobeats", mood: "Chill",    category: "Afrobeats", duration: 173, bpm: 102, color: "#fb923c", src: AUDIO(13) },
  { id: "a2", title: "Lagos Heat",artist: "Tola",      region: "Nigeria", genre: "Afrobeats", mood: "Energetic",category: "Afrobeats", duration: 198, bpm: 110, color: "#f59e0b", src: AUDIO(14) },
  { id: "a3", title: "Naija Vibe",artist: "Tola",      region: "Nigeria", genre: "Afrobeats", mood: "Uplifting",category: "Afrobeats", duration: 200, bpm: 108, color: "#fb923c", src: AUDIO(15) },

  // ───── Album cuts (cinematic / curated) ─────
  { id: "al1", title: "Crimson Orbit",    artist: "Vael",  region: "Global", genre: "Cinematic", mood: "Epic",      category: "Album", duration: 256, bpm: 96,  color: "#ef4444", src: AUDIO(16) },
  { id: "al2", title: "Iron Sky",         artist: "Vael",  region: "Global", genre: "Cinematic", mood: "Epic",      category: "Album", duration: 280, bpm: 100, color: "#94a3b8", src: AUDIO(1)  },
  { id: "al3", title: "Shadow Protocol",  artist: "NULLR", region: "Global", genre: "Cinematic", mood: "Dark",      category: "Album", duration: 268, bpm: 88,  color: "#64748b", src: AUDIO(2)  },
  { id: "al4", title: "Echo Chamber",     artist: "NULLR", region: "Global", genre: "Ambient",   mood: "Dark",      category: "Album", duration: 320, bpm: 64,  color: "#334155", src: AUDIO(3)  },
  { id: "al5", title: "Glass Tower",      artist: "AURA",  region: "Global", genre: "Ambient",   mood: "Mysterious",category: "Album", duration: 312, bpm: 70,  color: "#0ea5e9", src: AUDIO(4)  },
  { id: "al6", title: "Desert Mirage",    artist: "Zahir", region: "Global", genre: "Cinematic", mood: "Mysterious",category: "Album", duration: 276, bpm: 92,  color: "#d97706", src: AUDIO(5)  },
  { id: "al7", title: "Solar Flare",      artist: "AURA",  region: "Global", genre: "EDM",       mood: "Epic",      category: "Album", duration: 244, bpm: 138, color: "#fb7185", src: AUDIO(6)  },
  { id: "al8", title: "Pulse Rider",      artist: "Volt",  region: "Global", genre: "EDM",       mood: "Epic",      category: "Album", duration: 220, bpm: 132, color: "#3b82f6", src: AUDIO(7)  },

  // ───── Solo / Acoustic ─────
  { id: "s1", title: "Midnight Drift",   artist: "Kaito Mori", region: "Japan",  genre: "Lo-Fi",  mood: "Chill",    category: "Solo", duration: 212, bpm: 84, color: "#8b5cf6", src: AUDIO(8)  },
  { id: "s2", title: "Sakura Drift",     artist: "Yuki",       region: "Japan",  genre: "Lo-Fi",  mood: "Romantic", category: "Solo", duration: 198, bpm: 78, color: "#f472b6", src: AUDIO(9)  },
  { id: "s3", title: "Paris After Dark", artist: "Lune",       region: "France", genre: "Jazz",   mood: "Romantic", category: "Solo", duration: 240, bpm: 92, color: "#a855f7", src: AUDIO(10) },
  { id: "s4", title: "Last Train Home",  artist: "Lune",       region: "France", genre: "Jazz",   mood: "Mysterious",category:"Solo", duration: 256, bpm: 86, color: "#c084fc", src: AUDIO(11) },
  { id: "s5", title: "Velvet Static",    artist: "Mira",       region: "USA",    genre: "Indie",  mood: "Chill",    category: "Solo", duration: 202, bpm: 100,color: "#06b6d4", src: AUDIO(12) },
  { id: "s6", title: "Pastel Dreams",    artist: "Mira",       region: "USA",    genre: "Pop",    mood: "Romantic", category: "Solo", duration: 188, bpm: 96, color: "#fda4af", src: AUDIO(13) },
  { id: "s7", title: "London Fog",       artist: "Ash",        region: "UK",     genre: "Rock",   mood: "Dark",     category: "Solo", duration: 232, bpm: 116,color: "#475569", src: AUDIO(14) },
  { id: "s8", title: "Cassette Future",  artist: "Volt",       region: "Global", genre: "Lo-Fi",  mood: "Chill",    category: "Solo", duration: 224, bpm: 82, color: "#60a5fa", src: AUDIO(15) },
];
