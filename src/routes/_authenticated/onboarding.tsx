import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useAuthenticatedViewerState } from "@/lib/queries/auth";
import { useSignOut } from "@/hooks/use-sign-out";
import { IconButton } from "@/components/ui/icon-button";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  const { user } = useAuth();
  const viewer = useAuthenticatedViewerState(user?.id);
  const navigate = useNavigate();
  const { signingOut, handleSignOut } = useSignOut();

  // Admins never go through mandatory onboarding — send them to /admin
  // even if they navigate here directly.
  //
  // Regular users are redirected to /dashboard the moment their style
  // profile is complete. This is intentionally reactive rather than an
  // imperative "await save, then navigate" call inside the save
  // handlers: viewer.isStyleProfileComplete is derived from
  // useAuthenticatedViewerState, which reads the same profileQueryOptions
  // cache every save path (handleStudioComplete, commitManual, the
  // debounced auto-save effect) invalidates on success — so this fires
  // only once real, persisted data confirms completion, regardless of
  // which save action was the one that finished it, and never from local
  // form state. StyleProfile is also rendered at /style-profile (the
  // post-onboarding manage view) under a different layout that doesn't
  // import this effect, so completing an edit there never triggers it.
  useEffect(() => {
    if (!user || viewer.isLoading) return;
    if (viewer.isAdmin) {
      navigate({ to: "/admin", replace: true });
      return;
    }
    if (viewer.isStyleProfileComplete) {
      navigate({ to: "/dashboard", replace: true });
    }
  }, [user, viewer.isLoading, viewer.isAdmin, viewer.isStyleProfileComplete, navigate]);

  if (!user || viewer.isLoading || viewer.isAdmin || viewer.isStyleProfileComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-stone">
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="mila-page flex min-h-screen flex-col">
      <header className="mila-container flex items-center justify-between py-6">
        <Link
          to="/onboarding/style-profile"
          className="font-display text-xl tracking-[0.2em] text-ink"
        >
          MILA
        </Link>
        <IconButton variant="ghost" label="Sign out" onClick={handleSignOut} disabled={signingOut}>
          <LogOut className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
        </IconButton>
      </header>
      <main className="mila-container flex-1 pb-16">
        <Outlet />
      </main>
    </div>
  );
}
