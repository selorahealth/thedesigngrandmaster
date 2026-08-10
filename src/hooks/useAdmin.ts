import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AdminState = {
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
};

/** Session + role state for the CMS. The role check runs server-side via RLS. */
export function useAdmin(): AdminState {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    const check = async (next: Session | null) => {
      if (!alive) return;
      setSession(next);
      if (!next) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      const { data } = await supabase.rpc("is_site_admin");
      if (!alive) return;
      setIsAdmin(data === true);
      setLoading(false);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      void check(next);
    });
    void supabase.auth.getSession().then(({ data }) => check(data.session));

    return () => {
      alive = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { session, isAdmin, loading };
}
