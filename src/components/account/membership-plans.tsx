import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { publicSubscriptionPlansQueryOptions } from "@/lib/queries/subscription-plans";
import {
  BILLING_INTERVAL_SUFFIX,
  formatPlanPrice,
  type PublicSubscriptionPlan,
} from "@/lib/subscription-plans";

/**
 * Public membership-plan list for the Concierge Access panel. Reads the
 * active plan catalog from Supabase — display only; purchasing remains
 * "In development" (see the disabled actions in StudioMembershipDrawer).
 */
export function MembershipPlans() {
  const { data, isLoading, isError } = useQuery(publicSubscriptionPlansQueryOptions());

  if (isLoading) {
    return (
      <div className="space-y-2" aria-hidden="true">
        <div className="h-16 rounded-lg bg-porcelain/30 animate-pulse" />
        <div className="h-16 rounded-lg bg-porcelain/30 animate-pulse" />
      </div>
    );
  }

  if (isError) {
    return (
      <p role="status" className="text-[10px] uppercase tracking-[0.2em] text-stone">
        Couldn't load membership plans right now.
      </p>
    );
  }

  if (!data?.length) {
    return (
      <p role="status" className="text-[10px] uppercase tracking-[0.2em] text-stone">
        Membership plans will be announced soon.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {data.map((plan) => (
        <MembershipPlanCard key={plan.id} plan={plan} />
      ))}
    </ul>
  );
}

function MembershipPlanCard({ plan }: { plan: PublicSubscriptionPlan }) {
  return (
    <li
      className={cn(
        "rounded-lg border p-4 bg-background/60",
        plan.is_featured
          ? "border-atelier-champagne/70 shadow-atelier-soft"
          : "border-porcelain/50",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-serif text-sm text-ink flex items-center gap-2">
            {plan.title}
            {plan.is_featured && (
              <span className="rounded-full border border-atelier-champagne/60 bg-atelier-champagne/20 px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-ink">
                Recommended
              </span>
            )}
          </p>
          {plan.description && (
            <p className="mt-1 text-xs text-stone leading-relaxed">{plan.description}</p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-medium text-ink tabular-nums">
            {formatPlanPrice(plan.price_amount, plan.currency)}
          </p>
          <p className="text-[9px] uppercase tracking-[0.18em] text-stone mt-0.5">
            {BILLING_INTERVAL_SUFFIX[plan.billing_interval]}
          </p>
        </div>
      </div>
      {(plan.credits_included > 0 || plan.features.length > 0) && (
        <ul className="mt-3 space-y-1">
          {plan.credits_included > 0 && (
            <PlanFeature text={`${plan.credits_included} styling credits included`} />
          )}
          {plan.features.map((feature) => (
            <PlanFeature key={feature} text={feature} />
          ))}
        </ul>
      )}
    </li>
  );
}

function PlanFeature({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-1.5 text-xs text-stone">
      <Check className="size-3 mt-0.5 shrink-0 text-atelier-champagne" aria-hidden="true" />
      {text}
    </li>
  );
}
