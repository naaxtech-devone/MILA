import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  "/admin": { title: "Dashboard", subtitle: "Overview & analytics" },
  "/admin/members": { title: "Members", subtitle: "Manage accounts & stewardship" },
  "/admin/moderation": { title: "Moderation", subtitle: "Review and moderate the feed" },
  "/admin/support": { title: "Support", subtitle: "Help desk & feedback" },
};

export function AdminHeader({
  path,
  sidebarOpen,
  onOpenSidebar,
}: {
  path: string;
  sidebarOpen: boolean;
  onOpenSidebar: () => void;
}) {
  const meta = PAGE_META[path] ?? { title: "Admin", subtitle: "" };

  return (
    <header className="shrink-0 border-b border-porcelain/60 bg-background/80 backdrop-blur px-5 md:px-8">
      <div className="flex items-center justify-between gap-4 py-4 md:py-5">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenSidebar}
            aria-label="Open admin navigation"
            aria-expanded={sidebarOpen}
            className="lg:hidden inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-porcelain/60 bg-background/60 text-ink hover:border-porcelain transition-colors"
          >
            <Menu className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <div className="min-w-0">
            <div className="text-[9px] uppercase tracking-[0.28em] text-stone lg:hidden">
              Atelier · Steward
            </div>
            <h1 className="mt-1 lg:mt-0 font-serif text-xl md:text-2xl tracking-[0.12em] uppercase text-ink truncate">
              {meta.title}
            </h1>
            {meta.subtitle && (
              <p className="mt-1 text-xs text-stone hidden lg:block">{meta.subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
