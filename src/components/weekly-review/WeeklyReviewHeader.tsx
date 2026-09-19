"use client";

import { RefreshCw, Sparkles } from "lucide-react";

type WeeklyReviewHeaderProps = {
  onRefresh: () => void | Promise<void>;
};

export default function WeeklyReviewHeader({
  onRefresh,
}: WeeklyReviewHeaderProps) {
  return (
    <header className="fade-in flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ai-bg">
            <Sparkles size={19} className="text-ai" />
          </div>

          <span className="text-caption font-medium text-ai">
            AI Productivity
          </span>
        </div>

        <h1 className="text-h1 text-foreground">مرور هوشمند هفته</h1>

        <p className="mt-1 text-body-sm text-muted-foreground">
          تحلیل عملکرد و پیشنهادهای LifeOS بر اساس داده‌های واقعی این هفته
        </p>
      </div>

      <button
        type="button"
        onClick={() => void onRefresh()}
        className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-caption text-muted-foreground transition hover:border-ai/30 hover:bg-accent hover:text-foreground active:scale-[0.98]"
      >
        <RefreshCw size={14} />
        بازسازی تحلیل
      </button>
    </header>
  );
}
