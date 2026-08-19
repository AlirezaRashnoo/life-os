import { CalendarDays, CheckCircle2, Flame, NotebookPen } from "lucide-react";

type SecondaryStats = {
  events: number;
  habits: number;
  habitCompletions: number;
  notesUpdated: number;
};

type WeeklyReviewSecondaryStatsProps = {
  statistics: SecondaryStats;
};

const fa = (n: number) => n.toLocaleString("fa-IR");

export default function WeeklyReviewSecondaryStats({
  statistics,
}: WeeklyReviewSecondaryStatsProps) {
  return (
    <section
      className="fade-in grid grid-cols-2 gap-3 md:grid-cols-4"
      style={{ animationDelay: "260ms" }}
    >
      <MiniStat
        icon={<CalendarDays size={15} />}
        label="جلسه‌ها"
        value={statistics.events}
      />

      <MiniStat
        icon={<Flame size={15} />}
        label="عادت‌های فعال"
        value={statistics.habits}
      />

      <MiniStat
        icon={<CheckCircle2 size={15} />}
        label="تکمیل عادت‌ها"
        value={statistics.habitCompletions}
      />

      <MiniStat
        icon={<NotebookPen size={15} />}
        label="یادداشت‌های ویرایش‌شده"
        value={statistics.notesUpdated}
      />
    </section>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>

      <div>
        <p className="text-caption text-muted-foreground">{label}</p>

        <p className="text-lg font-semibold text-foreground">{fa(value)}</p>
      </div>
    </div>
  );
}
