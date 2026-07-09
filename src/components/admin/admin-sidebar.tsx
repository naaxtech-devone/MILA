import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { LayoutGrid, Users, ShieldAlert, LifeBuoy, LogOut, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const ADMIN_LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutGrid },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/moderation", label: "Moderation", icon: ShieldAlert },
  { to: "/admin/support", label: "Support", icon: LifeBuoy },
] as const;

export function AdminSidebar({ path }: { path: string }) {
  const { user, signOut } = useAuth();
  const [signingOut, setSigningOut] = useState(false);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't sign out.");
      setSigningOut(false);
    }
  }

  const initial = (user?.email?.[0] ?? "M").toUpperCase();

  return (
    <div className="flex flex-col gap-2 md:w-48 md:shrink-0">
      <nav
        className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0"
        aria-label="Admin sections"
      >
        {ADMIN_LINKS.map(({ to, label, icon: Icon }) => {
          const active = path === to;
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] transition-colors",
                active
                  ? "bg-ink text-background border-ink"
                  : "border-porcelain/60 text-stone hover:text-ink hover:border-porcelain",
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
              {label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleSignOut}
          disabled={signingOut}
          aria-label="Sign out"
          className="md:hidden shrink-0 inline-flex items-center gap-2 rounded-full border border-porcelain/60 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-stone hover:text-ink hover:border-porcelain transition-colors disabled:opacity-50"
        >
          {signingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
          Sign Out
        </button>
      </nav>

      <div className="hidden md:mt-auto md:block md:pt-6 md:sticky md:bottom-6">
        <div className="rounded-2xl border border-porcelain/60 bg-atelier-panel/40 overflow-hidden">
          <div className="flex items-center gap-2.5 px-3 py-3">
            <div className="h-8 w-8 shrink-0 rounded-full border border-porcelain/60 bg-background flex items-center justify-center font-serif text-xs text-ink">
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
