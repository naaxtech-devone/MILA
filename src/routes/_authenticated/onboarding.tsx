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
  // even if they navigate here directly. Non-admins with a complete
  // profile are allowed to stay (this route also serves as a page they
  // can revisit, not just a one-time gate).
  useEffect(() => {
    if (!user || viewer.isLoading || !viewer.isAdmin) return;
    navigate({ to: "/admin", replace: true });
  }, [user, viewer.isLoading, viewer.isAdmin, navigate]);

  if (!user || viewer.isLoading || viewer.isAdmin) {
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
