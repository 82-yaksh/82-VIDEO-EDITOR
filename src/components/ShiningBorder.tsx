import type { ReactNode } from "react";

export function ShiningBorder({
  children,
  className = "",
  inner = "",
}: {
  children: ReactNode;
  className?: string;
  inner?: string;
}) {
  return (
    <div className={`shining-border ${className}`}>
      <div className={`relative rounded-[inherit] ${inner}`}>{children}</div>
    </div>
  );
}
