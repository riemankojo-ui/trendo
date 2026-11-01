
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-sm text-center px-6 py-16">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-trendo-primary-tint grid place-items-center mb-4">
        <Icon size={24} className="text-trendo-primary" />
      </div>
      <p className="text-sm font-semibold">{title}</p>
      {body && <p className="mt-1 text-xs text-trendo-muted">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}