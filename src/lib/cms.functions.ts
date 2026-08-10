import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  // Fall back to the VITE_* names so the site still renders when only the
  // client-side variables are configured on the host.
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] || process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] || "";
  const url = process.env["SUPABASE_URL"] || process.env["VITE_SUPABASE_URL"] || "";
  if (!url || !key) return null;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

const columns =
  "slug,name,category,industry,services,tech,year,url,summary,device,screen,second_screen,second_device,brief,sections,outcomes,sort_order,published";

export const listProjectRows = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const client = publicClient();
    if (!client) return [];
    const { data, error } = await client
      .from("projects")
      .select(columns)
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
});

export const getProjectRow = createServerFn({ method: "GET" })
  .inputValidator((input) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data: input }) => {
    try {
      const client = publicClient();
      if (!client) return null;
      const { data, error } = await client
        .from("projects")
        .select(columns)
        .eq("slug", input.slug)
        .eq("published", true)
        .maybeSingle();
      if (error) return null;
      return data ?? null;
    } catch {
      return null;
    }
  });

export const listContentRows = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const client = publicClient();
    if (!client) return [];
    const { data, error } = await client.from("site_content").select("key,value");
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
});
