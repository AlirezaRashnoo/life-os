"use client";

import { useEffect, useState } from "react";
import { Trophy, AlertTriangle, RefreshCw } from "lucide-react";
import type { WeeklyReviewResponse } from "@/types/weekly-review";
import WeeklyReviewHeader from "./WeeklyReviewHeader";
import WeeklyReviewSummary from "./WeeklyReviewSummary";
import WeeklyReviewStats from "./WeeklyReviewStats";
import WeeklyReviewPriority from "./WeeklyReviewPriority";
import WeeklyReviewSection from "./WeeklyReviewSection";
import WeeklyReviewInsights from "./WeeklyReviewInsights";
import WeeklyReviewRecommendations from "./WeeklyReviewRecommendations";
import WeeklyReviewSecondaryStats from "./WeeklyReviewSecondaryStats";
import WeeklyReviewSkeleton from "./WeeklyReviewSkeleton";

const fa = (n: number) => n.toLocaleString("fa-IR");

export default function WeeklyReviewPage() {
  const [data, setData] = useState<WeeklyReviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadReview() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/ai/weekly-review", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to load weekly review");
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      setError("گزارش هفتگی فعلاً در دسترس نیست.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReview();
  }, []);

  if (loading) return <WeeklyReviewSkeleton />;

  if (error || !data) {
    return (
      <div className="mx-auto max-w-5xl py-10" dir="rtl">
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
            <AlertTriangle size={20} className="text-destructive" />
          </div>

          <p className="text-body-sm text-muted-foreground">{error}</p>

          <button
            onClick={loadReview}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 active:scale-[0.98]"
          >
            <RefreshCw size={15} />
            تلاش دوباره
          </button>
        </div>
      </div>
    );
  }

  const { review, statistics } = data;

  return (
    <main dir="rtl" className="mx-auto w-full space-y-6 py-6">
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        :global(.fade-in) {
          animation: fade-in-up 420ms ease both;
        }
        @media (prefers-reduced-motion: reduce) {
          :global(.fade-in) {
            animation: none;
          }
        }
      `}</style>

      {/* Header */}
      <WeeklyReviewHeader onRefresh={loadReview} />

      <WeeklyReviewSummary title={review.title} summary={review.summary} />

      {/* Primary stats */}
      <WeeklyReviewStats
        completionRate={statistics.completionRate}
        totalTasks={statistics.totalTasks}
        completedTasks={statistics.completedTasks}
        pendingTasks={statistics.pendingTasks}
      />

      {/* Priority breakdown */}
      {statistics.pendingTasks > 0 && (
        <WeeklyReviewPriority
          high={statistics.highPriorityPending}
          medium={statistics.mediumPriorityPending}
          low={statistics.lowPriorityPending}
        />
      )}

      {/* Main grid */}
      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyReviewSection
          icon={<Trophy size={17} />}
          title="دستاوردهای هفته"
          items={review.achievements}
          variant="success"
          delay="140ms"
        />

        <WeeklyReviewSection
          icon={<AlertTriangle size={17} />}
          title="نیازمند توجه"
          items={review.attention}
          variant="warning"
          delay="170ms"
        />
      </div>

      {/* Insights */}
      <WeeklyReviewInsights insights={review.insights} />

      {/* Recommendations */}
      <WeeklyReviewRecommendations recommendations={review.recommendations} />

      {/* Secondary stats */}
      <WeeklyReviewSecondaryStats statistics={statistics} />
    </main>
  );
}
