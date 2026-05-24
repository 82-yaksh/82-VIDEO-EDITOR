import { useRef, useState } from "react";
import { motion } from "motion/react";
import { Upload, Image as ImageIcon, Film, X } from "lucide-react";
import { useEditor } from "@/store/editor";

type LocalMedia = { id: string; kind: "image" | "video"; name: string; url: string; duration: number };

export function MediaTab() {
  const [items, setItems] = useState<LocalMedia[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const addClip = useEditor((s) => s.addClip);

  const ingest = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    const added: LocalMedia[] = [];
    for (const f of arr) {
      const isVideo = f.type.startsWith("video/");
      const isImage = f.type.startsWith("image/");
      if (!isVideo && !isImage) continue;
      const url = URL.createObjectURL(f);
      let duration = 4;
      if (isVideo) {
        duration = await new Promise<number>((resolve) => {
          const v = document.createElement("video");
          v.preload = "metadata";
          v.onloadedmetadata = () => resolve(Math.max(1, v.duration || 4));
          v.onerror = () => resolve(4);
          v.src = url;
        });
      }
      added.push({
        id: Math.random().toString(36).slice(2),
        kind: isVideo ? "video" : "image",
        name: f.name,
        url,
        duration: Math.round(duration * 10) / 10,
      });
    }
    setItems((p) => [...added, ...p]);
  };

  return (
    <div className="p-5 space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-1">Your Media</h3>
        <p className="text-xs text-muted-foreground">Drag in images or videos.</p>
      </div>

      <motion.div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          ingest(e.dataTransfer.files);
        }}
        onClick={() => fileInput.current?.click()}
        animate={{ scale: dragOver ? 1.02 : 1 }}
        className={`shining-border rounded-xl cursor-pointer`}
      >
        <div
          className={`rounded-xl p-6 text-center bg-[oklch(0.16_0.04_275)] transition ${
            dragOver ? "ring-2 ring-[oklch(0.7_0.27_330)]" : ""
          }`}
        >
          <div className="mx-auto h-10 w-10 rounded-full bg-gradient-to-br from-[oklch(0.7_0.22_250)] to-[oklch(0.7_0.27_330)] flex items-center justify-center mb-2">
            <Upload size={18} className="text-white" />
          </div>
          <div className="text-sm font-medium">Drop files here</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">or click to browse</div>
          <input
            ref={fileInput}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => e.target.files && ingest(e.target.files)}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        {items.map((it) => (
          <motion.div
            key={it.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative rounded-lg overflow-hidden aspect-video bg-[oklch(0.16_0.04_275)] border border-border/50 hover:border-[oklch(0.7_0.22_280_/_0.7)] transition cursor-pointer"
            onClick={() =>
              addClip({
                kind: it.kind,
                name: it.name,
                src: it.url,
                duration: it.duration,
              })
            }
          >
            {it.kind === "image" ? (
              <img src={it.url} alt={it.name} className="w-full h-full object-cover" />
            ) : (
              <video src={it.url} className="w-full h-full object-cover" muted />
            )}
            <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] flex items-center gap-1">
              {it.kind === "video" ? <Film size={9} /> : <ImageIcon size={9} />}
              {it.duration}s
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setItems((p) => p.filter((x) => x.id !== it.id));
              }}
              className="absolute top-1 right-1 h-5 w-5 rounded bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
            >
              <X size={10} />
            </button>
            <div className="absolute inset-x-0 bottom-0 px-1.5 py-1 bg-gradient-to-t from-black/80 to-transparent text-[10px] truncate">
              {it.name}
            </div>
          </motion.div>
        ))}
        {items.length === 0 && (
          <div className="col-span-2 text-center text-[11px] text-muted-foreground py-4">
            No media yet. Upload to get started.
          </div>
        )}
      </div>
    </div>
  );
}
