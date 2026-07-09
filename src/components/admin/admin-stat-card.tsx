import type { LucideIcon } from "lucide-react";

export function AdminStatCard({
  icon: Icon,
  label,
  value,
  sublabel,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-porcelain/60 bg-atelier-panel/40 p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-[0.22em] text-stone">{label}</span>
        <Icon className="h-4 w-4 text-(--atelier-gold)" strokeWidth={1.5} />
      </div>
      <div className="font-serif text-3xl text-ink">{value}</div>
      {sublabel && (
        <div className="text-[10px] uppercase tracking-[0.18em] text-stone">{sublabel}</div>
      )}
    </div>
  );
}
