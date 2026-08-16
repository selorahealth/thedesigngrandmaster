import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/useAdmin";
import { grantRole, revokeRole, roleInvitesQuery, type RoleInvite } from "@/lib/admin";
import { AdminFrame } from "./index";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/roles")({
  component: RolesEditor,
});

const field =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary";
const labelText = "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground";

function RolesEditor() {
  const { isAdmin, loading, session } = useAdmin();
  const client = useQueryClient();
  const invites = useQuery({ ...roleInvitesQuery, enabled: isAdmin });
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "editor">("editor");
  const [status, setStatus] = useState<string | null>(null);

  if (loading) return <AdminFrame>Checking access…</AdminFrame>;
  if (!isAdmin) return <AdminFrame>You need an admin role to manage team access.</AdminFrame>;

  const refresh = () => client.invalidateQueries({ queryKey: ["admin"] });

  const add = async () => {
    if (!email.includes("@")) {
      setStatus("Enter a valid email address.");
      return;
    }
    setStatus("Saving…");
    try {
      await grantRole(email, role);
      setEmail("");
      await refresh();
      setStatus("Access granted. They get it the next time they sign in.");
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Could not grant access");
    }
  };

  const remove = async (invite: RoleInvite) => {
    if (!confirm(`Revoke ${invite.role} access for ${invite.email}?`)) return;
    try {
      await revokeRole(invite);
      await refresh();
      setStatus(`Revoked ${invite.email}.`);
    } catch (e) {
      setStatus(e instanceof Error ? e.message : "Could not revoke access");
    }
  };

  return (
    <AdminFrame>
      <div>
        <p className={labelText}>Team access</p>
        <h1 className="font-display text-3xl text-foreground">Who can edit this site</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Add any number of email addresses. <strong>Admin</strong> can edit everything and manage
          access; <strong>editor</strong> can read the audit log and edit content. Access applies as
          soon as that address signs in at <code>/auth</code>.
        </p>
      </div>
      {status && <p className="text-sm text-primary">{status}</p>}

      <section className="grid gap-3 rounded-xl border border-border p-5 sm:grid-cols-[1fr_auto_auto] sm:items-end">
        <label className="space-y-2">
          <span className={labelText}>Email</span>
          <input
            className={field}
            type="email"
            placeholder="name@studio.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="space-y-2">
          <span className={labelText}>Role</span>
          <select
            className={field}
            value={role}
            onChange={(e) => setRole(e.target.value === "admin" ? "admin" : "editor")}
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <Button onClick={() => void add()}>Grant access</Button>
      </section>

      <div className="divide-y divide-border rounded-xl border border-border">
        {(invites.data ?? []).map((invite) => (
          <div key={invite.id} className="flex flex-wrap items-center gap-3 p-4">
            <div className="min-w-[12rem] flex-1">
              <p className="text-sm text-foreground">{invite.email}</p>
              <p className={labelText}>
                Added {new Date(invite.created_at).toLocaleDateString()}
                {session?.user.email?.toLowerCase() === invite.email ? " · that's you" : ""}
              </p>
            </div>
            <span className="rounded-full border border-primary px-3 py-1 font-mono text-[10px] uppercase text-primary">
              {invite.role}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                void grantRole(invite.email, invite.role === "admin" ? "editor" : "admin").then(
                  refresh,
                )
              }
            >
              Make {invite.role === "admin" ? "editor" : "admin"}
            </Button>
            <button
              type="button"
              onClick={() => void remove(invite)}
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-destructive"
            >
              Revoke
            </button>
          </div>
        ))}
        {!invites.data?.length && (
          <p className="p-5 text-sm text-muted-foreground">
            No addresses added yet. The studio owner address keeps admin access regardless.
          </p>
        )}
      </div>
    </AdminFrame>
  );
}
