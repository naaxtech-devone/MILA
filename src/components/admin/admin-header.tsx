import { Link } from "@tanstack/react-router";
import { LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useSignOut } from "@/hooks/use-sign-out";
import { ADMIN_LINKS } from "@/components/admin/admin-sidebar";

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "Overview & analytics" },
  "/admin/members": { title: "Members", subtitle: "Manage accounts & stewardship" },
  "/admin/moderation": { title: "Moderation", subtitle: "Review and moderate the feed" },
  "/admin/support": { title: "Support", subtitle: "Help desk & feedback" },
};

export function AdminHeader({ path }: { path: string }) {
  const { user } = useAuth();
  const { signingOut, handleSignOut } = useSignOut();
  const meta = PAGE_META[path] ?? { title: "Admin", subtitle: "" };

  return (
    <header className="shrink-0 border-b border-porcelain/60 bg-background/80 backdrop-blur px-5 md:px-8">
      <div className="flex items-center justify-between gap-4 py-4 md:py-5">
        <div className="min-w-0">
          <div className="text-[9px] uppercase tracking-[0.28em] text-stone md:hidden">
            Atelier · Steward
          </div>
          <h1 className="mt-1 md:mt-0 font-serif text-xl md:text-2xl tracking-[0.12em] uppercase text-ink truncate">
            {meta.title}
          </h1>
          {meta.subtitle && (
            <p className="mt-1 text-xs text-stone hidden md:block">{meta.subtitle}</p>
          )}
        </div>
        <div className="hidden md:block text-xs text-stone shrink-0 truncate max-w-48">
          {user?.email}
        </div>
      </div>

      <nav className="md:hidden flex gap-2 overflow-x-auto pb-3" aria-label="Admin sections">
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
          className="shrink-0 inline-flex items-center gap-2 rounded-full border border-porcelain/60 px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-stone hover:text-ink hover:border-porcelain transition-colors disabled:opacity-50"
        >
          {signingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
          )}
          Sign Out
        </button>
      </nav>
    </header>
  );
}
