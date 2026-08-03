import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import NewBookmarkDialog from "@/components/bookmarks/NewBookmarkDialog";
import BookmarkGrid from "@/components/bookmarks/BookmarkGrid";
import EmptyState from "@/components/ui/EmptyState";

export default async function BookmarksPage() {
  const user = await getCurrentUser();

  const bookmarks = await prisma.bookmark.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h1 text-text-primary">Bookmarks</h1>

          <p className="text-body text-text-secondary mt-1">
            Save and organize useful resources.
          </p>
        </div>

        <NewBookmarkDialog />
      </div>

      {bookmarks.length === 0 ? (
        <EmptyState
          title="No bookmarks yet"
          description="Create your first bookmark and stay focused."
          action={<NewBookmarkDialog />}
        />
      ) : (
        <BookmarkGrid bookmarks={bookmarks} />
      )}
    </div>
  );
}
