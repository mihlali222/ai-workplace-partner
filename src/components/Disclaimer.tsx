import { ShieldAlert } from "lucide-react";

export function Disclaimer() {
  return (
    <div className="flex items-start gap-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>
        AI-generated content may contain errors or bias. Always review and edit outputs before
        sharing or acting on them. Avoid submitting confidential information.
      </span>
    </div>
  );
}
