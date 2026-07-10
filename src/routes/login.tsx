import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { adminGateQueryOptions } from "@/lib/queries/admin";
import { AuthCard } from "@/components/login/auth-card";
import { SupportDialog } from "@/components/login/support-dialog";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const { data: gate, isError } = useQuery({
    ...adminGateQueryOptions(),
    enabled: !!session,
    retry: false,
  });

  useEffect(() => {
    if (!loading && session && (gate !== undefined || isError)) {
      navigate({ to: gate?.is_admin ? "/admin" : "/dashboard" });
    }
  }, [loading, session, gate, isError, navigate]);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 h-105 w-105 rounded-full bg-atelier-champagne/25 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-105 w-105 rounded-full bg-atelier-rose/20 blur-3xl" />
      </div>

      <div className="relative atelier-page flex flex-col items-center justify-center min-h-screen gap-6 py-10">
        <div className="text-center max-w-md">
          <Link
            to="/login"
            className="inline-flex items-center gap-2.5 font-serif text-2xl tracking-[0.32em]"
          >
            <img src="/favicon.svg" alt="" className="h-7 w-7" />
            MILA
          </Link>
          <p className="atelier-kicker mt-3">Personal AI Fashion Stylist</p>
        </div>

        <AuthCard />
        <SupportDialog />
      </div>
    </div>
  );
}
