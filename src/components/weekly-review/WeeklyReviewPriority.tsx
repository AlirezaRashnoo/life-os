type WeeklyReviewPriorityProps = {
  high: number;
  medium: number;
  low: number;
};

const fa = (n: number) => n.toLocaleString("fa-IR");

export default function WeeklyReviewPriority({
  high,
  medium,
  low,
}: WeeklyReviewPriorityProps) {
  const total = Math.max(high + medium + low, 1);

  const percentage = (value: number) => `${(value / total) * 100}%`;

  return (
    <section
      className="fade-in rounded-2xl border border-border bg-card p-5"
      style={{ animationDelay: "110ms" }}
    >
      <h2 className="mb-4 text-h3 text-foreground">اولویت کارهای باقی‌مانده</h2>

      <div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            style={{
              width: percentage(high),
              background: "var(--destructive)",
            }}
          />

          <div
            style={{
              width: percentage(medium),
              background: "var(--warning)",
            }}
          />

          <div
            style={{
              width: percentage(low),
              background: "var(--info)",
            }}
          />
        </div>

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-caption text-muted-foreground">
          <PriorityLegend
            color="var(--destructive)"
            label="بالا"
            value={high}
          />

          <PriorityLegend color="var(--warning)" label="متوسط" value={medium} />

          <PriorityLegend color="var(--info)" label="پایین" value={low} />
        </div>
      </div>
    </section>
  );
}

function PriorityLegend({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      اولویت {label}:{" "}
      <b className="font-semibold text-foreground">{fa(value)}</b>
    </span>
  );
}
