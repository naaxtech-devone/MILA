import { Link } from "@tanstack/react-router";
import { LayoutGrid, Users, ShieldAlert, LifeBuoy, LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useSignOut } from "@/hooks/use-sign-out";

export const ADMIN_LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutGrid },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/moderation", label: "Moderation", icon: ShieldAlert },
  { to: "/admin/support", label: "Support", icon: LifeBuoy },
] as const;

export function AdminSidebar({ path, onNavigate }: { path: string; onNavigate?: () => void }) {
  const { user } = useAuth();
  const { signingOut, handleSignOut } = useSignOut();

  const initial = (user?.email?.[0] ?? "M").toUpperCase();

  return (
    <div className="flex h-full w-76 shrink-0 flex-col border-r border-porcelain/60 bg-atelier-panel/30 px-5 py-6">
      <div className="mb-8 px-1">
        <div className="text-[9px] uppercase tracking-[0.28em] text-stone">Atelier</div>
        <div className="mt-1 font-serif text-xl tracking-[0.14em] uppercase text-ink">
          Admin Suite
        </div>
      </div>

      <nav className="flex flex-col gap-1.5" aria-label="Admin sections">
        {ADMIN_LINKS.map(({ to, label, icon: Icon }) => {
          const active = path === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={() => onNavigate?.()}
              className={cn(
                "flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] transition-colors",
                active
                  ? "bg-ink text-background"
                  : "text-stone hover:text-ink hover:bg-background/60",
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <div className="rounded-2xl border border-porcelain/60 bg-background/60 overflow-hidden">
          <div className="flex items-center gap-2.5 px-3 py-3">
            <div className="h-8 w-8 shrink-0 rounded-full border border-porcelain/60 bg-atelier-panel flex items-center justify-center font-serif text-xs text-ink">
              {initial}
            </div>
            <div className="min-w-0">
              <div className="text-xs text-ink truncate">{user?.email ?? "Steward"}</div>
              <div className="text-[9px] uppercase tracking-[0.18em] text-stone">Administrator</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            aria-label="Sign out"
            className="flex w-full items-center justify-center gap-2 border-t border-porcelain/40 px-3 py-2.5 text-[10px] uppercase tracking-[0.22em] text-stone hover:text-ink hover:bg-background/40 transition-colors disabled:opacity-50"
          >
            {signingOut ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
            )}
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
