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

const CURATED: MockTrack[] = [
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

// ───────────────────────────────────────────────────────────────────
// Generated catalog — expands the library to 2000+ searchable tracks.
// Deterministic so search results stay stable across reloads.
// ───────────────────────────────────────────────────────────────────

type Cat = MockTrack["category"];

const POOLS: Record<Cat, { artists: string[]; titles: string[]; region: string; genre: string }> = {
  Bollywood: {
    region: "India",
    genre: "Bollywood",
    artists: ["Arijit Singh","Shreya Ghoshal","Pritam","A.R. Rahman","Neha Kakkar","Atif Aslam","Sonu Nigam","Vishal-Shekhar","Sachin-Jigar","Jubin Nautiyal","Armaan Malik","Darshan Raval","Tanishk Bagchi","Amit Trivedi","Shankar-Ehsaan-Loy","Mohit Chauhan","KK","Sunidhi Chauhan","Asees Kaur","Palak Muchhal","Badshah","Honey Singh","Raghav Chaitanya","Stebin Ben","Dhvani Bhanushali","Nikhita Gandhi","Jonita Gandhi","Benny Dayal","Mika Singh","Kailash Kher"],
    titles: ["Tum Hi Ho","Kesariya","Channa Mereya","Apna Bana Le","Raataan Lambiyan","Tum Se Hi","Agar Tum Saath Ho","Phir Bhi Tumko Chaahunga","Bekhayali","Hawayein","Jeene Laga Hoon","Tera Ban Jaunga","Mere Mehboob Mere Sanam","Tujh Mein Rab Dikhta Hai","Raabta","Pee Loon","Tere Bina","Saiyaara","Pehla Nasha","Chaiyya Chaiyya","Tujhe Kitna Chahne Lage","Galliyan","Sun Raha Hai","Mast Magan","Manwa Laage","Jashn-e-Bahara","Iktara","Nadaan Parindey","Yeh Honsla","Kabira","Phir Le Aaya Dil","Tere Sang Yaara","Ban Ja Rani","Mere Naam Tu","Ghungroo","Malang","Tere Liye","Ae Watan","Zara Sa","Khairiyat","Tum Mile","Tujhko Jo Paya","Tu Hi Re","Roke Na Ruke","Aaj Phir","Bolna","Sajna","Janam Janam","Halka Halka","Tera Yaar Hoon Main","Dil Diyan Gallan","Tere Hawaale","Tum Kya Mile","Heeriye","Ranjha","Maan Meri Jaan","Pasoori","Mehrama","Sham","Ve Maahi","O Saathi"],
  },
  Punjabi: {
    region: "India",
    genre: "Punjabi",
    artists: ["AP Dhillon","Diljit Dosanjh","Karan Aujla","Sidhu Moose Wala","Shubh","Talwiinder","NDS","Gurinder Gill","Babbu Maan","Jazzy B","Hardy Sandhu","Guru Randhawa","Jasmine Sandlas","Garry Sandhu","Prem Dhillon","Amrit Maan","Ranjit Bawa","Ammy Virk","Mankirt Aulakh","Parmish Verma","Inder Chahal","B Praak","Jass Manak","Bohemia","Imran Khan","Maninder Buttar","Khan Saab","Akhil","Sharry Mann","Kambi Rajpuria"],
    titles: ["Brown Munde","Excuses","Insane","Tauba Tauba","Softly","Laembadgini","G.O.A.T.","295","Jhol","Husn","Raat Di Gedi","Lover","Jugni","Patiala Peg","Outfit","Without You","Daku","Cheques","Admirin' You","No Love","Elevated","High Rated Gabru","Suit Suit","Lahore","Made In India","Slowly Slowly","Ishare Tere","Yaarian","Chitta Kurta","Coka","Sip Sip","Dollar","Naah","Backbone","Soch","Tere Naal Rehna","Pind Aale Yaar","Born To Shine","8 Asle","Dakuaan Da Munda","52 Bars","Players","Sukoon","Sahiba","Kya Baat Ay","Joker","Goliyan","Designer","Kalla Sohna Nai","Tu Ne Maari Entriyaan","Kade Kade","Same Beef","So High","Old Skool","Bamb Aagya","Snitches","Vibe","Dior","Antidote"],
  },
  Hollywood: {
    region: "USA",
    genre: "Pop",
    artists: ["Taylor Swift","The Weeknd","Drake","Dua Lipa","Billie Eilish","Ariana Grande","Ed Sheeran","Post Malone","Bruno Mars","Justin Bieber","Olivia Rodrigo","Sabrina Carpenter","Doja Cat","SZA","Harry Styles","Adele","Beyoncé","Rihanna","Travis Scott","Kendrick Lamar","Coldplay","Imagine Dragons","Maroon 5","Lana Del Rey","Lady Gaga","Miley Cyrus","Charlie Puth","Shawn Mendes","Selena Gomez","Camila Cabello","Halsey","Khalid","Bebe Rexha","Zayn","Bad Bunny","Future","Travis Barker","David Guetta","Calvin Harris","Marshmello","Kygo","Avicii","Linkin Park","Eminem","J. Cole"],
    titles: ["Blinding Lights","Flowers","Anti-Hero","Cruel Summer","As It Was","Espresso","God's Plan","Stay","Levitating","Bad Habit","Save Your Tears","Watermelon Sugar","Shape of You","Sunflower","Peaches","Heat Waves","Calm Down","Unholy","Vampire","Houdini","Paint The Town Red","Greedy","Lose Control","Snooze","Kill Bill","About Damn Time","Industry Baby","Stay With Me","Despacito","Senorita","Believer","Thunder","Demons","Radioactive","Counting Stars","Memories","Sugar","Girls Like You","Animals","Payphone","Photograph","Perfect","Thinking Out Loud","Castle on the Hill","Bad Blood","Look What You Made Me Do","Lover","Willow","Cardigan","Bejeweled","Karma","Style","Wildest Dreams","Shake It Off","All Too Well","Enchanted","August","The 1","Exile","Champagne Problems","Vigilante Shit","Mastermind","Snow on the Beach","Lavender Haze","Maroon","Midnight Rain"],
  },
  "K-Pop": {
    region: "Korea",
    genre: "K-Pop",
    artists: ["BTS","BLACKPINK","TWICE","NewJeans","Stray Kids","SEVENTEEN","ENHYPEN","TXT","aespa","ITZY","IVE","LE SSERAFIM","(G)I-DLE","Red Velvet","EXO","NCT 127","NCT Dream","ATEEZ","TREASURE","MAMAMOO","IU","TAEYEON","ROSÉ","JISOO","JENNIE","LISA","Jungkook","Jimin","V","J-Hope","RM","Suga","BoA","PSY","Zico"],
    titles: ["Dynamite","Butter","Permission to Dance","Boy With Luv","Fake Love","DNA","Idol","Mic Drop","Spring Day","How You Like That","Kill This Love","Pink Venom","Shut Down","Pretty Savage","Lovesick Girls","Ice Cream","Ddu-Du Ddu-Du","Whistle","As If It's Your Last","Playing With Fire","Stay","Fancy","Talk That Talk","I Can't Stop Me","Cheer Up","TT","Like Ooh-Ahh","Heart Shaker","What is Love?","Yes or Yes","Feel Special","Hype Boy","Attention","Ditto","Cookie","OMG","Super Shy","ETA","Get Up","God's Menu","Back Door","Thunderous","Maniac","Case 143","Topline","S-Class","Lalalala","Chk Chk Boom","Walkin' On Water","Drunk-Dazed","Polaroid Love","Bite Me","Future Perfect","Fever","Sweet Venom","Bills","Antifragile","Unforgiven","Fearless","Eve, Psyche & The Bluebeard's Wife","Smart","Easy","Tomboy","Nxde","Queencard","Allergy","I Want That","Power Up","Psycho","Feel My Rhythm","Birthday","Chill Kill"],
  },
  Latin: {
    region: "Latin America",
    genre: "Latin",
    artists: ["Bad Bunny","J Balvin","Karol G","Shakira","Rosalía","Maluma","Ozuna","Daddy Yankee","Anuel AA","Rauw Alejandro","Feid","Quevedo","Peso Pluma","Manuel Turizo","Sebastián Yatra","Camilo","Becky G","Natti Natasha","Nicky Jam","Luis Fonsi","Marc Anthony","Ricky Martin","Romeo Santos","Prince Royce","Enrique Iglesias","Carlos Vives","Juanes","Maná","Reik","Aventura"],
    titles: ["Despacito","Tití Me Preguntó","Me Porto Bonito","Moscow Mule","Efecto","Provenza","TQG","Mi Ex Tenía Razón","Bichota","Mamiii","Tusa","Hawái","Felices los 4","Mi Gente","X","Con Calma","Dura","Gasolina","Limbo","Vivir Mi Vida","Bailando","La Tortura","Waka Waka","Hips Don't Lie","Loca","Chantaje","Me Enamoré","Despechá","Bzrp Music Sessions","Saoko","Hentai","Motomami","La Fama","Calma","Pareja del Año","La Bachata","El Merengue","Pepas","La Jeepeta","Yonaguni","Dakiti","Safaera","Yo Perreo Sola","La Romana","Callaita","Soy Peor","Vete","Adicto","Reloj","Sigues Con Él","Tattoo","Loco Contigo","Taki Taki","I Like It","I Like Me Better","La Modelo","Te Boté","Felices los 4","Sin Pijama","Criminal"],
  },
  Afrobeats: {
    region: "Nigeria",
    genre: "Afrobeats",
    artists: ["Burna Boy","Wizkid","Davido","Rema","Tems","Asake","CKay","Omah Lay","Fireboy DML","Joeboy","Tiwa Savage","Yemi Alade","Mr Eazi","Adekunle Gold","Simi","Olamide","Patoranking","Runtown","Kizz Daniel","Ayra Starr","Black Sherif","Sarkodie","Stonebwoy","Shatta Wale","Diamond Platnumz"],
    titles: ["Last Last","Calm Down","Essence","Peru","Finesse","Sungba","Terminator","Bandana","Joha","Organise","Soso","Rush","Bloody Samaritan","Ginger","Love Nwantiti","Understand","On The Low","Beggie Beggie","Ku Lo Sa","Buga","Common Person","Bandana","Amapiano","Yebba's Heartbreak","Anoti","People","Damages","All Over","Mama","Soco","Daddy Yo","Mad Over You","Fall","If","FEM","Wonderful","Bounce","Loaded","Pana","Mr Money","Kwaku The Traveller","Second Sermon","Konongo Zongo","Sad Girlz Luv Money","Sungba Remix","Peace Be Unto You","2 Sugar"],
  },
  Album: {
    region: "Global",
    genre: "Cinematic",
    artists: ["Vael","NULLR","AURA","Zahir","Volt","Hans Zimmer","Ludwig Göransson","Ramin Djawadi","M83","ODESZA","Bonobo","Tycho","Nils Frahm","Ólafur Arnalds","Max Richter","Jon Hopkins","Float","Glasswave","Solaris","Echoform","Nova Drift","Vermilion","Cobalt","Lumen","Atlas Sky","Ironwave","Skyglass","Silent Era","Northwind","Polaris"],
    titles: ["Crimson Orbit","Iron Sky","Shadow Protocol","Echo Chamber","Glass Tower","Desert Mirage","Solar Flare","Pulse Rider","Event Horizon","Aurora Drift","Northern Lights","Subzero","Obsidian","Lunar Tide","Quantum Field","Helix","Vector","Parallax","Continuum","Threshold","Nebula","Phoenix Rising","Tundra","Monolith","Cathedral","Architect","Concrete Sky","Iron Heart","Steel Rain","Cobalt Dream","Velvet Storm","Onyx","Marble","Granite","Ember","Halcyon","Reverie","Mirage","Cascade","Verglas","Wraith","Phantom Limb","Silent Engine","Black Sun","Aether","Sunder","Tempest","Origin","Foundation","Singularity","Apex","Genesis","Exodus","Outpost","Frontier","Polaris","Northstar","Lighthouse","Anchor","Compass"],
  },
  Solo: {
    region: "Global",
    genre: "Indie",
    artists: ["Kaito Mori","Yuki","Lune","Mira","Ash","Volt","Ren","Sora","Hana","Kai","Ivy","Wren","Sage","Juno","Cleo","Niko","Theo","Eli","Nova","Indi","Otis","Rome","Sol","Vera","Wilder","Yara","Zane","Aria","Bex","Cora","Dax","Echo","Fox","Greta","Halo","Iris","Jude","Knox","Lyra","Mara","Nash","Onyx","Pax","Quinn","Reese","Sable","Tora","Una","Vale","Wynn","Xan","Yael","Zia"],
    titles: ["Midnight Drift","Sakura Drift","Paris After Dark","Last Train Home","Velvet Static","Pastel Dreams","London Fog","Cassette Future","Coffee & Rain","Slow Burn","Soft Focus","Window Seat","Empty Rooms","Quiet Hours","Long Way Home","Off The Map","Saltwater","Lavender","Goldenrod","Bluebell","Wildflower","Driftwood","Seashell","Tidepool","Cliffside","Hollow","Lantern","Embers","First Snow","Almost Spring","Late August","September Soft","October Sky","November Sun","Year of the Cat","Telephones","Postcards","Polaroids","Old Films","Home Movies","Backyard","Front Porch","Garden Bed","Stargazer","Daydream","Sleepwalk","Heartbeat","Wide Awake","Wishbone","Hourglass","Paper Plane","Folded Notes","Letter Box","Open Window","Half Light","Soft Edges","Slow Dance","Closer","Linger","Stay Awhile"],
  },
};

const MOODS_BY_GENRE: Record<string, string[]> = {
  Bollywood: ["Romantic","Energetic","Sad","Uplifting"],
  Punjabi: ["Energetic","Chill","Romantic","Dark"],
  Pop: ["Energetic","Chill","Uplifting","Romantic"],
  "K-Pop": ["Energetic","Uplifting","Romantic","Chill"],
  Latin: ["Energetic","Romantic","Uplifting","Chill"],
  Afrobeats: ["Chill","Energetic","Uplifting","Romantic"],
  Cinematic: ["Epic","Dark","Mysterious","Uplifting"],
  Indie: ["Chill","Romantic","Sad","Mysterious"],
};

const COLORS = ["#f97316","#f59e0b","#ef4444","#a855f7","#ec4899","#fb7185","#f472b6","#eab308","#22d3ee","#34d399","#60a5fa","#f43f5e","#facc15","#a78bfa","#22c55e","#84cc16","#10b981","#fb923c","#06b6d4","#8b5cf6","#3b82f6","#e879f9","#0ea5e9","#d97706","#94a3b8","#64748b","#475569","#c084fc","#fda4af","#fde047"];

// Simple deterministic PRNG so the catalog is stable.
let _seed = 0xC0FFEE;
const rand = () => {
  _seed = (_seed * 1664525 + 1013904223) >>> 0;
  return _seed / 0xFFFFFFFF;
};
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];

const VARIANT_SUFFIX = ["", " (Reprise)", " (Acoustic)", " (Remix)", " (Slowed)", " (Reverb)", " (Live)", " (Extended)", " — Pt. II", " — Pt. III", " (Lo-Fi Mix)", " (Club Edit)", " (VIP Mix)", " (Sunset Version)", " (Midnight Edit)", " (Radio Edit)", " (Orchestral)", " (Piano Version)", " (Night Mix)", " (Echo Mix)"];

const TOTAL_GENERATED = 2050;
const GENERATED: MockTrack[] = [];
const cats = Object.keys(POOLS) as Cat[];

for (let i = 0; i < TOTAL_GENERATED; i++) {
  const cat = cats[i % cats.length];
  const pool = POOLS[cat];
  const baseTitle = pool.titles[Math.floor(rand() * pool.titles.length)];
  const suffix = rand() < 0.55 ? "" : VARIANT_SUFFIX[Math.floor(rand() * VARIANT_SUFFIX.length)];
  const artist = pool.artists[Math.floor(rand() * pool.artists.length)];
  const secondary = rand() < 0.18 ? ` · ${pool.artists[Math.floor(rand() * pool.artists.length)]}` : "";
  const moodPool = MOODS_BY_GENRE[pool.genre] || MOODS;
  GENERATED.push({
    id: `g${i + 1}`,
    title: (baseTitle + suffix).trim(),
    artist: artist + secondary,
    region: pool.region,
    genre: pool.genre,
    mood: moodPool[Math.floor(rand() * moodPool.length)],
    category: cat,
    duration: 150 + Math.floor(rand() * 180),
    bpm: 70 + Math.floor(rand() * 90),
    color: pick(COLORS),
    src: AUDIO(i + 1),
  });
}

// De-duplicate by title + artist while preserving curated order at the top.
const _seen = new Set<string>();
export const MOCK_TRACKS: MockTrack[] = [...CURATED, ...GENERATED].filter((t) => {
  const k = `${t.title.toLowerCase()}|${t.artist.toLowerCase()}`;
  if (_seen.has(k)) return false;
  _seen.add(k);
  return true;
});

