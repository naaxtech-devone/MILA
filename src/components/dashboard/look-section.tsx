export function LookSection({
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
