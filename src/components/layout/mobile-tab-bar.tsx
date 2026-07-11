import { Link } from "@tanstack/react-router";
import { Camera, LayoutGrid, Palette, Images, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileTabItems: { to: string; label: string; icon: typeof LayoutGrid }[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/feed", label: "Feed", icon: Images },
];

export function MobileTabBar({ path, onOpenLens }: { path: string; onOpenLens: () => void }) {
  return (
    <nav
      className="mila-dark-glass md:hidden fixed left-3 right-3 z-50 flex items-center justify-around rounded-pill px-5 py-2.5"
      style={{ bottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      {mobileTabItems.map((it) => {
        const active = path === it.to;
        const Icon = it.icon;

        return (
          <Link
            key={it.to}
            to={it.to}
            className={cn(
              "relative flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[9px] uppercase tracking-[0.18em] transition-colors",
              active ? "text-accent" : "text-surface/50",
            )}
          >
            <Icon className="size-4.5" strokeWidth={1.75} />
            <span>{it.label}</span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onOpenLens}
        className="relative flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[9px] uppercase tracking-[0.18em] text-surface/50"
      >
        <Camera className="size-4.5" strokeWidth={1.75} />
        <span>Lens</span>
      </button>
      <Link
        to="/style-profile"
        className={cn(
          "relative flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[9px] uppercase tracking-[0.18em] transition-colors",
          path === "/style-profile" ? "text-accent" : "text-surface/50",
        )}
      >
        <Palette className="size-4.5" strokeWidth={1.75} />
        <span>Studio</span>
      </Link>
      {/*
        IN DEVELOPMENT [concierge-chat]:
        See desktop-nav.tsx — no code path ever anchors this drawer to a
        real outfit photo, so the AI chat can never actually answer.
        See /IN_DEVELOPMENT.txt.
      */}
      <button
        type="button"
        disabled
        aria-label="Concierge — in development"
        aria-describedby="concierge-development-message-mobile"
        className="
    relative flex min-w-0 flex-1 cursor-not-allowed
    flex-col items-center justify-center
    gap-1 py-1.5
    text-surface/40
  "
      >
        <MessageCircle className="size-4.75" strokeWidth={1.75} aria-hidden="true" />

        <span className="text-[9px] uppercase leading-none tracking-[0.18em]">Concierge</span>

        <span
          aria-hidden="true"
          className="
      whitespace-nowrap rounded-full
      border border-surface/15 bg-surface/6
      px-1.5 py-0.5
      text-[6px] font-medium uppercase
      leading-none tracking-[0.16em]
      text-surface/45
    "
        >
          In development
        </span>
      </button>
      <span id="concierge-development-message-mobile" className="sr-only">
        Mila's Styling Studio is still being finished and isn't available yet.
      </span>
    </nav>
  );
}
