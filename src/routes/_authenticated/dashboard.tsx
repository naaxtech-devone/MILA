import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { Sparkles, Loader2, CheckCircle2, Wand2, Bookmark } from "lucide-react";
import { ClimateWidget, ClimateGlyph } from "@/components/dashboard/climate-widget";
import type { ClimateState } from "@/constants/climate";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { generateDailyLook, type DailyLook } from "@/lib/generate-outfit.functions";
import { toast } from "sonner";
import { UpgradeSlotsDialog } from "@/components/dashboard/upgrade-slots-dialog";
import { isInsufficientCreditsError } from "@/lib/credits";
import { profileQueryOptions } from "@/lib/queries/profile";
import { greet } from "@/lib/greet";
import { DailyPaletteGenerator } from "@/components/wardrobe/DailyPaletteGenerator";
import { motion, type Variants } from "framer-motion";
import { VIBES } from "@/constants/app";

const cardContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};
const resultContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const resultItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

type Vibe = (typeof VIBES)[number];

function Dashboard() {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    ...profileQueryOptions(user?.id),
    enabled: !!user?.id,
  });

  const profileComplete = !!(profile?.body_type && profile?.color_season);

  const [generating, setGenerating] = useState(false);
  const [look, setLook] = useState<DailyLook | null>(null);
  const [savingLook, setSavingLook] = useState(false);
  const [lookSaved, setLookSaved] = useState(false);
  const [vibe, setVibe] = useState<Vibe>("Casual");
  const [creditPaywallOpen, setCreditPaywallOpen] = useState(false);
  const [climate, setClimate] = useState<ClimateState>({
    label: "22°C Mild & Clear",
    location: "—",
    icon: "sun",
    tempC: 22,
    tempF: 72,
    condition: "Sunny",
  });

  const generate = useServerFn(generateDailyLook);

  async function generateLook() {
    if (!user || !profile?.body_type || !profile?.color_season) {
      toast.error("Complete your Style Profile first.");
      return;
    }
    setGenerating(true);
    setLook(null);
    setLookSaved(false);
    try {
      const payload = {
        bodyType: profile.body_type,
        colorSeason: profile.color_season,
        skinUndertone: profile.skin_undertone ?? null,
        faceShape: profile.face_shape ?? null,
        hairType: profile.hair_type ?? null,
        beautyPreferences: (profile.beauty_preferences as Record<string, unknown> | null) ?? null,
        weather: `${climate.label} (in ${climate.location})`,
        tempF: climate.tempF,
        tempC: climate.tempC,
        condition: climate.condition,
        location: climate.location,
        vibe,
      };

      console.log("[Dashboard] generateDailyLook payload →", payload);
      const res = await generate({ data: payload });
      setLook(res);
    } catch (e) {
      if (isInsufficientCreditsError(e)) {
        setCreditPaywallOpen(true);
      } else {
        toast.error(e instanceof Error ? e.message : "Couldn't generate a look.");
      }
    } finally {
      setGenerating(false);
    }
  }

  async function saveLookToHistory() {
    if (!user || !look) return;
    setSavingLook(true);
    try {
      const { error } = await supabase.from("outfits").insert({
        user_id: user.id,
        image_url: "",
        analysis_result: {
          type: "daily_look",
          weather: `${climate.label} (${climate.location})`,
          vibe,
          vibe_alignment_score: look.vibe_alignment_score,
          outfit: look.outfit,
          hair: look.hair,
          makeup: look.makeup,
        },
        match_score: null,
      });
      if (error) throw error;
      setLookSaved(true);
      toast.success("Saved to your history.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't save look.");
    } finally {
      setSavingLook(false);
    }
  }

  return (
    <motion.div
      className="atelier-page max-w-5xl"
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={cardItemVariants}
        className="relative mb-10 sm:mb-14 overflow-hidden atelier-card atelier-hero-card"
      >
        <div className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 rounded-full bg-atelier-champagne/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-atelier-rose/15 blur-3xl" />

        <div className="relative p-6 sm:p-8 md:p-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <p className="atelier-kicker">Today</p>
              <h2 className="atelier-title mt-2">
                {greet()}
                {profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}.
              </h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Let Mila compose an ideal OOTD for today's weather, your palette, and your
                silhouette.
              </p>
            </div>
            <ClimateWidget value={climate} onChange={setClimate} />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-end gap-3">
            <div className="w-full sm:max-w-xs">
              <p className="atelier-kicker mb-2">Occasion Vibe Selector</p>
              <Select value={vibe} onValueChange={(v) => setVibe(v as Vibe)}>
                <SelectTrigger className="h-11 rounded-full border-border bg-card/60 backdrop-blur uppercase tracking-[0.18em] text-[11px]">
                  <SelectValue placeholder="Select an occasion" />
                </SelectTrigger>
                <SelectContent>
                  {VIBES.map((v) => (
                    <SelectItem
                      key={v}
                      value={v}
                      className="uppercase tracking-[0.18em] text-[11px]"
                    >
                      {v}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={generateLook}
              disabled={generating || !profileComplete}
              className="w-full sm:w-auto h-12 px-6 rounded-full bg-foreground text-background hover:bg-foreground/90 uppercase tracking-[0.2em] text-xs whitespace-normal text-center leading-snug"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Composing…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2 shrink-0 text-(--atelier-gold)" /> Generate look —{" "}
                  {climate.tempC}°C{" "}
                  {climate.label.replace(/^[-\d.]+\s*°[CF]\s*/i, "").split(/[\s,]+/)[0] ||
                    climate.condition}
                </>
              )}
            </Button>
            {!profileComplete && (
              <span className="text-xs text-muted-foreground">
                Complete your style profile to unlock.
              </span>
            )}
          </div>

          <div className="mt-8">
            {generating ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-3/4 rounded-2xl bg-foreground/6 animate-pulse" />
                ))}
              </div>
            ) : look ? (
              <motion.div
                className="space-y-6"
                variants={resultContainerVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.22em]">
                    <span className="text-muted-foreground">{vibe}</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/40" />
                    <span className="font-medium">Vibe fit {look.vibe_alignment_score}/10</span>
                    <span className="h-1 w-1 rounded-full bg-foreground/40" />
                    <ClimateGlyph icon={climate.icon} className="h-3 w-3" />
                    <span className="text-muted-foreground">{climate.label}</span>
                  </span>
                </div>
                <motion.div variants={resultItemVariants}>
                  <LookSection kicker="Outfit" title={look.outfit.headline}>
                    <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/90">
                      {look.outfit.description}
                    </p>
                    <p className="text-sm text-muted-foreground italic mt-3">
                      Styling notes — {look.outfit.styling_notes}
                    </p>
                  </LookSection>
                </motion.div>
                <motion.div variants={resultItemVariants}>
                  <LookSection kicker="Hair" title={look.hair.style}>
                    <p className="text-sm text-muted-foreground">{look.hair.execution_tip}</p>
                  </LookSection>
                </motion.div>
                <motion.div variants={resultItemVariants}>
                  <LookSection kicker="Makeup" title={look.makeup.palette}>
                    <p className="text-sm text-muted-foreground">{look.makeup.details}</p>
                  </LookSection>
                </motion.div>
                <motion.div variants={resultItemVariants} className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={saveLookToHistory}
                    disabled={savingLook || lookSaved}
                    className="rounded-full h-10 px-5 uppercase tracking-[0.2em] text-[11px]"
                  >
                    {lookSaved ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 mr-2" /> Saved
                      </>
                    ) : savingLook ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4 mr-2" /> Save to history
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={generateLook}
                    className="rounded-full h-10 px-5 uppercase tracking-[0.2em] text-[11px]"
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-(--atelier-gold)" /> Try another
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-10 text-center">
                <p className="atelier-kicker">Awaiting your cue</p>
                <p className="atelier-title mt-2">
                  Pick a vibe, then let Mila prescribe today's OOTD.
                </p>
                <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                  Each look is composed from first principles — tuned to your palette, body
                  architecture, and the weather outside.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {profile?.color_season && (
        <motion.section
          variants={cardItemVariants}
          className="mb-14 rounded-4xl bg-card border border-border p-6 md:p-8 shadow-[0_4px_24px_rgba(43,35,28,0.07),0_1px_4px_rgba(43,35,28,0.04)]"
        >
          <DailyPaletteGenerator userColorSeason={profile.color_season} />
        </motion.section>
      )}

      <UpgradeSlotsDialog
        open={creditPaywallOpen}
        onOpenChange={setCreditPaywallOpen}
        variant="credits"
      />
    </motion.div>
  );
}

function LookSection({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-4xl border border-border bg-card p-5 md:p-6 shadow-[0_4px_24px_rgba(43,35,28,0.07),0_1px_4px_rgba(43,35,28,0.04)]">
      <p className="atelier-kicker mb-2">{kicker}</p>
      <h3 className="font-serif text-xl md:text-2xl leading-snug mb-3">{title}</h3>
      {children}
    </section>
  );
}
