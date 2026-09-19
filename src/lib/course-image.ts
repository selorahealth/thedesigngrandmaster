import { supabase } from "@/integrations/supabase/client";

export type CourseImageMap = Record<string, string>;

export async function getCourseImages(): Promise<CourseImageMap> {
  const { data, error } = await supabase
    .from("course_images")
    .select("slug, image_url");

  if (error) {
    console.error("Failed to load course images:", error.message);
    return {};
  }

  if (!data) return {};

  return Object.fromEntries(
    data.map((row) => [row.slug, row.image_url]),
  );
}

export async function saveCourseImage(slug: string, imageUrl: string) {
  const { error } = await supabase.from("course_images").upsert(
    {
      slug,
      image_url: imageUrl,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "slug" },
  );

  if (error) {
    console.error("Failed to save course image:", error.message);
    throw error;
  }
}
