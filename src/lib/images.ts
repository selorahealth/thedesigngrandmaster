/**
 * Image delivery helpers.
 *
 * Uploaded media lives in Cloud storage, which can render resized variants on
 * the fly — so grid covers download a thumbnail instead of the full 1600px
 * screen. Bundled assets are already optimised by the build, so they pass
 * through untouched.
 */

const RENDERABLE = /\/storage\/v1\/object\/(public|sign)\//;

export function thumbUrl(src: string, width: number): string {
  if (!src || !RENDERABLE.test(src)) return src;
  const rendered = src.replace(RENDERABLE, "/storage/v1/render/image/$1/");
  const [base, query = ""] = rendered.split("?");
  const params = new URLSearchParams(query);
  params.set("width", String(width));
  params.set("quality", "78");
  params.set("resize", "contain");
  return `${base}?${params.toString()}`;
}

/** A responsive srcSet, or undefined when the source cannot be resized. */
export function srcSetFor(src: string, widths: number[] = [480, 800, 1200, 1600]) {
  if (!src || !RENDERABLE.test(src)) return undefined;
  return widths.map((w) => `${thumbUrl(src, w)} ${w}w`).join(", ");
}

const warmed = new Set<string>();

/** Warms the browser cache so the next page paints its hero immediately. */
export function preloadImages(sources: (string | undefined)[]) {
  if (typeof window === "undefined") return;
  for (const src of sources) {
    if (!src || warmed.has(src)) continue;
    warmed.add(src);
    const img = new Image();
    img.decoding = "async";
    img.src = src;
  }
}
