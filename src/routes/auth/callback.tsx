import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

function sanitizeNext(next: unknown): string {
  return typeof next === "string" && /^\/(?!\/|\\)/.test(next) ? next : "/dashboard";
}

export const Route = createFileRoute("/auth/callback")({
  validateSearch: (search: Record<string, unknown>) => ({
    next: sanitizeNext(search.next),
  }),
  beforeLoad: async ({ search }) => {
    if (typeof window === "undefined") return;
    await supabase.auth.getSession();
    throw redirect({ href: search.next });
  },
  component: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="font-serif text-2xl tracking-[0.2em] text-muted-foreground animate-pulse">
        ATELIER
      </div>
    </div>
  ),
});
