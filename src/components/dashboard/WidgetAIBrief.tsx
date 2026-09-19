import { Sparkles } from "lucide-react";
import { getCurrentUser } from "@/lib/current-user";
import { generateMorningBrief } from "@/lib/ai/morning-brief/service";
import WidgetContainer from "./WidgetContainer";

export default async function WidgetAIBrief() {
  const user = await getCurrentUser();
  let brief = null;
  try {
    brief = await generateMorningBrief(user.id);
  } catch (error) {
    console.error("AI Brief failed:", error);
  }

  const firstName = user.name?.split(" ")[0];
  const updatedAt = new Date().toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (!brief) {
    return (
      <WidgetContainer
        title="خلاصه امروز"
        icon={<Sparkles />}
        accent="ai"
        fullHeight={false}
        className="bg-gradient-to-l from-ai-bg to-card !mb-0 !p-3.5"
        action={
          <span className="rounded-md bg-ai-bg px-2 py-0.5 text-caption font-medium text-ai">
            {updatedAt}
          </span>
        }
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ai-bg">
            <Sparkles size={18} className="text-ai" />
          </div>

          <div className="min-w-0">
            <p className="text-body-sm font-medium text-foreground">
              خلاصه امروز فعلاً در دسترس نیست
            </p>

            <p className="mt-0.5 text-caption text-muted-foreground">
              سایر بخش‌های داشبورد بدون مشکل کار می‌کنند.
            </p>
          </div>
        </div>
      </WidgetContainer>
    );
  }

  return (
    <WidgetContainer
      title="خلاصه امروز"
      icon={<Sparkles />}
      accent="ai"
      fullHeight={false}
      className="bg-gradient-to-l from-ai-bg to-card !mb-0 !p-3.5"
      action={
        <span className="rounded-md bg-ai-bg px-2 py-0.5 text-caption font-medium text-ai">
          {updatedAt}
        </span>
      }
    >
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-body-sm font-medium text-foreground">
            {brief.greeting}
            {firstName ? ` ${firstName}` : ""}
          </p>

          <p className="mt-1 text-body-sm leading-6 text-muted-foreground">
            {brief.summary}
          </p>
        </div>

        {brief.recommendation && (
          <div className="flex items-start gap-2.5 rounded-lg border border-ai/10 bg-ai-bg/50 px-3 py-2.5">
            <Sparkles size={15} className="mt-0.5 shrink-0 text-ai" />

            <div className="min-w-0">
              <p className="text-caption font-medium text-ai">پیشنهاد LifeOS</p>

              <p className="mt-0.5 text-body-sm leading-6 text-foreground">
                {brief.recommendation}
              </p>
            </div>
          </div>
        )}
      </div>
    </WidgetContainer>
  );
}
