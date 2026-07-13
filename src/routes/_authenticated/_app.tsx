import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useAuth } from "@/hooks/use-auth";
import { useAuthenticatedViewerState, loadAuthenticatedViewerState } from "@/lib/queries/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/_app")({
  // Fast path for client-side (SPA) navigations, where `window` exists and
  // this can redirect before ever rendering AppLayout. Skipped during SSR
  // (no way to read a localStorage-backed session server-side) — the
  // component-level check below is what actually protects this route tree,
  // mirroring how _authenticated.tsx protects itself.
  beforeLoad: async ({ context }) => {
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user.id;
    if (!userId) return;
    const viewer = await loadAuthenticatedViewerState(context.queryClient, userId);
    if (viewer.canAccessStaffArea) {
      throw redirect({ to: "/admin", replace: true });
    }
    if (!viewer.isStyleProfileComplete) {
      throw redirect({ to: "/onboarding/style-profile", replace: true });
    }
  },
  component: AppLayout,
});

function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const viewer = useAuthenticatedViewerState(user?.id);

  useEffect(() => {
    if (!user || viewer.isLoading) return;
    if (viewer.canAccessStaffArea) {
      navigate({ to: "/admin", replace: true });
      return;
    }
    if (!viewer.isStyleProfileComplete) {
      navigate({ to: "/onboarding/style-profile", replace: true });
    }
  }, [user, viewer.isLoading, viewer.canAccessStaffArea, viewer.isStyleProfileComplete, navigate]);

  // Withhold member content until the client has confirmed this viewer
  // belongs here — SSR can't resolve this (session lives in localStorage),
  // so this render gate, not beforeLoad, is the real protection.
  if (!user || viewer.isLoading || viewer.canAccessStaffArea || !viewer.isStyleProfileComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="font-serif text-2xl tracking-[0.2em] text-muted-foreground animate-pulse">
          ATELIER
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
