import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/useAdmin";
import { adminProjectsQuery, saveProject, type ProjectRow } from "@/lib/admin";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { resolveScreen } from "@/lib/screens";
import { AdminFrame } from "./index";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/projects/$slug")({
  component: ProjectEditor,
});

const empty: ProjectRow = {
  slug: "",
  name: "",
  category: "Product design",
  industry: "",
  services: [],
  tech: [],
  year: String(new Date().getFullYear()),
  url: "",
  summary: "",
  device: "desktop",
  screen: "",
  second_screen: null,
  second_device: "mobile",
  brief: [],
  sections: [],
  outcomes: [],
  sort_order: 99,
  published: false,
};

const field =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";
const labelText =
  "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

function ProjectEditor() {
  const { slug } = Route.useParams();
  const { isAdmin, loading } = useAdmin();
  const navigate = useNavigate();
  const client = useQueryClient();
  const projects = useQuery({ ...adminProjectsQuery, enabled: isAdmin });
  const [row, setRow] = useState<ProjectRow>(empty);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (slug === "new" || !projects.data) return;
    const found = projects.data.find((p) => p.slug === slug);
    if (found) setRow({ ...empty, ...found });
  }, [slug, projects.data]);

  if (loading) return <AdminFrame>Checking access…</AdminFrame>;
  if (!isAdmin) return <AdminFrame>You need an admin role to edit projects.</AdminFrame>;

  const set = <K extends keyof ProjectRow>(key: K, value: ProjectRow[K]) =>
    setRow((prev) => ({ ...prev, [key]: value }));

  const save = async () => {
    if (!row.slug) {
      setStatus("A slug is required.");
      return;
    }
    setStatus("Saving…");
    try {
      await saveProject(row);
      await client.invalidateQueries({ queryKey: ["admin", "projects"] });
      await client.invalidateQueries({ queryKey: ["cms"] });
      setStatus("Saved — the live site updates instantly.");
      if (slug === "new") void navigate({ to: "/admin/projects/$slug", params: { slug: row.slug } });
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <AdminFrame>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl text-foreground">
          {slug === "new" ? "New project" : row.name || slug}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          {row.slug && (
            <a
              href={`/work/${row.slug}?preview=1`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground"
            >
              Preview
            </a>
          )}
          <Button size="sm" onClick={() => void save()}>
            Save
          </Button>
        </div>
      </div>
      {status && <p className="text-sm text-primary">{status}</p>}

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className={labelText}>Name</span>
          <input className={field} value={row.name} onChange={(e) => set("name", e.target.value)} />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Slug</span>
          <input className={field} value={row.slug} onChange={(e) => set("slug", e.target.value)} />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Discipline</span>
          <input
            className={field}
            value={row.category}
            onChange={(e) => set("category", e.target.value)}
          />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Industry</span>
          <input
            className={field}
            value={row.industry}
            onChange={(e) => set("industry", e.target.value)}
          />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Year</span>
          <input className={field} value={row.year} onChange={(e) => set("year", e.target.value)} />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Live URL</span>
          <input className={field} value={row.url} onChange={(e) => set("url", e.target.value)} />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Services (comma separated)</span>
          <input
            className={field}
            value={row.services.join(", ")}
            onChange={(e) => set("services", splitList(e.target.value))}
          />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Tags / tech (comma separated)</span>
          <input
            className={field}
            value={row.tech.join(", ")}
            onChange={(e) => set("tech", splitList(e.target.value))}
          />
        </label>
        <label className="space-y-2 sm:col-span-2">
          <span className={labelText}>Summary</span>
          <textarea
            className={`${field} min-h-[5rem]`}
            value={row.summary}
            onChange={(e) => set("summary", e.target.value)}
          />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Sort order</span>
          <input
            type="number"
            className={field}
            value={row.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-3 pt-6">
          <input
            type="checkbox"
            checked={row.published}
            onChange={(e) => set("published", e.target.checked)}
          />
          <span className={labelText}>Published</span>
        </label>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-xl text-foreground">Hero screens</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <span className={labelText}>Primary screen ({row.device})</span>
            {resolveScreen(row.screen) && (
              <img
                src={resolveScreen(row.screen)}
                alt="Primary screen"
                className="h-32 w-full rounded-lg border border-border object-cover"
              />
            )}
            <select
              className={field}
              value={row.device}
              onChange={(e) => set("device", e.target.value)}
            >
              <option value="desktop">desktop</option>
              <option value="mobile">mobile</option>
            </select>
            <MediaPicker
              folder="project-screens"
              value={row.screen}
              showBundled
              onSelect={(url) => set("screen", url)}
            />
          </div>
          <div className="space-y-2">
            <span className={labelText}>Secondary screen (optional)</span>
            {resolveScreen(row.second_screen) && (
              <img
                src={resolveScreen(row.second_screen)}
                alt="Secondary screen"
                className="h-32 w-full rounded-lg border border-border object-cover"
              />
            )}
            <select
              className={field}
              value={row.second_device ?? "mobile"}
              onChange={(e) => set("second_device", e.target.value)}
            >
              <option value="mobile">mobile</option>
              <option value="desktop">desktop</option>
            </select>
            <MediaPicker
              folder="project-screens"
              value={row.second_screen ?? ""}
              showBundled
              onSelect={(url) => set("second_screen", url)}
            />
            <Button variant="ghost" size="sm" onClick={() => set("second_screen", null)}>
              Clear secondary screen
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-xl text-foreground">Brief</h2>
        <p className="text-xs text-muted-foreground">One paragraph per line.</p>
        <textarea
          className={`${field} min-h-[8rem]`}
          value={row.brief.join("\n")}
          onChange={(e) => set("brief", splitLines(e.target.value))}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-foreground">Case-study sections</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => set("sections", [...row.sections, { title: "", body: [] }])}
          >
            Add section
          </Button>
        </div>
        {row.sections.map((section, i) => (
          <div key={i} className="space-y-3 rounded-xl border border-border p-4">
            <input
              className={field}
              placeholder="Section title"
              value={section.title}
              onChange={(e) => {
                const next = [...row.sections];
                next[i] = { ...section, title: e.target.value };
                set("sections", next);
              }}
            />
            <textarea
              className={`${field} min-h-[6rem]`}
              placeholder="One paragraph per line"
              value={section.body.join("\n")}
              onChange={(e) => {
                const next = [...row.sections];
                next[i] = { ...section, body: splitLines(e.target.value) };
                set("sections", next);
              }}
            />
            {section.image && (
              <img
                src={resolveScreen(section.image)}
                alt={section.title}
                className="h-32 w-full rounded-lg border border-border object-cover"
              />
            )}
            <MediaPicker
              folder="project-screens"
              value={section.image ?? ""}
              onSelect={(url) => {
                const next = [...row.sections];
                next[i] = { ...section, image: url };
                set("sections", next);
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => set("sections", row.sections.filter((_, j) => j !== i))}
            >
              Remove section
            </Button>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl text-foreground">Outcomes</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => set("outcomes", [...row.outcomes, { value: "", label: "" }])}
          >
            Add outcome
          </Button>
        </div>
        {row.outcomes.map((outcome, i) => (
          <div key={i} className="flex flex-wrap gap-3">
            <input
              className={`${field} sm:w-32`}
              placeholder="Value"
              value={outcome.value}
              onChange={(e) => {
                const next = [...row.outcomes];
                next[i] = { ...outcome, value: e.target.value };
                set("outcomes", next);
              }}
            />
            <input
              className={`${field} sm:flex-1`}
              placeholder="Label"
              value={outcome.label}
              onChange={(e) => {
                const next = [...row.outcomes];
                next[i] = { ...outcome, label: e.target.value };
                set("outcomes", next);
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={() => set("outcomes", row.outcomes.filter((_, j) => j !== i))}
            >
              Remove
            </Button>
          </div>
        ))}
      </section>

      <Button onClick={() => void save()}>Save project</Button>
    </AdminFrame>
  );
}

function splitList(value: string) {
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((v) => v.trim())
    .filter(Boolean);
}
