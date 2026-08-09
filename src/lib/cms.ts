import { useEffect } from "react";
import { queryOptions, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { listContentRows, listProjectRows } from "@/lib/cms.functions";
import { resolveScreen } from "@/lib/screens";
import { projects as defaultProjects, type CaseSection } from "@/data/projects";
import { defaultContent, type ContentKey, type PageCopy } from "@/data/content";

export type CmsProject = {
  slug: string;
  name: string;
  category: string;
  industry: string;
  services: string[];
  tech: string[];
  year: string;
  url: string;
  summary: string;
  device: "desktop" | "mobile";
  screen: string;
  secondScreen?: string;
  secondDevice?: "desktop" | "mobile";
  brief: string[];
  sections: CaseSection[];
  outcomes: { value: string; label: string }[];
};

type Row = Record<string, unknown>;

const defaultsBySlug = new Map(defaultProjects.map((p) => [p.slug, p]));

function arr<T>(value: unknown, fallback: T[]): T[] {
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback;
}

export function toProject(row: Row): CmsProject {
  const slug = String(row["slug"] ?? "");
  const fallback = defaultsBySlug.get(slug);
  const device = (row["device"] === "mobile" ? "mobile" : "desktop") as "desktop" | "mobile";
  const secondDevice = row["second_device"] === "desktop" ? "desktop" : "mobile";
  const screen = resolveScreen(String(row["screen"] ?? "")) || fallback?.screen || "";
  const second = resolveScreen((row["second_screen"] as string) ?? "") || fallback?.secondScreen;

  return {
    slug,
    name: String(row["name"] ?? fallback?.name ?? slug),
    category: String(row["category"] ?? fallback?.category ?? ""),
    industry: String(row["industry"] ?? fallback?.industry ?? ""),
    services: arr<string>(row["services"], fallback?.services ?? []),
    tech: arr<string>(row["tech"], fallback?.tech ?? []),
    year: String(row["year"] ?? fallback?.year ?? ""),
    url: String(row["url"] ?? fallback?.url ?? ""),
    summary: String(row["summary"] ?? fallback?.summary ?? ""),
    device,
    screen,
    ...(second ? { secondScreen: second, secondDevice } : {}),
    brief: arr<string>(row["brief"], fallback?.brief ?? []),
    sections: arr<CaseSection>(row["sections"], fallback?.sections ?? []),
    outcomes: arr<{ value: string; label: string }>(row["outcomes"], fallback?.outcomes ?? []),
  };
}

export const projectsQuery = queryOptions({
  queryKey: ["cms", "projects"],
  queryFn: async (): Promise<CmsProject[]> => {
    const rows = (await listProjectRows()) as Row[];
    if (!rows.length) return defaultProjects as CmsProject[];
    return rows.map(toProject);
  },
});

export const contentQuery = queryOptions({
  queryKey: ["cms", "content"],
  queryFn: async (): Promise<Record<string, PageCopy>> => {
    const rows = (await listContentRows()) as { key: string; value: PageCopy }[];
    const merged: Record<string, PageCopy> = { ...defaultContent };
    for (const row of rows) {
      merged[row.key] = { ...(merged[row.key] ?? {}), ...(row.value ?? {}) };
    }
    return merged;
  },
});

export function useProjects(): CmsProject[] {
  useRealtimeContent();
  return useSuspenseQuery(projectsQuery).data;
}

export function useCopy(key: ContentKey): PageCopy {
  useRealtimeContent();
  const data = useSuspenseQuery(contentQuery).data;
  return data[key] ?? defaultContent[key] ?? {};
}

/** Keeps the site in sync with admin edits without a refresh. */
export function useRealtimeContent() {
  const client = useQueryClient();
  useEffect(() => {
    const channel = supabase
      .channel("cms-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "projects" }, () => {
        void client.invalidateQueries({ queryKey: ["cms", "projects"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "site_content" }, () => {
        void client.invalidateQueries({ queryKey: ["cms", "content"] });
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [client]);
}

export const disciplines = [
  "Branding",
  "Product design",
  "Web design",
  "Graphic design",
  "Consulting",
  "B2B",
] as const;

export function matchesSearch(project: CmsProject, term: string) {
  const q = term.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    project.name,
    project.summary,
    project.category,
    project.industry,
    project.year,
    project.services.join(" "),
    project.tech.join(" "),
    project.brief.join(" "),
    project.sections.map((s) => `${s.title} ${s.body.join(" ")}`).join(" "),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}
