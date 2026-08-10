import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/useAdmin";
import { adminContentQuery, saveContent } from "@/lib/admin";
import { contentKeys, defaultContent, type PageCopy } from "@/data/content";
import { AdminFrame } from "./index";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/pages")({
  component: PagesEditor,
});

const field =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";
const labelText = "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

const previewPath: Record<string, string> = {
  "home.hero": "/",
  "work.header": "/work",
  "repertoire.header": "/repertoire",
  "process.header": "/process",
  "contact.header": "/contact",
};

function PagesEditor() {
  const { isAdmin, loading } = useAdmin();
  const client = useQueryClient();
  const saved = useQuery({ ...adminContentQuery, enabled: isAdmin });
  const [draft, setDraft] = useState<Record<string, PageCopy>>({});
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!saved.data) return;
    const merged: Record<string, PageCopy> = {};
    for (const { key } of contentKeys) {
      merged[key] = { ...(defaultContent[key] ?? {}), ...(saved.data[key] ?? {}) };
    }
    setDraft(merged);
  }, [saved.data]);

  if (loading) return <AdminFrame>Checking access…</AdminFrame>;
  if (!isAdmin) return <AdminFrame>You need an admin role to edit page content.</AdminFrame>;

  const update = (key: string, part: Partial<PageCopy>) =>
    setDraft((prev) => ({ ...prev, [key]: { ...(prev[key] ?? {}), ...part } }));

  const save = async (key: string) => {
    setStatus("Saving…");
    try {
      await saveContent(key, draft[key] ?? {});
      await client.invalidateQueries({ queryKey: ["admin", "content"] });
      await client.invalidateQueries({ queryKey: ["cms"] });
      setStatus(`Saved ${key}.`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <AdminFrame>
      <div>
        <p className={labelText}>Page content</p>
        <h1 className="font-display text-3xl text-foreground">Sections by page</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Each page owns its own block — editing Contact never touches the home page.
        </p>
      </div>
      {status && <p className="text-sm text-primary">{status}</p>}

      <div className="space-y-6">
        {contentKeys.map(({ key, label }) => {
          const copy = draft[key] ?? {};
          return (
            <section key={key} className="space-y-3 rounded-xl border border-border p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-xl text-foreground">{label}</h2>
                <div className="flex items-center gap-2">
                  <a
                    href={`${previewPath[key] ?? "/"}?preview=1`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground"
                  >
                    Preview
                  </a>
                  <Button size="sm" onClick={() => void save(key)}>
                    Save
                  </Button>
                </div>
              </div>
              <label className="block space-y-2">
                <span className={labelText}>Eyebrow</span>
                <input
                  className={field}
                  value={copy.eyebrow ?? ""}
                  onChange={(e) => update(key, { eyebrow: e.target.value })}
                />
              </label>
              <label className="block space-y-2">
                <span className={labelText}>Title</span>
                <input
                  className={field}
                  value={copy.title ?? ""}
                  onChange={(e) => update(key, { title: e.target.value })}
                />
              </label>
              <label className="block space-y-2">
                <span className={labelText}>Intro</span>
                <textarea
                  className={`${field} min-h-[6rem]`}
                  value={copy.intro ?? ""}
                  onChange={(e) => update(key, { intro: e.target.value })}
                />
              </label>
              <label className="block space-y-2">
                <span className={labelText}>Note (optional)</span>
                <input
                  className={field}
                  value={copy.note ?? ""}
                  onChange={(e) => update(key, { note: e.target.value })}
                />
              </label>
            </section>
          );
        })}
      </div>
    </AdminFrame>
  );
}
