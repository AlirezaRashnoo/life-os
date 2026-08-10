import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { Event } from "@prisma/client";

import WidgetContainer from "./WidgetContainer";

export default function WidgetCalendar({ events }: { events: Event[] }) {
  const today = new Date();

  const todayEvents = events
    .filter((event) => {
      const date = new Date(event.startTime);
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    })
    .slice(0, 4);

  return (
    <WidgetContainer title="تقویم امروز" icon={<Calendar />} accent="focus">
      <div className="flex flex-1 flex-col">
        {todayEvents.length === 0 ? (
          <p className="flex-1 text-sm text-muted-foreground">
            امروز رویدادی ثبت نشده.
          </p>
        ) : (
          <div className="flex-1 space-y-3">
            {todayEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3">
                <span className="w-14 shrink-0 font-mono text-caption text-muted-foreground">
                  {new Date(event.startTime).toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>

                <div className="border-r-2 border-focus pr-3">
                  <p className="text-sm font-medium">{event.title}</p>
                  {event.description && (
                    <p className="mt-0.5 line-clamp-1 text-caption text-muted-foreground">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/calendar"
          className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
        >
          مشاهده تقویم
          <ArrowLeft size={14} />
        </Link>
      </div>
    </WidgetContainer>
  );
}
