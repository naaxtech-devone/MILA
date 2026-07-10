import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DataTable } from "@/components/ui/data-table";
import { getMembersColumns } from "@/components/admin/members-columns";
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

  const { data, isLoading } = useQuery(adminMembersQueryOptions());

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

  const columns = getMembersColumns({
    currentUserId: user?.id,
    onToggleAdmin: toggleAdmin,
    onToggleSuspended: toggleSuspended,
  });

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      isLoading={isLoading}
      searchable
      searchPlaceholder="Search by name, username, or email"
      searchText={(u) => `${u.full_name ?? ""} ${u.username ?? ""} ${u.email ?? ""}`}
      countLabel="members"
      emptyMessage="No members found."
    />
  );
}
