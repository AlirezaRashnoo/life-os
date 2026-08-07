// "use server";

// import { prisma } from "@/lib/prisma";
// import { getCurrentUser } from "@/lib/current-user";
// import { revalidatePath } from "next/cache";

// export async function createTask(data: {
//   title: string;
//   description?: string;
//   dueDate?: Date;
// }) {
//   const user = await getCurrentUser();

//   const task = await prisma.task.create({
//     data: {
//       title: data.title,
//       description: data.description,
//       dueDate: data.dueDate,
//       userId: user.id,
//     },
//   });

//   revalidatePath("/tasks");

//   return task;
// }

// export async function toggleTask(id: string) {
//   const user = await getCurrentUser();

//   const task = await prisma.task.findFirst({
//     where: {
//       id,
//       userId: user.id,
//     },
//   });

//   if (!task) {
//     throw new Error("Task not found");
//   }

//   const updated = await prisma.task.update({
//     where: {
//       id,
//     },
//     data: {
//       completed: !task.completed,
//     },
//   });

//   revalidatePath("/tasks");

//   return updated;
// }

// export async function deleteTask(id: string) {
//   const user = await getCurrentUser();

//   const task = await prisma.task.findFirst({
//     where: {
//       id,
//       userId: user.id,
//     },
//   });

//   if (!task) {
//     throw new Error("Task not found");
//   }

//   await prisma.task.delete({
//     where: {
//       id,
//     },
//   });

//   revalidatePath("/tasks");

//   return {
//     success: true,
//   };
// }

// export async function updateTask(
//   id: string,
//   data: {
//     title: string;
//     description?: string;
//   },
// ) {
//   const user = await getCurrentUser();

//   const task = await prisma.task.findFirst({
//     where: {
//       id,
//       userId: user.id,
//     },
//   });

//   if (!task) {
//     throw new Error("Task not found");
//   }

//   const updated = await prisma.task.update({
//     where: {
//       id,
//     },
//     data: {
//       title: data.title,
//       description: data.description,
//     },
//   });

//   revalidatePath("/tasks");

//   return updated;
// }

"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";
import { TaskPriority } from "@prisma/client";

export async function createTask(data: {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: TaskPriority;
}) {
  const user = await getCurrentUser();

  const task = await prisma.task.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      userId: user.id,
    },
  });

  revalidatePath("/tasks");

  return task;
}

export async function updateTask(
  id: string,
  data: {
    title: string;
    description?: string;
    priority?: TaskPriority;
  },
) {
  const user = await getCurrentUser();

  const task = await prisma.task.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const updated = await prisma.task.update({
    where: {
      id,
    },

    data: {
      title: data.title,
      description: data.description,
      priority: data.priority,
    },
  });

  revalidatePath("/tasks");

  return updated;
}

export async function toggleTask(id: string) {
  const user = await getCurrentUser();

  const task = await prisma.task.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  const updated = await prisma.task.update({
    where: {
      id,
    },

    data: {
      completed: !task.completed,
    },
  });

  revalidatePath("/tasks");

  return updated;
}

export async function deleteTask(id: string) {
  const user = await getCurrentUser();

  const task = await prisma.task.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  await prisma.task.delete({
    where: {
      id,
    },
  });

  revalidatePath("/tasks");
}
