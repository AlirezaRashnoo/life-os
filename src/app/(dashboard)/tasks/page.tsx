import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import TasksPageClient from "@/components/tasks/TasksPageClient";

export default async function TasksPage() {
  const user = await getCurrentUser();

  const tasks = await prisma.task.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <TasksPageClient tasks={tasks} />;
}
