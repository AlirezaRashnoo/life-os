"use client";

import { useState } from "react";
import BookmarkCard from "./BookmarkCard";
import BookmarkSearch from "./BookmarkSearch";
import { Bookmark } from "@prisma/client";

export default function BookmarkGrid({ bookmarks }: { bookmarks: Bookmark[] }) {
  const [search, setSearch] = useState("");

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const query = search.toLowerCase();
    return (
      bookmark.title.toLowerCase().includes(query) ||
      bookmark.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:w-72">
          <BookmarkSearch value={search} onChange={setSearch} />
        </div>

        <p className="text-body-sm text-text-tertiary">
          {filteredBookmarks.length}{" "}
          {filteredBookmarks.length === 1 ? "نشانک" : "نشانک ها"}
          {search && ` for "${search}"`}
        </p>
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="rounded-md border border-dashed border-border-default py-16 text-center">
          <p className="text-body text-text-primary font-medium">No matches</p>
          <p className="text-body-sm text-text-tertiary mt-1">
            Try a different search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.id} bookmark={bookmark} />
          ))}
        </div>
      )}
    </div>
  );
}
