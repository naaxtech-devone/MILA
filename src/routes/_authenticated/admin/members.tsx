import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserX, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { queryKeys } from "@/constants/query-keys";
import { adminSetAdminRole, adminSetSuspended } from "@/lib/admin.functions";
import { adminMembersQueryOptions } from "@/lib/queries/admin";

export const Route = createFileRoute("/_authenticated/admin/members")({
  component: MembersPage,
});

function MembersPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const setRole = useServerFn(adminSetAdminRole);
  const setSuspended = useServerFn(adminSetSuspended);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery(adminMembersQueryOptions());

  const rows = (data ?? []).filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      u.email?.toLowerCase().includes(q) ||
      u.full_name?.toLowerCase().includes(q) ||
      u.username?.toLowerCase().includes(q)
    );
  });

  async function toggleAdmin(id: string, grant: boolean) {
    try {
      await setRole({ data: { user_id: id, grant } });
      toast.success(grant ? "Steward role granted." : "Steward role revoked.");
      qc.invalidateQueries({ queryKey: queryKeys.adminUsers });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't update role.");
    }
  }

  async function toggleSuspended(id: string, suspended: boolean) {
    try {
      await setSuspended({ data: { user_id: id, suspended } });
      toast.success(suspended ? "Member suspended." : "Member reinstated.");
      qc.invalidateQueries({ queryKey: queryKeys.adminUsers });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Couldn't update status.");
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, username, or email"
          className="max-w-sm bg-background border-porcelain/60 rounded-full text-sm"
        />
        <div className="text-[10px] uppercase tracking-[0.22em] text-stone">
          {isLoading ? "Loading…" : `${rows.length} members`}
        </div>
      </div>

      <div className="rounded-2xl border border-porcelain/60 bg-atelier-panel/40 overflow-hidden">
        <div className="grid grid-cols-12 px-5 py-3 text-[9px] uppercase tracking-[0.22em] text-stone border-b border-porcelain/40">
          <div className="col-span-4">Member</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-1 text-center">Credits</div>
          <div className="col-span-2 text-center">Steward</div>
          <div className="col-span-2 text-right">Status</div>
        </div>
        {rows.map((u) => (
          <div
            key={u.id}
            className="grid grid-cols-12 items-center px-5 py-4 border-b border-porcelain/30 last:border-0 hover:bg-background/40 transition-colors"
          >
            <div className="col-span-4 min-w-0">
              <div className="font-serif text-sm text-ink truncate">
                {u.full_name || u.username || "Unnamed"}
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-stone mt-0.5">
                {u.username ? `@${u.username}` : "—"}
              </div>
            </div>
            <div className="col-span-3 text-xs text-stone truncate">{u.email}</div>
            <div className="col-span-1 text-center text-sm text-ink">{u.ai_credits}</div>
            <div className="col-span-2 flex justify-center">
              <Switch
                checked={u.is_admin}
                disabled={u.id === user?.id && u.is_admin}
                onCheckedChange={(v) => toggleAdmin(u.id, v)}
              />
            </div>
            <div className="col-span-2 flex justify-end items-center gap-2">
              {u.suspended ? (
                <Badge
                  variant="outline"
                  className="border-destructive/50 text-destructive text-[9px] uppercase tracking-[0.18em]"
                >
                  Suspended
                </Badge>
              ) : null}
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2 text-stone hover:text-ink"
                onClick={() => toggleSuspended(u.id, !u.suspended)}
                title={u.suspended ? "Reinstate" : "Suspend"}
              >
                {u.suspended ? <UserCheck className="h-4 w-4" /> : <UserX className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        ))}
        {!isLoading && rows.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-stone">No members found.</div>
        )}
      </div>
    </div>
  );
}
