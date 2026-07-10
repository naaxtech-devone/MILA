import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminCreateMember, adminUpdateMember, type AdminUserRow } from "@/lib/admin.functions";

interface MemberFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Present for edit mode; omitted when creating a new member. */
  member?: AdminUserRow;
  onSaved: () => void;
}

export function MemberFormDialog({ open, onOpenChange, member, onSaved }: MemberFormDialogProps) {
  const isEdit = !!member;
  const createMember = useServerFn(adminCreateMember);
  const updateMember = useServerFn(adminUpdateMember);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    setEmail(member?.email ?? "");
    setPassword("");
    setFullName(member?.full_name ?? "");
    setUsername(member?.username ?? "");
  }, [open, member]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isEdit) {
        await updateMember({
          data: { user_id: member.id, full_name: fullName.trim(), username: username.trim() },
        });
        toast.success("Member updated.");
      } else {
        await createMember({
          data: {
            email: email.trim(),
            password,
            full_name: fullName.trim() || undefined,
            username: username.trim() || undefined,
          },
        });
        toast.success("Member created.");
      }
      onOpenChange(false);
      onSaved();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't save member.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">{isEdit ? "Edit Member" : "Add Member"}</DialogTitle>
          <DialogDescription className="text-xs">
            {isEdit
              ? "Update this member's profile details."
              : "Create a new member account directly. They can sign in immediately."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isEdit && (
            <>
              <div className="space-y-1.5">
                <Label className="text-xs">Email Address</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
            </>
          )}
          <div className="space-y-1.5">
            <Label className="text-xs">Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <DialogFooter className="pt-1">
            <Button type="submit" disabled={submitting} className="h-9 text-xs px-4">
              {submitting ? "Saving…" : isEdit ? "Save Changes" : "Create Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
