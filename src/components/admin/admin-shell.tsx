import { useEffect, useState } from "react";
import { Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, ShieldAlert } from "lucide-react";
import { adminGateQueryOptions } from "@/lib/queries/admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export function AdminShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { data: gate, isLoading } = useQuery(adminGateQueryOptions());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSidebarOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center bg-background text-stone">
        <Loader2 className="size-4 animate-spin" />
      </div>
    );
  }

  if (!gate?.is_admin) {
    return (
      <div className="h-dvh flex items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <ShieldAlert className="mx-auto size-8 text-stone" strokeWidth={1.2} />
          <h1 className="mt-6 font-serif text-2xl tracking-[0.2em] uppercase text-ink">
            Restricted
          </h1>
          <p className="mt-3 text-sm text-stone">
            The Atelier admin suite is reserved for authorized stewards.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-dvh overflow-hidden bg-background flex">
      <div className="hidden lg:flex">
        <AdminSidebar path={path} />
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <div key="admin-mobile-drawer" className="fixed inset-0 z-50 lg:hidden">
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
              aria-label="Close admin navigation"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%", opacity: 0.96 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative h-full w-[min(22rem,88vw)]"
            >
              <AdminSidebar path={path} onNavigate={() => setSidebarOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col min-h-0">
        <AdminHeader
          path={path}
          sidebarOpen={sidebarOpen}
          onOpenSidebar={() => setSidebarOpen(true)}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-5 md:px-8 py-8 md:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
