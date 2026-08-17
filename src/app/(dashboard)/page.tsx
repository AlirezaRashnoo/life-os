import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import DashboardGrid from "@/components/dashboard/DashboardGrid";
import WidgetTodo from "@/components/dashboard/WidgetTodo";
import WidgetCalendar from "@/components/dashboard/WidgetCalendar";
import WidgetBookmarks from "@/components/dashboard/WidgetBookmarks";
import WidgetHabitTracker from "@/components/dashboard/WidgetHabitTracker";
import WidgetWeather from "@/components/dashboard/WidgetWeather";
// import WidgetAIBrief from "@/components/dashboard/WidgetAIBrief";
import WidgetNotes from "@/components/dashboard/WidgetNotes";
import WidgetAIBrief from "@/components/dashboard/WidgetAIBrief";

export default async function Home() {
  const user = await getCurrentUser();

  const [tasks, events, bookmarks, habits, notes] = await Promise.all([
    prisma.task.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.event.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        startTime: "asc",
      },
    }),

    prisma.bookmark.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.habit.findMany({
      where: {
        userId: user.id,
      },
      include: {
        completions: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.note.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 4,
    }),
  ]);

  return (
    <>
      <div className="mb-4">
        <WidgetAIBrief />
      </div>
      <DashboardGrid>
        <div>
          <WidgetWeather />
        </div>

        <div>
          <WidgetBookmarks bookmarks={bookmarks} />
        </div>

        <div>
          <WidgetHabitTracker habits={habits} />
        </div>

        <div>
          <WidgetCalendar events={events} />
        </div>

        <div>
          <WidgetNotes notes={notes} />
        </div>

        <div>
          <WidgetTodo tasks={tasks} />
        </div>
      </DashboardGrid>
    </>
  );
}
