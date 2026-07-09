import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { adminGateQueryOptions } from "@/lib/queries/admin";

export function SiteHeader() {
  const { session } = useAuth();
  const { data: gate } = useQuery({ ...adminGateQueryOptions(), enabled: !!session });
  const destination = session ? (gate?.is_admin ? "/admin" : "/dashboard") : "/login";
  const label = session ? (gate?.is_admin ? "Admin" : "Dashboard") : "Sign in";

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <span className="flex items-center gap-2.5 font-serif text-xl font-bold tracking-[0.35em] text-foreground">
        <img src="/favicon.svg" alt="" className="h-6 w-6" />
        MILA
      </span>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          to={destination}
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          {label}
        </Link>
      </div>
    </header>
  );
}
