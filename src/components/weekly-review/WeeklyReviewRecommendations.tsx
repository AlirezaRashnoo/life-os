import { CheckCircle2, Lightbulb } from "lucide-react";

type WeeklyReviewRecommendationsProps = {
  recommendations: string[];
};

export default function WeeklyReviewRecommendations({
  recommendations,
}: WeeklyReviewRecommendationsProps) {
  return (
    <section
      className="fade-in rounded-2xl border border-ai/15 bg-ai-bg/40 p-5"
      style={{ animationDelay: "230ms" }}
    >
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb size={18} className="text-ai" />

        <h2 className="text-h3 text-foreground">پیشنهاد برای هفته آینده</h2>
      </div>

      {recommendations.length === 0 ? (
        <p className="text-body-sm text-muted-foreground">
          پیشنهاد خاصی برای هفته آینده وجود ندارد.
        </p>
      ) : (
        <div className="space-y-3">
          {recommendations.map((recommendation, index) => (
            <div
              key={`${index}-${recommendation}`}
              className="flex items-start gap-3 rounded-xl border border-transparent p-2 transition hover:border-ai/15 hover:bg-card/60"
            >
              <CheckCircle2 size={17} className="mt-1 shrink-0 text-ai" />

              <p className="text-body-sm leading-6 text-foreground">
                {recommendation}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
