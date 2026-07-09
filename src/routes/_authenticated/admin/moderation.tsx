import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { EyeOff, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { queryKeys } from "@/constants/query-keys";
import { adminHidePost, adminDeletePost } from "@/lib/admin.functions";
import { adminModerationQueryOptions } from "@/lib/queries/admin";

export const Route = createFileRoute("/_authenticated/admin/moderation")({
  component: ModerationPage,
});

function ModerationPage() {
  const qc = useQueryClient();
  const hide = useServerFn(adminHidePost);
  const del = useServerFn(adminDeletePost);

  const { data, isLoading } = useQuery(adminModerationQueryOptions());

  async function toggleHidden(id: string, hidden: boolean) {
    try {
      const reason = hidden ? (window.prompt("Reason for hiding (optional):") ?? null) : null;
      await hide({ data: { post_id: id, hidden, reason } });
      toast.success(hidden ? "Post hidden from feed." : "Post restored.");
      qc.invalidateQueries({ queryKey: queryKeys.adminPosts });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't update post.");
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this post permanently? This cannot be undone.")) return;
    try {
      await del({ data: { post_id: id } });
      toast.success("Post deleted.");
      qc.invalidateQueries({ queryKey: queryKeys.adminPosts });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't delete.");
    }
  }

  const rows = data ?? [];

  return (
    <div>
      <div className="mb-6 text-[10px] uppercase tracking-[0.22em] text-stone">
        {isLoading ? "Loading…" : `${rows.length} entries`}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rows.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-porcelain/60 bg-atelier-panel/40 overflow-hidden flex flex-col"
          >
            <div className="relative aspect-3/4 bg-background">
              {p.image_url_back ? (
                <img
                  src={p.image_url_back}
                  alt=""
                  className={`w-full h-full object-cover ${p.hidden ? "opacity-40 grayscale" : ""}`}
                />
              ) : null}
              {p.hidden && (
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="outline"
                    className="bg-background/90 border-destructive/50 text-destructive text-[9px] uppercase tracking-[0.18em]"
                  >
                    Hidden
                  </Badge>
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col gap-3">
              <div>
                <div className="font-serif text-sm text-ink truncate">
                  {p.author_name || "Unnamed"}
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-stone truncate">
                  {p.author_email}
                </div>
              </div>
              {p.caption && (
                <p className="text-xs text-stone line-clamp-3 leading-relaxed">{p.caption}</p>
              )}
              {p.hidden_reason && (
                <p className="text-[10px] uppercase tracking-[0.18em] text-destructive/80">
                  Reason: {p.hidden_reason}
                </p>
              )}
              <div className="mt-auto flex items-center gap-2 pt-2 border-t border-porcelain/40">
                <Button
                  size="sm"
                  variant="ghost"
                  className="flex-1 h-8 text-[10px] uppercase tracking-[0.22em] text-stone hover:text-ink"
                  onClick={() => toggleHidden(p.id, !p.hidden)}
                >
                  {p.hidden ? (
                    <>
                      <Eye className="h-3.5 w-3.5 mr-1.5" />
                      Restore
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3.5 w-3.5 mr-1.5" />
                      Hide
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => remove(p.id)}
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!isLoading && rows.length === 0 && (
        <div className="px-5 py-16 text-center text-sm text-stone border border-porcelain/40 rounded-2xl">
          No posts to moderate.
        </div>
      )}
    </div>
  );
}
