import type { ColumnDef } from "@tanstack/react-table";
import { UserX, UserCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import type { AdminUserRow } from "@/lib/admin.functions";

interface MembersColumnsOptions {
  currentUserId?: string;
  onToggleAdmin: (id: string, grant: boolean) => void;
  onToggleSuspended: (id: string, suspended: boolean) => void;
}

export function getMembersColumns({
  currentUserId,
  onToggleAdmin,
  onToggleSuspended,
}: MembersColumnsOptions): ColumnDef<AdminUserRow>[] {
  return [
    {
      accessorKey: "full_name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Member" />,
      cell: ({ row }) => (
        <div className="min-w-0">
          <div className="font-serif text-sm text-ink truncate">
            {row.original.full_name || row.original.username || "Unnamed"}
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-stone mt-0.5">
            {row.original.username ? `@${row.original.username}` : "—"}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <div className="text-xs text-stone truncate">{row.original.email}</div>,
    },
    {
      accessorKey: "ai_credits",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Credits" className="justify-center w-full" />
      ),
      cell: ({ row }) => (
        <div className="text-center text-sm text-ink">{row.original.ai_credits}</div>
      ),
    },
    {
      id: "steward",
      header: () => <div className="text-center">Steward</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <Switch
            checked={row.original.is_admin}
            disabled={row.original.id === currentUserId && row.original.is_admin}
            onCheckedChange={(v) => onToggleAdmin(row.original.id, v)}
          />
        </div>
      ),
    },
    {
      id: "status",
      header: () => <div className="text-right">Status</div>,
      cell: ({ row }) => (
        <div className="flex justify-end items-center gap-2">
          {row.original.suspended ? (
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
            onClick={() => onToggleSuspended(row.original.id, !row.original.suspended)}
            title={row.original.suspended ? "Reinstate" : "Suspend"}
          >
            {row.original.suspended ? (
              <UserCheck className="h-4 w-4" />
            ) : (
              <UserX className="h-4 w-4" />
            )}
          </Button>
        </div>
      ),
    },
  ];
}
