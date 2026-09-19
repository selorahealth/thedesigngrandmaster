import { useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import {
  adminProjectsQuery,
  bulkDeleteProjects,
  bulkSetPublished,
  deleteProject,
  saveProject,
} from "@/lib/admin";
import { scheduleStatus } from "./projects.$slug";
import { contentKeys } from "@/data/content";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const { isAdmin, loading, session } = useAdmin();
  const client = useQueryClient();
  const navigate = useNavigate();
  const projects = useQuery({ ...adminProjectsQuery, enabled: isAdmin });
  const [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  if (loading) return <AdminFrame>Checking access…</AdminFrame>;

  if (!isAdmin) {
    return (
      <AdminFrame>
        <p className="text-sm text-muted-foreground">
          {session?.user.email} is signed in but has no admin role on this site.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={async () => {
            await supabase.auth.signOut();
            void navigate({ to: "/auth" });
          }}
        >
          Sign out
        </Button>
      </AdminFrame>
    );
  }

  const rows = projects.data ?? [];
  const allSelected = rows.length > 0 && selected.length === rows.length;

  const refresh = async () => {
    await client.invalidateQueries({ queryKey: ["admin"] });
    await client.invalidateQueries({ queryKey: ["cms"] });
  };

  const togglePublished = async (slug: string, published: boolean) => {
    await saveProject({ slug, published });
    await refresh();
  };

  const runBulk = async (label: string, fn: () => Promise<void>) => {
    setBusy(label);
    try {
      await fn();
      setSelected([]);
      await refresh();
      setBusy(null);
    } catch (e) {
      setBusy(e instanceof Error ? e.message : "Bulk action failed");
    }
  };

  return (
    <AdminFrame>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Control room
          </p>
          <h1 className="font-display text-3xl text-foreground">Projects</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/pages">Page content</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/media">Media library</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/courses">Courses</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/roles">Team access</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/admin/audit">Audit log</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/admin/projects/$slug" params={{ slug: "new" }}>
              New project
            </Link>
          </Button>
        </div>
      </div>

      {/* Bulk actions */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-4">
        <label className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) =>
              setSelected(e.target.checked ? rows.map((r) => r.slug) : [])
            }
          />
          Select all
        </label>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {selected.length} selected
        </span>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={!selected.length}
            onClick={() =>
              void runBulk("Publishing…", () => bulkSetPublished(selected, true))
            }
          >
            Publish
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={!selected.length}
            onClick={() =>
              void runBulk("Unpublishing…", () =>
                bulkSetPublished(selected, false),
              )
            }
          >
            Unpublish
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={!selected.length}
            onClick={() => {
              if (!confirm(`Delete ${selected.length} project(s)?`)) return;
              void runBulk("Deleting…", () => bulkDeleteProjects(selected));
            }}
          >
            Delete
          </Button>
        </div>
        {busy && <p className="w-full text-sm text-primary">{busy}</p>}
      </div>

      <div className="divide-y divide-border rounded-xl border border-border">
        {rows.map((p) => (
          <div key={p.slug} className="flex flex-wrap items-center gap-3 p-4">
            <input
              type="checkbox"
              aria-label={`Select ${p.name}`}
              checked={selected.includes(p.slug)}
              onChange={(e) =>
                setSelected((prev) =>
                  e.target.checked
                    ? [...prev, p.slug]
                    : prev.filter((s) => s !== p.slug),
                )
              }
            />
            <div className="min-w-[12rem] flex-1">
              <p className="font-display text-lg text-foreground">{p.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {p.category} · {p.year} · /{p.slug}
              </p>
            </div>
            <span
              className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase ${
                p.published
                  ? "border-primary text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {scheduleStatus(p)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => void togglePublished(p.slug, !p.published)}
            >
              {p.published ? "Unpublish" : "Publish"}
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/admin/projects/$slug" params={{ slug: p.slug }}>
                Edit
              </Link>
            </Button>
            <a
              href={`/work/${p.slug}?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary"
            >
              Preview
            </a>
            <button
              type="button"
              onClick={async () => {
                if (!confirm(`Delete ${p.name}?`)) return;
                await deleteProject(p.slug);
                await refresh();
              }}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-destructive"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3 rounded-xl border border-border p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Preview any route
        </p>
        <div className="flex flex-wrap gap-2">
          {["/", "/work", "/repertoire", "/process", "/contact", "/courses"].map(
            (path) => (
              <a
                key={path}
                href={`${path}?preview=1`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground"
              >
                {path}
              </a>
            ),
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Preview shows drafts and scheduled projects before their go-live date.
          Published visitors keep seeing the live version until the schedule
          opens.
        </p>
      </div>

      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        Editable page copy: {contentKeys.length} blocks
      </p>
    </AdminFrame>
  );
}

export function AdminFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <nav className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <Link to="/admin" className="text-foreground">
            Admin
          </Link>
          <Link to="/admin/pages">Pages</Link>
          <Link to="/admin/media">Media</Link>
          <Link to="/admin/courses">Courses</Link>
          <Link to="/admin/roles">Access</Link>
          <Link to="/admin/audit">Audit</Link>
          <Link to="/">Back to site</Link>
          <button
            type="button"
            onClick={() => void supabase.auth.signOut()}
            className="uppercase"
          >
            Sign out
          </button>
        </nav>
        {children}
      </div>
    </main>
  );
}
