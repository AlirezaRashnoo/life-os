import { AlertTriangle, CheckCircle2, ListChecks } from "lucide-react";

type WeeklyReviewStatsProps = {
  completionRate: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
};

const fa = (n: number) => n.toLocaleString("fa-IR");

function getRateColor(rate: number) {
  if (rate >= 70) return "var(--success)";
  if (rate >= 40) return "var(--warning)";
  return "var(--destructive)";
}

export default function WeeklyReviewStats({
  completionRate,
  totalTasks,
  completedTasks,
  pendingTasks,
}: WeeklyReviewStatsProps) {
  const rateColor = getRateColor(completionRate);

  return (
    <section
      className="fade-in grid grid-cols-2 gap-3 lg:grid-cols-4"
      style={{ animationDelay: "80ms" }}
    >
      <div className="col-span-2 flex items-center gap-4 rounded-xl border border-border bg-card p-4 lg:col-span-1">
        <RadialProgress value={completionRate} color={rateColor} />

        <div>
          <p className="text-caption text-muted-foreground">نرخ تکمیل</p>

          <p
            className="mt-1 text-2xl font-semibold"
            style={{ color: rateColor }}
          >
            {fa(completionRate)}٪
          </p>
        </div>
      </div>

      <StatCard
        icon={<ListChecks size={16} />}
        label="کل کارها"
        value={totalTasks}
      />

      <StatCard
        icon={<CheckCircle2 size={16} />}
        label="انجام‌شده"
        value={completedTasks}
        accent="var(--success)"
      />

      <StatCard
        icon={<AlertTriangle size={16} />}
        label="باقی‌مانده"
        value={pendingTasks}
        accent="var(--warning)"
      />
    </section>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition hover:border-primary/20">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <span style={accent ? { color: accent } : undefined}>{icon}</span>

        <p className="text-caption">{label}</p>
      </div>

      <p className="mt-2 text-2xl font-semibold text-foreground">{fa(value)}</p>
    </div>
  );
}

function RadialProgress({
  value,
  color,
  size = 56,
}: {
  value: number;
  color: string;
  size?: number;
}) {
  const stroke = 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const normalizedValue = Math.min(Math.max(value, 0), 100);

  const offset = circumference - (normalizedValue / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className="shrink-0 -rotate-90"
      aria-label={`نرخ تکمیل ${normalizedValue} درصد`}
      role="img"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--border)"
        strokeWidth={stroke}
        fill="none"
      />

      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: "stroke-dashoffset 700ms ease",
        }}
      />
    </svg>
  );
}
