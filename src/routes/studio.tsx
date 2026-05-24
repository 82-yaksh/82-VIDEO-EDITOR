import { createFileRoute } from "@tanstack/react-router";
import { StudioLayout } from "@/components/studio/StudioLayout";
import { AuthModal } from "@/components/auth/AuthModal";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio · 82 Video AI" },
      { name: "description", content: "Generate, edit, and export cinematic AI video — all in your browser." },
      { property: "og:title", content: "Studio · 82 Video AI" },
      { property: "og:description", content: "Generate, edit, and export cinematic AI video — all in your browser." },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <>
      <StudioLayout />
      <AuthModal />
    </>
  );
}
