import { supabase } from "@/integrations/supabase/client";

export const MEDIA_BUCKET = "media";

/** Ten years — the site stores the returned URL directly in the project row. */
const SIGNED_URL_TTL = 60 * 60 * 24 * 365 * 10;

export type MediaItem = { path: string; name: string; url: string };

/**
 * Downscales and centre-crops an image in the browser so every uploaded screen
 * lands in the library with consistent dimensions.
 */
export async function processImage(
  file: File,
  opts: { width: number; height?: number } = { width: 1600 },
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const targetW = Math.min(opts.width, bitmap.width);
  const ratio = opts.height ? opts.width / opts.height : bitmap.width / bitmap.height;
  const targetH = Math.round(targetW / ratio);

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  // Centre-crop the source to the target aspect ratio before scaling.
  const srcRatio = bitmap.width / bitmap.height;
  let sx = 0;
  let sy = 0;
  let sw = bitmap.width;
  let sh = bitmap.height;
  if (srcRatio > ratio) {
    sw = Math.round(bitmap.height * ratio);
    sx = Math.round((bitmap.width - sw) / 2);
  } else if (srcRatio < ratio) {
    sh = Math.round(bitmap.width / ratio);
    sy = Math.round((bitmap.height - sh) / 2);
  }

  ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, targetW, targetH);
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", 0.92),
  );
  return blob ?? file;
}

function slugifyName(name: string) {
  return name
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function uploadMedia(
  file: File,
  folder: "project-screens" | "opening-book" | "course-covers",
  opts?: { width: number; height?: number },
): Promise<MediaItem> {
  const blob = await processImage(file, opts ?? { width: 1600 });
  const path = `${folder}/${Date.now()}-${slugifyName(file.name)}.webp`;
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, blob, { contentType: "image/webp", upsert: true });
  if (error) throw error;
  return { path, name: file.name, url: await signedUrl(path) };
}

export async function signedUrl(path: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .createSignedUrl(path, SIGNED_URL_TTL);
  if (error || !data) throw error ?? new Error("Could not sign media URL");
  return data.signedUrl;
}

export async function listMedia(
  folder: "project-screens" | "opening-book" | "course-covers",
): Promise<MediaItem[]> {
  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .list(folder, { limit: 200, sortBy: { column: "created_at", order: "desc" } });
  if (error || !data) return [];
  return Promise.all(
    data
      .filter((f) => f.name && !f.name.startsWith("."))
      .map(async (f) => ({
        path: `${folder}/${f.name}`,
        name: f.name,
        url: await signedUrl(`${folder}/${f.name}`),
      })),
  );
}

export async function deleteMedia(path: string) {
  await supabase.storage.from(MEDIA_BUCKET).remove([path]);
}
