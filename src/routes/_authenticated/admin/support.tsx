import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { queryKeys } from "@/constants/query-keys";
import { adminResolveSupportMessage } from "@/lib/admin.functions";
import { adminSupportQueryOptions } from "@/lib/queries/admin";

export const Route = createFileRoute("/_authenticated/admin/support")({
  component: SupportPage,
});

function SupportPage() {
  const qc = useQueryClient();
  const resolve = useServerFn(adminResolveSupportMessage);

  const { data, isLoading } = useQuery(adminSupportQueryOptions());

  async function toggleResolved(id: string, resolved: boolean) {
    try {
      await resolve({ data: { message_id: id, resolved } });
      qc.invalidateQueries({ queryKey: queryKeys.adminSupportMessages });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't update message.");
    }
  }

  const rows = data ?? [];

  return (
    <div>
      <div className="mb-6 text-[10px] uppercase tracking-[0.22em] text-stone">
        {isLoading ? "Loading…" : `${rows.length} messages`}
      </div>

      <div className="rounded-2xl border border-porcelain/60 bg-atelier-panel/40 overflow-hidden">
        {rows.map((m) => (
          <div
            key={m.id}
            className="flex items-start gap-4 px-5 py-4 border-b border-porcelain/30 last:border-0 hover:bg-background/40 transition-colors"
          >
            <button
              type="button"
              onClick={() => toggleResolved(m.id, !m.resolved)}
              title={m.resolved ? "Mark unresolved" : "Mark resolved"}
              className="mt-0.5 shrink-0 text-stone hover:text-ink transition-colors"
            >
              {m.resolved ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-[9px] uppercase tracking-[0.18em] border-porcelain/60"
                >
                  {m.kind === "help" ? "Help Desk" : "Feedback"}
                </Badge>
                <span className="text-[10px] uppercase tracking-[0.18em] text-stone">
                  {new Date(m.created_at).toLocaleString()}
                </span>
              </div>
              <p
                className={`mt-2 text-sm leading-relaxed ${m.resolved ? "text-stone line-through" : "text-ink"}`}
              >
                {m.message}
              </p>
            </div>
          </div>
        ))}
        {!isLoading && rows.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-stone">No messages yet.</div>
        )}
      </div>
    </div>
  );
}
