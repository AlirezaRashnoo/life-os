import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import HabitsPageClient from "@/components/habits/HabitsPageClient";

export default async function HabitsPage() {
  const user = await getCurrentUser();

  const habits = await prisma.habit.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },

    include: {
      completions: true,
    },
  });

  return (
    <div className="space-y-6">
      <HabitsPageClient habits={habits} />
    </div>
  );
}
