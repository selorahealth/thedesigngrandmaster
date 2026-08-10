import { createFileRoute } from "@tanstack/react-router";
import { useAdmin } from "@/hooks/useAdmin";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { AdminFrame } from "./index";

export const Route = createFileRoute("/_authenticated/admin/media")({
  component: MediaLibrary,
});

function MediaLibrary() {
  const { isAdmin, loading } = useAdmin();
  if (loading) return <AdminFrame>Checking access…</AdminFrame>;
  if (!isAdmin) return <AdminFrame>You need an admin role to manage media.</AdminFrame>;

  return (
    <AdminFrame>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Assets
        </p>
        <h1 className="font-display text-3xl text-foreground">Media library</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Uploads are resized and centre-cropped on the way in: project screens at 1600px wide,
          opening-book logos at 480×240 so the strip stays even.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground">Project screens</h2>
        <MediaPicker folder="project-screens" aspect={{ width: 1600 }} />
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground">Opening-book logos</h2>
        <MediaPicker folder="opening-book" aspect={{ width: 480, height: 240 }} />
      </section>
    </AdminFrame>
  );
}
