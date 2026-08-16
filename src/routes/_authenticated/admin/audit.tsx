import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/useAdmin";
import { auditQuery, type AuditEntry } from "@/lib/admin";
import { AdminFrame } from "./index";

export const Route = createFileRoute("/_authenticated/admin/audit")({
  component: AuditLog,
});

const labelText = "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

function pretty(value: unknown) {
  if (value === null || value === undefined) return "—";
  return JSON.stringify(value, null, 2);
}

function Entry({ entry }: { entry: AuditEntry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-wrap items-center gap-3 text-left"
      >
        <span className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase text-foreground">
          {entry.action}
        </span>
        <span className="min-w-[10rem] flex-1 text-sm text-foreground">
          {entry.entity} · {entry.entity_key || "—"}
        </span>
        <span className={labelText}>{entry.actor_email || "unknown"}</span>
        <span className={labelText}>{new Date(entry.created_at).toLocaleString()}</span>
        <span className={labelText}>{open ? "Hide" : "Diff"}</span>
      </button>
      {open && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-3">
            <p className={labelText}>Previous</p>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs text-muted-foreground">
              {pretty(entry.old_value)}
            </pre>
          </div>
          <div className="rounded-lg border border-border p-3">
            <p className={labelText}>New</p>
            <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs text-foreground">
              {pretty(entry.new_value)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function AuditLog() {
  const { isAdmin, loading } = useAdmin();
  const entries = useQuery({ ...auditQuery, enabled: isAdmin });
  const [filter, setFilter] = useState("");

  const results = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const rows = entries.data ?? [];
    if (!q) return rows;
    return rows.filter((e) =>
      `${e.actor_email} ${e.entity} ${e.entity_key} ${e.action}`.toLowerCase().includes(q),
    );
  }, [entries.data, filter]);

  if (loading) return <AdminFrame>Checking access…</AdminFrame>;
  if (!isAdmin) return <AdminFrame>You need an admin role to read the audit log.</AdminFrame>;

  return (
    <AdminFrame>
      <div>
        <p className={labelText}>History</p>
        <h1 className="font-display text-3xl text-foreground">Audit log</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every project, page and access change — who made it, when, and what the values were before
          and after. Last 200 entries.
        </p>
      </div>

      <input
        className="w-full max-w-sm rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary"
        placeholder="Filter by person, page or project"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="divide-y divide-border rounded-xl border border-border">
        {results.map((e) => (
          <Entry key={e.id} entry={e} />
        ))}
        {!results.length && (
          <p className="p-5 text-sm text-muted-foreground">Nothing recorded yet.</p>
        )}
      </div>
    </AdminFrame>
  );
}
