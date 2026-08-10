import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PageCopy } from "@/data/content";

export type ProjectRow = {
  slug: string;
  name: string;
  category: string;
  industry: string;
  services: string[];
  tech: string[];
  year: string;
  url: string;
  summary: string;
  device: string;
  screen: string;
  second_screen: string | null;
  second_device: string | null;
  brief: string[];
  sections: { title: string; body: string[]; image?: string }[];
  outcomes: { value: string; label: string }[];
  sort_order: number;
  published: boolean;
};

const columns =
  "slug,name,category,industry,services,tech,year,url,summary,device,screen,second_screen,second_device,brief,sections,outcomes,sort_order,published";

/** Every project, including drafts — readable only by admins under RLS. */
export const adminProjectsQuery = queryOptions({
  queryKey: ["admin", "projects"],
  queryFn: async (): Promise<ProjectRow[]> => {
    const { data, error } = await supabase
      .from("projects")
      .select(columns)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as unknown as ProjectRow[];
  },
});

export const adminContentQuery = queryOptions({
  queryKey: ["admin", "content"],
  queryFn: async (): Promise<Record<string, PageCopy>> => {
    const { data, error } = await supabase.from("site_content").select("key,value");
    if (error) throw error;
    const map: Record<string, PageCopy> = {};
    for (const row of data ?? []) map[row.key] = (row.value ?? {}) as PageCopy;
    return map;
  },
});

export async function saveProject(row: Partial<ProjectRow> & { slug: string }) {
  const { error } = await supabase
    .from("projects")
    .upsert(row as never, { onConflict: "slug" });
  if (error) throw error;
}

export async function deleteProject(slug: string) {
  const { error } = await supabase.from("projects").delete().eq("slug", slug);
  if (error) throw error;
}

export async function saveContent(key: string, value: PageCopy) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value: value as never }, { onConflict: "key" });
  if (error) throw error;
}
