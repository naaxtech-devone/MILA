import { Link } from "@tanstack/react-router";
import { Camera, LayoutGrid, Palette, Images, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileTabItems: { to: string; label: string; icon: typeof LayoutGrid }[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { to: "/feed", label: "Feed", icon: Images },
];

export function MobileTabBar({
  path,
  onOpenLens,
  onOpenConcierge,
}: {
  path: string;
  onOpenLens: () => void;
  onOpenConcierge: () => void;
}) {
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
            <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
            <span>{it.label}</span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onOpenLens}
        className="relative flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[9px] uppercase tracking-[0.18em] text-surface/50"
      >
        <Camera className="h-4.5 w-4.5" strokeWidth={1.5} />
        <span>Lens</span>
      </button>
      <Link
        to="/style-profile"
        className={cn(
          "relative flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[9px] uppercase tracking-[0.18em] transition-colors",
          path === "/style-profile" ? "text-accent" : "text-surface/50",
        )}
      >
        <Palette className="h-4.5 w-4.5" strokeWidth={1.5} />
        <span>Studio</span>
      </Link>
      <button
        type="button"
        onClick={onOpenConcierge}
        className="relative flex-1 flex flex-col items-center gap-0.5 py-1.5 text-[9px] uppercase tracking-[0.18em] text-surface/50"
      >
        <MessageCircle className="h-4.5 w-4.5" strokeWidth={1.5} />
        <span>Concierge</span>
      </button>
    </nav>
  );
}
