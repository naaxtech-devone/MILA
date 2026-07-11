import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { DevelopmentBadge } from "@/components/ui/development-badge";

const topNavItems: { to: string; label: string }[] = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/feed", label: "Feed" },
];

export function DesktopNav({ path, onOpenLens }: { path: string; onOpenLens: () => void }) {
  return (
    <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10">
      {topNavItems.map((it) => {
        const active = path === it.to;
        return (
          <Link
            key={it.to}
            to={it.to}
            className={cn(
              "text-xs uppercase tracking-[0.2em] transition-colors",
              active ? "text-accent" : "text-muted hover:text-ink",
            )}
          >
            {it.label}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onOpenLens}
        className="text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors"
      >
        Lens
      </button>
      <Link
        to="/style-profile"
        className={cn(
          "text-xs uppercase tracking-[0.2em] transition-colors",
          path === "/style-profile" ? "text-accent" : "text-muted hover:text-ink",
        )}
      >
        Studio
      </Link>
      {/*
        IN DEVELOPMENT [concierge-chat]:
        The AI stylist chat only answers when anchored to a real outfit
        photo, but no code path in the app ever supplies one to this
        drawer — every question currently gets the same canned "snap a
        photo" deflection. Disabled at the nav entry point until an item
        can actually be anchored.
        See /IN_DEVELOPMENT.txt.
      */}
      <button
        type="button"
        disabled
        aria-describedby="concierge-development-message"
        className="inline-flex cursor-not-allowed items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-muted opacity-50"
      >
        Concierge
        <DevelopmentBadge className="h-4 gap-1 px-1.5 py-0 text-[8px]" />
      </button>
      <span id="concierge-development-message" className="sr-only">
        Mila's Styling Studio is still being finished and isn't available yet.
      </span>
    </nav>
  );
}
