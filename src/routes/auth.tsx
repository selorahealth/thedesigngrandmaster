import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Studio sign-in — thedesigngrandmaster" },
      { name: "description", content: "Sign in to manage projects and page content." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Studio sign-in — thedesigngrandmaster" },
      { property: "og:description", content: "Private CMS access for studio admins." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);

    if (mode === "signup") {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth` },
      });
      setBusy(false);
      if (err) {
        setError(err.message);
        return;
      }
      setNotice("Check your inbox and confirm the address, then sign in.");
      setMode("signin");
      return;
    }

    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    void navigate({ to: "/admin" });
  };


  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 py-24">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-card p-8"
      >
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Studio access
          </p>
          <h1 className="font-display text-2xl text-foreground">
            {mode === "signin" ? "Sign in" : "Create your admin account"}
          </h1>
        </div>

        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </label>

        <label className="block space-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Password
          </span>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
        </label>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {notice && <p className="text-sm text-primary">{notice}</p>}

        <Button type="submit" disabled={busy} className="w-full">
          {busy
            ? "Working…"
            : mode === "signin"
              ? "Sign in"
              : "Create account"}
        </Button>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
        >
          {mode === "signin" ? "First time? Create your account" : "Already have an account? Sign in"}
        </button>

      </form>
    </main>
  );
}
