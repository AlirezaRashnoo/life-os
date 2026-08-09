"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";

export async function createEvent(data: {
  title: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
}) {
  const user = await getCurrentUser();

  const event = await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
      userId: user.id,
    },
  });

  revalidatePath("/calendar");

  return event;
}

export async function updateEvent(
  id: string,
  data: {
    title: string;
    description?: string;
    startTime: Date;
    endTime?: Date;
  },
) {
  const user = await getCurrentUser();

  const event = await prisma.event.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  const updated = await prisma.event.update({
    where: {
      id,
    },

    data: {
      title: data.title,
      description: data.description,
      startTime: data.startTime,
      endTime: data.endTime,
    },
  });

  revalidatePath("/calendar");

  return updated;
}

export async function deleteEvent(id: string) {
  const user = await getCurrentUser();

  const event = await prisma.event.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  await prisma.event.delete({
    where: {
      id: event.id,
    },
  });

  revalidatePath("/calendar");

  return {
    success: true,
  };
}
