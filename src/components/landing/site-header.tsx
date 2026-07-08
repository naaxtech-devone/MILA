import { Link } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <span className="flex items-center gap-2.5 font-serif text-xl font-bold tracking-[0.35em] text-foreground">
        <img src="/favicon.svg" alt="" className="h-6 w-6" />
        MILA
      </span>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          to="/login"
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
}
