import { Link } from "@tanstack/react-router";

export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 group ${className}`}>
      <div className="relative h-8 w-8 rounded-lg overflow-hidden shining-border">
        <div className="absolute inset-[2px] rounded-[6px] flex items-center justify-center font-black text-[11px] tracking-tighter neon-text bg-[oklch(0.16_0.04_275)]">
          82
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-[11px] tracking-[0.3em] text-muted-foreground">82</span>
        <span className="font-bold text-base tracking-tight neon-text">VIDEO AI</span>
      </div>
    </Link>
  );
}
