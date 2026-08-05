import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";

import NotesPageClient from "@/components/notes/NotesPageClient";

export default async function NotesPage() {
  const user = await getCurrentUser();

  const notes = await prisma.note.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return <NotesPageClient notes={notes} />;
}
