import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Star, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    // Members skip the pitch. SSR has no session; the landing page is public anyway.
    if (typeof window === "undefined") return;
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/dashboard" });
  },
  component: LandingPage,
});

// Slow and editorial — nothing bounces, nothing flashes (brand kit, Visual Style).
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      className={className}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.section>
  );
}

const TESTIMONIALS = [
  { name: "Amara", season: "True Summer", quote: "As a True Summer, I finally understand what to buy." },
  { name: "Jess", season: "Soft Autumn", quote: "Mila got my face shape right from day one." },
  { name: "Priya", season: "Deep Winter", quote: "She told me exactly which reds are mine. Not red — mine." },
  { name: "Sofia", season: "Light Spring", quote: "One tap before work. I stopped second-guessing the mirror." },
  { name: "Renee", season: "True Autumn", quote: "The first app that talks about my shape without talking around it." },
];

const STEPS = [
  {
    n: "01",
    title: "Tell Mila who you are",
    body: "Three questions, under a minute. Your colour season, your silhouette, your features.",
  },
  {
    n: "02",
    title: "Get your look",
    body: "Outfit, hair, and makeup for today — tuned to your palette and the weather outside.",
  },
  {
    n: "03",
    title: "Post and discover",
    body: "Share your look, unlock the feed, and see how women with your season dress in real life.",
  },
];

function SeasonTag({ season }: { season: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-(--atelier-gold-muted) bg-(--atelier-gold-light) px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-foreground/70">
      {season}
    </span>
  );
}

function CtaButton({ children = "Get your first look" }: { children?: React.ReactNode }) {
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

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-serif text-xl font-bold tracking-[0.35em] text-foreground">MILA</span>
        <Link
          to="/login"
          className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Sign in
        </Link>
      </header>

      {/* Hero — show the output, not the tool */}
      <Reveal className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-20 pt-10 sm:pt-16 lg:grid-cols-2">
        <div>
          <p className="atelier-kicker">Your AI stylist</p>
          <h1 className="atelier-title mt-3 text-[clamp(2.75rem,7vw,4.25rem)]">
            Your stylist.
            <br />
            Every morning.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed">
            Mila composes your daily look around your colour season, your silhouette, and the
            weather outside. Personalised guidance — without the appointment.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CtaButton />
            <span className="text-xs text-muted-foreground">Takes under a minute</span>
          </div>
        </div>

        {/* Generated look result card — the hero visual per the kit */}
        <div className="atelier-card relative overflow-hidden p-7 sm:p-9">
          <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-atelier-champagne/25 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <SeasonTag season="True Summer" />
              <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                18°C · Light rain
              </span>
            </div>
            <p className="atelier-kicker mt-6">Outfit</p>
            <h3 className="mt-1 font-serif text-2xl leading-snug text-foreground">
              Slate trench over a dove-grey knit
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              Cool, muted layers carry your palette through the rain — soft charcoal trousers keep
              the line long.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 border-t border-border pt-5">
              <div>
                <p className="atelier-kicker">Hair</p>
                <p className="mt-1 text-sm text-foreground">Low knot, centre part — humidity-proof</p>
              </div>
              <div>
                <p className="atelier-kicker">Makeup</p>
                <p className="mt-1 text-sm text-foreground">Rose-beige lip, cool taupe lid</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Social proof strip */}
      <Reveal className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="flex snap-x gap-4 overflow-x-auto pb-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="atelier-card w-72 shrink-0 snap-start p-5">
              <div className="flex gap-0.5 text-(--atelier-gold)">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-3 font-serif text-base leading-snug text-foreground">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                {t.name} <SeasonTag season={t.season} />
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      {/* How it works */}
      <Reveal className="mx-auto w-full max-w-6xl px-6 pb-24">
        <p className="atelier-kicker">How it works</p>
        <h2 className="mt-2 font-serif">Three steps to dressed</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="atelier-card p-6">
              <span className="font-serif text-3xl text-(--atelier-gold)">{s.n}</span>
              <h3 className="mt-3 font-serif text-xl text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* The Dossier */}
      <Reveal className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-24 lg:grid-cols-2">
        <div>
          <p className="atelier-kicker">The Style Dossier</p>
          <h2 className="mt-2 font-serif">The more Mila knows you, the better she dresses you.</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed">
            Your dossier is a living profile — colour season, body silhouette, face shape, hair
            texture, beauty preferences. Every recommendation is anchored to it, and it gets more
            precise every day you use it.
          </p>
        </div>
        <div className="atelier-card p-7">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg text-foreground">Digital Style Dossier</span>
            <SeasonTag season="True Summer" />
          </div>
          <div className="mt-5 space-y-3 text-sm">
            {[
              ["Colour season", "True Summer — cool, muted, soft"],
              ["Silhouette", "Inverted triangle"],
              ["Beauty profile", "Wavy hair · warm-neutral skin"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 border-b border-border pb-3">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-right text-foreground">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Dossier completion</span>
              <span>80%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-border">
              <div className="h-full w-4/5 rounded-full bg-(--atelier-gold)" />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Dupe Hunter */}
      <Reveal className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="atelier-card atelier-hero-card p-8 sm:p-12">
          <p className="atelier-kicker">Dupe Hunter</p>
          <h2 className="mt-2 font-serif">Mila found the dupe. You keep £340.</h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed">
            Photograph any fashion item and Mila finds an affordable alternative. Same look, a
            fraction of the price.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl">
            <div className="rounded-2xl border border-border bg-card/70 p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                The inspiration
              </p>
              <p className="mt-2 font-serif text-lg text-foreground">Wool-blend maxi coat</p>
              <p className="mt-1 text-sm text-muted-foreground line-through">£420</p>
            </div>
            <div className="rounded-2xl border border-(--atelier-gold-muted) bg-(--atelier-gold-light) p-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-(--atelier-gold)">
                Mila's match
              </p>
              <p className="mt-2 font-serif text-lg text-foreground">Same cut, same drape</p>
              <p className="mt-1 text-sm font-medium text-foreground">£80</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Community */}
      <Reveal className="mx-auto w-full max-w-6xl px-6 pb-24">
        <p className="atelier-kicker">The feed</p>
        <h2 className="mt-2 max-w-xl font-serif">
          A feed that actually makes sense for you.
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed">
          Only the looks that could work for your season — real outfits from women who share your
          palette, not whatever's trending. Share your look, unlock the feed. Everyone here
          actually dresses with intention.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {["True Summer", "Soft Autumn", "Deep Winter", "Light Spring"].map((s) => (
            <SeasonTag key={s} season={s} />
          ))}
        </div>
      </Reveal>

      {/* Final CTA */}
      <Reveal className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="atelier-card p-10 text-center sm:p-16">
          <h2 className="font-serif">Style that knows you.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed">
            Answer 3 quick questions and Mila will compose your first look — tuned to your colours,
            your shape, and today's weather.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton />
          </div>
          <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3 w-3" /> Your profile stays private. Always.
          </p>
        </div>
      </Reveal>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-between">
          <span className="font-serif text-sm tracking-[0.3em] text-foreground">MILA</span>
          <p className="text-xs text-muted-foreground">
            Your AI stylist. Every morning. · © {new Date().getFullYear()} Mila
          </p>
        </div>
      </footer>
    </div>
  );
}
