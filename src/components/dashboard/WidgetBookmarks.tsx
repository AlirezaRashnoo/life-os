import Link from "next/link";
import { ArrowLeft, BookmarkCheck, ExternalLink } from "lucide-react";
import { Bookmark } from "@prisma/client";

import WidgetContainer from "./WidgetContainer";

export default function WidgetBookmarks({
  bookmarks,
}: {
  bookmarks: Bookmark[];
}) {
  const recentBookmarks = bookmarks.slice(0, 4);

  return (
    <WidgetContainer
      title="بوکمارک‌ها"
      icon={<BookmarkCheck />}
      accent="primary"
    >
      <div className="flex flex-1 flex-col">
        {recentBookmarks.length === 0 ? (
          <p className="flex-1 text-sm text-muted-foreground">
            هنوز بوکمارکی اضافه نکرده‌ای.
          </p>
        ) : (
          <div className="flex-1 space-y-1">
            {recentBookmarks.map((bookmark) => (
              <Link
                key={bookmark.id}
                href={
                  bookmark.url.startsWith("http")
                    ? bookmark.url
                    : `https://${bookmark.url}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-md p-2 transition hover:bg-accent"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {bookmark.title}
                  </p>
                  <p className="truncate text-caption text-muted-foreground">
                    {bookmark.url}
                  </p>
                </div>
                <ExternalLink
                  size={14}
                  className="shrink-0 text-muted-foreground opacity-0 transition group-hover:opacity-100"
                />
              </Link>
            ))}
          </div>
        )}

        <Link
          href="/bookmarks"
          className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline"
        >
          مشاهده همه
          <ArrowLeft size={14} />
        </Link>
      </div>
    </WidgetContainer>
  );
}
