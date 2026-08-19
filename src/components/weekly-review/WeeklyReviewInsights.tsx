import { Brain } from "lucide-react";

type WeeklyReviewInsightsProps = {
  insights: string[];
};

const fa = (n: number) => n.toLocaleString("fa-IR");

export default function WeeklyReviewInsights({
  insights,
}: WeeklyReviewInsightsProps) {
  return (
    <section
      className="fade-in rounded-2xl border border-border bg-card p-5"
      style={{ animationDelay: "200ms" }}
    >
      <div className="mb-4 flex items-center gap-2">
        <Brain size={18} className="text-ai" />

        <h2 className="text-h3 text-foreground">تحلیل HomeOS</h2>
      </div>

      {insights.length === 0 ? (
        <p className="text-body-sm text-muted-foreground">
          بینش خاصی برای این هفته وجود ندارد.
        </p>
      ) : (
        <div className="space-y-2.5">
          {insights.map((insight, index) => (
            <div
              key={`${index}-${insight}`}
              className="flex gap-3 rounded-xl bg-muted/40 p-3 transition hover:bg-muted/70"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ai-bg text-caption font-semibold text-ai">
                {fa(index + 1)}
              </span>

              <p className="text-body-sm leading-6 text-foreground">
                {insight}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
