import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "primary" | "focus" | "habit" | "ai" | "muted";

const accentStyles: Record<Accent, string> = {
  primary: "bg-primary/10 text-primary",
  focus: "bg-focus/10 text-focus",
  habit: "bg-habit/10 text-habit",
  ai: "bg-ai-bg text-ai",
  muted: "bg-muted text-muted-foreground",
};

interface WidgetContainerProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  action?: React.ReactNode;
  accent?: Accent;
  className?: string;
  fullHeight?: boolean;
}

export default function WidgetContainer({
  title,
  icon,
  children,
  action,
  accent = "muted",
  className,
  fullHeight = true,
}: WidgetContainerProps) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-sm",
        fullHeight && "h-full min-h-[300px]",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {icon && (
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md [&>svg]:h-4 [&>svg]:w-4",
                accentStyles[accent],
              )}
            >
              {icon}
            </span>
          )}
          <h2 className="text-h3 text-foreground">{title}</h2>
        </div>

        {action ?? (
          <button
            type="button"
            aria-label="گزینه‌های بیشتر"
            className="rounded-md p-1.5 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            <MoreHorizontal size={18} />
          </button>
        )}
      </div>

      <div className={cn("flex flex-col", fullHeight && "flex-1")}>
        {children}
      </div>
    </section>
  );
}
