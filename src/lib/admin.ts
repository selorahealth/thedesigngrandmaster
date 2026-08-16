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
  publish_at: string | null;
  unpublish_at: string | null;
};

const columns =
  "slug,name,category,industry,services,tech,year,url,summary,device,screen,second_screen,second_device,brief,sections,outcomes,sort_order,published,publish_at,unpublish_at";

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

/* ------------------------------------------------------------------ audit */

export type AuditEntry = {
  id: string;
  actor_email: string;
  entity: string;
  entity_key: string;
  action: string;
  old_value: unknown;
  new_value: unknown;
  created_at: string;
};

export const auditQuery = queryOptions({
  queryKey: ["admin", "audit"],
  queryFn: async (): Promise<AuditEntry[]> => {
    const { data, error } = await supabase
      .from("audit_log")
      .select("id,actor_email,entity,entity_key,action,old_value,new_value,created_at")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw error;
    return (data ?? []) as AuditEntry[];
  },
});

/** Records who changed what, when, with the previous and new values. */
async function recordAudit(entry: {
  entity: "project" | "page" | "role";
  entity_key: string;
  action: string;
  old_value?: unknown;
  new_value?: unknown;
}) {
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user) return;
  await supabase.from("audit_log").insert({
    actor_id: user.id,
    actor_email: user.email ?? "",
    entity: entry.entity,
    entity_key: entry.entity_key,
    action: entry.action,
    old_value: (entry.old_value ?? null) as never,
    new_value: (entry.new_value ?? null) as never,
  });
}

/** Only the fields that actually changed, so the log stays readable. */
function diff(before: Record<string, unknown> | null, after: Record<string, unknown>) {
  if (!before) return { before: null, after };
  const b: Record<string, unknown> = {};
  const a: Record<string, unknown> = {};
  for (const key of Object.keys(after)) {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
      b[key] = before[key] ?? null;
      a[key] = after[key];
    }
  }
  return { before: b, after: a };
}

/* --------------------------------------------------------------- projects */

export async function saveProject(row: Partial<ProjectRow> & { slug: string }) {
  const { data: existing } = await supabase
    .from("projects")
    .select(columns)
    .eq("slug", row.slug)
    .maybeSingle();

  const { error } = await supabase
    .from("projects")
    .upsert(row as never, { onConflict: "slug" });
  if (error) throw error;

  const changes = diff((existing ?? null) as Record<string, unknown> | null, row);
  await recordAudit({
    entity: "project",
    entity_key: row.slug,
    action: existing ? "update" : "create",
    old_value: changes.before,
    new_value: changes.after,
  });
}

export async function deleteProject(slug: string) {
  const { data: existing } = await supabase
    .from("projects")
    .select(columns)
    .eq("slug", slug)
    .maybeSingle();
  const { error } = await supabase.from("projects").delete().eq("slug", slug);
  if (error) throw error;
  await recordAudit({
    entity: "project",
    entity_key: slug,
    action: "delete",
    old_value: existing ?? null,
  });
}

/** Bulk publish / unpublish. One audit entry per project. */
export async function bulkSetPublished(slugs: string[], published: boolean) {
  for (const slug of slugs) await saveProject({ slug, published });
}

export async function bulkDeleteProjects(slugs: string[]) {
  for (const slug of slugs) await deleteProject(slug);
}

/* ------------------------------------------------------------------ pages */

export async function saveContent(key: string, value: PageCopy) {
  const { data: existing } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .maybeSingle();
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value: value as never }, { onConflict: "key" });
  if (error) throw error;
  await recordAudit({
    entity: "page",
    entity_key: key,
    action: existing ? "update" : "create",
    old_value: (existing?.value ?? null) as unknown,
    new_value: value,
  });
}

/* ------------------------------------------------------------------ roles */

export type RoleInvite = {
  id: string;
  email: string;
  role: "admin" | "editor";
  created_at: string;
};

export const roleInvitesQuery = queryOptions({
  queryKey: ["admin", "roles"],
  queryFn: async (): Promise<RoleInvite[]> => {
    const { data, error } = await supabase
      .from("role_invites")
      .select("id,email,role,created_at")
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []) as RoleInvite[];
  },
});

export async function grantRole(email: string, role: "admin" | "editor") {
  const clean = email.trim().toLowerCase();
  const { error } = await supabase
    .from("role_invites")
    .upsert({ email: clean, role }, { onConflict: "email" });
  if (error) throw error;
  await recordAudit({
    entity: "role",
    entity_key: clean,
    action: "grant",
    new_value: { email: clean, role },
  });
}

export async function revokeRole(invite: RoleInvite) {
  const { error } = await supabase.from("role_invites").delete().eq("id", invite.id);
  if (error) throw error;
  await recordAudit({
    entity: "role",
    entity_key: invite.email,
    action: "revoke",
    old_value: { email: invite.email, role: invite.role },
  });
}
