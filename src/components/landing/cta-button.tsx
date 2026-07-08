import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaButton({ children = "Get your first look" }: { children?: React.ReactNode }) {
  return (
    <Button
      asChild
      className="h-12 rounded-full bg-foreground px-8 text-xs uppercase tracking-[0.2em] text-background hover:bg-foreground/90"
    >
      <Link to="/login">
        {children} <ArrowRight className="ml-2 h-4 w-4 text-(--atelier-gold)" />
      </Link>
    </Button>
  );
}
