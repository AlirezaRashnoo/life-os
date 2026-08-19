import { Sparkles } from "lucide-react";

export default function WeeklyReviewSkeleton() {
  return (
    <main dir="rtl" className="mx-auto w-full max-w-6xl space-y-6 py-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ai-bg">
          <Sparkles size={22} className="animate-pulse text-ai" />
        </div>

        <p className="text-body-sm text-muted-foreground">
          HomeOS در حال تحلیل هفته شماست...
        </p>
      </div>

      <div className="h-32 animate-pulse rounded-2xl bg-card" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-xl bg-card" />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="h-56 animate-pulse rounded-2xl bg-card" />
        <div className="h-56 animate-pulse rounded-2xl bg-card" />
      </div>

      <div className="h-40 animate-pulse rounded-2xl bg-card" />
    </main>
  );
}
