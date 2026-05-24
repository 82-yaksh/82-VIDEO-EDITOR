import { useState } from "react";
import { Download, LogOut, User as UserIcon } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { useAuth } from "@/store/auth";
import { ExportDialog } from "./ExportDialog";

export function TopBar() {
  const [name, setName] = useState("Untitled Project");
  const [exportOpen, setExportOpen] = useState(false);
  const { user, openModal, signOut } = useAuth();

  return (
    <>
      <header className="h-14 px-4 flex items-center justify-between border-b border-border/40 glass rounded-none">
        <div className="flex items-center gap-4">
          <BrandLogo />
          <div className="h-5 w-px bg-border/60" />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none focus:bg-[oklch(0.2_0.04_275)] px-2 py-1 rounded"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExportOpen(true)}
            className="glow-button px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
          >
            <Download size={14} />
            Download 4K
          </button>

          {user ? (
            <div className="flex items-center gap-2 pl-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[oklch(0.7_0.22_250)] to-[oklch(0.7_0.27_330)] flex items-center justify-center text-xs font-bold">
                {user.name[0]?.toUpperCase()}
              </div>
              <button
                onClick={signOut}
                className="text-muted-foreground hover:text-foreground transition"
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={openModal}
              className="px-3 py-2 rounded-lg text-sm font-medium neon-input hover:border-[oklch(0.7_0.22_280_/_0.7)] flex items-center gap-1.5 transition"
            >
              <UserIcon size={13} /> Sign in
            </button>
          )}
        </div>
      </header>
      <ExportDialog open={exportOpen} onClose={() => setExportOpen(false)} />
    </>
  );
}
