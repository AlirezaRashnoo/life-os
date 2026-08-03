"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";

export async function createBookmark(data: {
  title: string;
  url: string;
  description?: string;
}) {
  const user = await getCurrentUser();

  const bookmark = await prisma.bookmark.create({
    data: {
      title: data.title,
      url: data.url,
      description: data.description,
      userId: user.id,
    },
  });

  revalidatePath("/bookmarks");

  return bookmark;
}

export async function deleteBookmark(id: string) {
  const user = await getCurrentUser();

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!bookmark) {
    throw new Error("Bookmark not found");
  }

  await prisma.bookmark.delete({
    where: {
      id,
    },
  });

  revalidatePath("/bookmarks");

  return {
    success: true,
  };
}

export async function updateBookmark(
  id: string,
  data: {
    title: string;
    url: string;
    description: string;
  },
) {
  const user = await getCurrentUser();

  const bookmark = await prisma.bookmark.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!bookmark) {
    throw new Error("Unauthorized");
  }

  const updated = await prisma.bookmark.update({
    where: {
      id,
    },
    data: {
      title: data.title,
      url: data.url,
      description: data.description,
    },
  });

  revalidatePath("/bookmarks");

  return updated;
}
