import { auth } from "@/auth";
import { Sparkles, RefreshCw } from "lucide-react";

import WidgetContainer from "./WidgetContainer";

export default async function WidgetAIBrief() {
  const session = await auth();
  const firstName = session?.user?.name?.split(" ")[0];

  const now = new Date();
  const updatedAt = now.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <WidgetContainer
      title="خلاصه روزانه هوشمند"
      icon={<Sparkles />}
      accent="ai"
      fullHeight={false}
      className="bg-gradient-to-l from-ai-bg to-card !mb-0 !p-3.5"
      action={
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-caption text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
        >
          <RefreshCw size={13} />
          بازسازی
        </button>
      }
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-body-sm text-foreground">
            <span className="font-medium">
              {firstName ? `صبح بخیر ${firstName}! ` : "صبح بخیر! "}
            </span>
            <span className="text-muted-foreground">
              امروز روزی آرام و متمرکز در پیش دارید. سه کار مهم منتظر شماست.
            </span>
          </p>
        </div>

        <span className="shrink-0 self-start rounded-md bg-ai-bg px-2 py-0.5 text-caption font-medium text-ai sm:self-center">
          {updatedAt}
        </span>
      </div>
    </WidgetContainer>
  );
}
