import { Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShieldAlert } from "lucide-react";
import { adminGateQueryOptions } from "@/lib/queries/admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export function AdminShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { data: gate, isLoading } = useQuery(adminGateQueryOptions());

  if (isLoading) {
    return (
      <div className="h-dvh flex items-center justify-center bg-background text-stone">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!gate?.is_admin) {
    return (
      <div className="h-dvh flex items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <ShieldAlert className="mx-auto h-8 w-8 text-stone" strokeWidth={1.2} />
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
      <AdminSidebar path={path} />

      <div className="flex min-w-0 flex-1 flex-col min-h-0">
        <AdminHeader path={path} />

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-5 md:px-8 py-8 md:py-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
