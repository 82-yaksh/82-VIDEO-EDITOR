import { TopBar } from "./TopBar";
import { LeftPanel } from "./LeftPanel";
import { Canvas } from "./Canvas";
import { Timeline } from "./Timeline";

export function StudioLayout() {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <TopBar />
      <div className="flex-1 flex gap-2 p-2 overflow-hidden min-h-0">
        <div className="w-[320px] shrink-0">
          <LeftPanel />
        </div>
        <div className="flex-1 min-w-0">
          <Canvas />
        </div>
      </div>
      <div className="h-[220px] shrink-0 px-2 pb-2">
        <Timeline />
      </div>
    </div>
  );
}
