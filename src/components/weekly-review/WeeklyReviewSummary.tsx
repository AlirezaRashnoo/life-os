import { Sparkles } from "lucide-react";

type WeeklyReviewSummaryProps = {
  title: string;
  summary: string;
};

export default function WeeklyReviewSummary({
  title,
  summary,
}: WeeklyReviewSummaryProps) {
  return (
    <section
      className="fade-in relative overflow-hidden rounded-2xl border border-ai/15 bg-gradient-to-l from-ai-bg/70 to-card p-5"
      style={{ animationDelay: "40ms" }}
    >
      <Sparkles
        size={120}
        strokeWidth={1}
        className="pointer-events-none absolute -left-6 -top-6 text-ai/[0.06]"
      />

      <div className="relative flex gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ai/10">
          <Sparkles size={17} className="text-ai" />
        </div>

        <div>
          <h2 className="text-h3 text-foreground">{title}</h2>

          <p className="mt-2 text-body-sm leading-7 text-muted-foreground">
            {summary}
          </p>
        </div>
      </div>
    </section>
  );
}
