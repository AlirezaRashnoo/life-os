import type { ReactNode } from "react";

type ReviewItem = {
  title: string;
  description: string;
};

type WeeklyReviewSectionProps = {
  icon: ReactNode;
  title: string;
  items: ReviewItem[];
  variant: "success" | "warning";
  delay?: string;
};

export default function WeeklyReviewSection({
  icon,
  title,
  items,
  variant,
  delay,
}: WeeklyReviewSectionProps) {
  const iconClass = variant === "success" ? "text-success" : "text-warning";

  const borderClass =
    variant === "success" ? "border-r-success/60" : "border-r-warning/60";

  return (
    <section
      className="fade-in rounded-2xl border border-border bg-card p-5"
      style={{ animationDelay: delay }}
    >
      <div className="mb-4 flex items-center gap-2">
        <span className={iconClass}>{icon}</span>

        <h2 className="text-h3 text-foreground">{title}</h2>

        <span className="mr-auto text-caption text-muted-foreground">
          {items.length.toLocaleString("fa-IR")} مورد
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-body-sm text-muted-foreground">
          مورد خاصی برای نمایش وجود ندارد.
        </p>
      ) : (
        <div className="space-y-2.5">
          {items.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={`rounded-xl border-r-2 bg-muted/40 p-3 transition hover:bg-muted/70 ${borderClass}`}
            >
              <p className="text-body-sm font-medium text-foreground">
                {item.title}
              </p>

              <p className="mt-1 text-caption leading-5 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
