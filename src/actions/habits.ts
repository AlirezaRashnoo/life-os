"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";

export async function createHabit(data: {
  title: string;
  description?: string;
  color?: string;
  icon?: string;
}) {
  const user = await getCurrentUser();

  const habit = await prisma.habit.create({
    data: {
      title: data.title,
      description: data.description,
      color: data.color,
      icon: data.icon,
      userId: user.id,
    },
  });

  revalidatePath("/habits");

  return habit;
}

export async function updateHabit(
  id: string,
  data: {
    title: string;
    description?: string;
    color?: string;
    icon?: string;
  },
) {
  const user = await getCurrentUser();

  const habit = await prisma.habit.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  const updated = await prisma.habit.update({
    where: {
      id,
    },
    data,
  });

  revalidatePath("/habits");

  return updated;
}

export async function deleteHabit(id: string) {
  const user = await getCurrentUser();

  const habit = await prisma.habit.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  await prisma.habit.delete({
    where: {
      id,
    },
  });

  revalidatePath("/habits");

  return {
    success: true,
  };
}

export async function toggleHabitCompletion(habitId: string) {
  const user = await getCurrentUser();

  const habit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: user.id,
    },
  });

  if (!habit) {
    throw new Error("Habit not found");
  }

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const completion = await prisma.habitCompletion.findFirst({
    where: {
      habitId,
      date: today,
    },
  });

  if (completion) {
    await prisma.habitCompletion.delete({
      where: {
        id: completion.id,
      },
    });
  } else {
    await prisma.habitCompletion.create({
      data: {
        habitId,
        date: today,
      },
    });
  }

  revalidatePath("/habits");
}
