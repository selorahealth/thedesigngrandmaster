import { useEffect, useState } from "react";
import { deleteMedia, listMedia, uploadMedia, type MediaItem } from "@/lib/media";
import { bundledScreenNames } from "@/lib/screens";
import { Button } from "@/components/ui/button";

type Props = {
  folder: "project-screens" | "opening-book" | "course-covers";
  value?: string;
  onSelect?: (url: string) => void;
  aspect?: { width: number; height?: number };
  showBundled?: boolean;
};

/** Upload + pick images for project screens and opening-book logos. */
export function MediaPicker({ folder, value, onSelect, aspect, showBundled }: Props) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    try {
      setItems(await listMedia(folder));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load the media library");
    }
  };

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folder]);

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const item = await uploadMedia(file, folder, aspect ?? { width: 1600 });
        onSelect?.(item.url);
      }
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-4 rounded-xl border border-border p-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground">
          {busy ? "Uploading…" : "Upload image"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => void onFiles(e.target.files)}
          />
        </label>
        <Button type="button" variant="ghost" size="sm" onClick={() => void refresh()}>
          Refresh
        </Button>
        {error && <span className="text-xs text-destructive">{error}</span>}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.path}
            className={`group relative overflow-hidden rounded-lg border ${
              value === item.url ? "border-primary" : "border-border"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect?.(item.url)}
              className="block w-full"
              title={item.name}
            >
              <img src={item.url} alt={item.name} className="h-24 w-full object-cover" />
            </button>
            <button
              type="button"
              onClick={async () => {
                await deleteMedia(item.path);
                await refresh();
              }}
              className="absolute right-1 top-1 rounded bg-background/80 px-2 py-0.5 font-mono text-[9px] uppercase text-foreground opacity-0 transition group-hover:opacity-100"
            >
              Del
            </button>
          </div>
        ))}
      </div>

      {showBundled && (
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Bundled screens
          </p>
          <div className="flex flex-wrap gap-2">
            {bundledScreenNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onSelect?.(name)}
                className={`rounded-full border px-3 py-1 font-mono text-[10px] ${
                  value === name ? "border-primary text-primary" : "border-border text-muted-foreground"
                }`}
              >
                {name.replace(".png", "")}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
