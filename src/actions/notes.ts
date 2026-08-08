"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";

export async function createNote(data: { title: string; content: string }) {
  const user = await getCurrentUser();

  const note = await prisma.note.create({
    data: {
      title: data.title,
      content: data.content,
      userId: user.id,
    },
  });

  revalidatePath("/notes");

  return note;
}

export async function deleteNote(noteId: string) {
  const user = await getCurrentUser();

  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId: user.id,
    },
  });

  if (!note) {
    throw new Error("Note not found");
  }

  await prisma.note.delete({
    where: {
      id: note.id,
    },
  });

  revalidatePath("/notes");

  return {
    success: true,
  };
}

export async function updateNote(
  id: string,
  data: {
    title: string;
    content: string;
  },
) {
  const user = await getCurrentUser();

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });

  if (!note || note.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  revalidatePath("/notes");

  return prisma.note.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      content: data.content,
    },
  });
}
