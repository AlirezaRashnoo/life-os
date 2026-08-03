import { ReactNode } from "react";

export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div
      className="
      border
      border-border
      rounded-lg
      p-10
      text-center
      bg-card
      "
    >
      <h3 className="text-h3 text-text-primary">{title}</h3>

      <p
        className="
      text-body
      text-text-secondary
      mt-2
      "
      >
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
