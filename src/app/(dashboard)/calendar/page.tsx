import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import CalendarPageClient from "@/components/calendar/CalendarPageClient";

export default async function CalendarPage() {
  const user = await getCurrentUser();

  const events = await prisma.event.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-text-primary">تقویم</h1>
          <p className="text-body text-text-secondary mt-1">
            روزهای تان را برنامه ریزی کنید و منظم باشید
          </p>
        </div>

        {/* <NewEventDialog /> */}
      </div>

      {/* Calendar Surface */}
      <div className="bg-surface-1 rounded-lg">
        <CalendarPageClient
          events={events.map((event) => ({
            id: event.id,
            title: event.title,
            description: event.description ?? "",
            start: event.startTime,
            end: event.endTime ?? undefined,
          }))}
        />
      </div>
    </div>
  );
}
