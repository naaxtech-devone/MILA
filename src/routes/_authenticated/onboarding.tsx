import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useSignOut } from "@/hooks/use-sign-out";
import { IconButton } from "@/components/ui/icon-button";

export const Route = createFileRoute("/_authenticated/onboarding")({
  component: OnboardingLayout,
});

function OnboardingLayout() {
  const { signingOut, handleSignOut } = useSignOut();

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
