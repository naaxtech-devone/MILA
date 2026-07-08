export function SeasonTag({ season }: { season: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-(--atelier-gold-muted) bg-(--atelier-gold-light) px-2.5 py-0.5 text-[10px] uppercase tracking-[0.18em] text-foreground/70">
      {season}
    </span>
  );
}
