import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { getMembersColumns } from "@/components/admin/members-columns";
import { MemberFormDialog } from "@/components/admin/member-form-dialog";
import { useAuth } from "@/hooks/use-auth";
import { queryKeys } from "@/constants/query-keys";
import { adminSetAdminRole, adminSetSuspended, type AdminUserRow } from "@/lib/admin.functions";
import { adminMembersQueryOptions } from "@/lib/queries/admin";

export const Route = createFileRoute("/_authenticated/admin/members")({
  component: MembersPage,
});

function MembersPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const setRole = useServerFn(adminSetAdminRole);
  const setSuspended = useServerFn(adminSetSuspended);
  const [formOpen, setFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdminUserRow | undefined>(undefined);

  const { data, isLoading } = useQuery(adminMembersQueryOptions());

  function openCreate() {
    setEditingMember(undefined);
    setFormOpen(true);
  }

  function openEdit(member: AdminUserRow) {
    setEditingMember(member);
    setFormOpen(true);
  }

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
    onEdit: openEdit,
  });

  return (
    <div>
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        searchable
        searchPlaceholder="Search by name, username, or email"
        searchText={(u) => `${u.full_name ?? ""} ${u.username ?? ""} ${u.email ?? ""}`}
        countLabel="members"
        emptyMessage="No members found."
        action={
          <Button size="sm" className="h-9 text-xs gap-1.5" onClick={openCreate}>
            <Plus className="h-3.5 w-3.5" />
            Add Member
          </Button>
        }
      />

      <MemberFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        member={editingMember}
        onSaved={() => qc.invalidateQueries({ queryKey: queryKeys.adminUsers })}
      />
    </div>
  );
}
