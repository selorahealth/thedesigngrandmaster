import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/hooks/useAdmin";
import { adminProjectsQuery, deleteProject, saveProject } from "@/lib/admin";
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

  const togglePublished = async (slug: string, published: boolean) => {
    await saveProject({ slug, published });
    await client.invalidateQueries({ queryKey: ["admin", "projects"] });
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
          <Button asChild size="sm">
            <Link to="/admin/projects/$slug" params={{ slug: "new" }}>
              New project
            </Link>
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border rounded-xl border border-border">
        {(projects.data ?? []).map((p) => (
          <div key={p.slug} className="flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-[12rem] flex-1">
              <p className="font-display text-lg text-foreground">{p.name}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {p.category} · {p.year} · /{p.slug}
              </p>
            </div>
            <span
              className={`rounded-full border px-3 py-1 font-mono text-[10px] uppercase ${
                p.published ? "border-primary text-primary" : "border-border text-muted-foreground"
              }`}
            >
              {p.published ? "Live" : "Draft"}
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
                await client.invalidateQueries({ queryKey: ["admin", "projects"] });
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
          {["/", "/work", "/repertoire", "/process", "/contact"].map((path) => (
            <a
              key={path}
              href={`${path}?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground"
            >
              {path}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Preview shows drafts and unsaved-to-live copy. Published visitors keep seeing the live
          version until you hit Publish.
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
