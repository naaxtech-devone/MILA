import { Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ShieldAlert } from "lucide-react";
import { adminGateQueryOptions } from "@/lib/queries/admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminShell() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { data: gate, isLoading } = useQuery(adminGateQueryOptions());

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-stone">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>
    );
  }

  if (!gate?.is_admin) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <ShieldAlert className="mx-auto h-8 w-8 text-stone" strokeWidth={1.2} />
        <h1 className="mt-6 font-serif text-2xl tracking-[0.2em] uppercase text-ink">Restricted</h1>
        <p className="mt-3 text-sm text-stone">
          The Atelier admin suite is reserved for authorized stewards.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 md:py-14">
      <header className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.32em] text-stone">Atelier · Steward</div>
        <h1 className="mt-2 font-serif text-3xl md:text-4xl tracking-[0.18em] uppercase text-ink">
          Admin Suite
        </h1>
        <p className="mt-3 text-sm text-stone max-w-xl">
          Manage members, grant stewardship, and moderate the community feed.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-8 md:gap-10">
        <AdminSidebar path={path} />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
