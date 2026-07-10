import { Sparkles, Zap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { CREDIT_PACKS } from "@/constants/app";

export function UpgradeSlotsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  variant?: "credits";
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="mx-auto sm:mx-0 mb-2 inline-flex items-center justify-center size-12 rounded-full bg-atelier-champagne/20 ring-1 ring-atelier-champagne/40">
            <Zap className="size-5 text-foreground" strokeWidth={1.75} />
          </div>
          <DialogTitle className="font-serif text-2xl">Studio Energy Depleted</DialogTitle>
          <DialogDescription>
            Your complimentary daily styling credits have been filled for the session. Top up with a
            Mila Premium Pack or wait for tomorrow's studio reset.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-3">
          {CREDIT_PACKS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => toast.info("Mila billing comes online soon — credits reset tomorrow.")}
              className="w-full flex items-center justify-between gap-4 border border-border p-4 text-left hover:border-foreground/60 transition-colors"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="size-4 mt-0.5 text-atelier-champagne" />
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.description}</p>
                </div>
              </div>
              <span className="text-sm font-medium shrink-0">{p.price}</span>
            </button>
          ))}
        </div>

        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-4 text-center">
          Premium billing coming soon · credits refresh daily
        </p>
      </DialogContent>
    </Dialog>
  );
}
