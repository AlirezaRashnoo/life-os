"use client";

import { useState } from "react";
import BookmarkCard from "./BookmarkCard";
import BookmarkSearch from "./BookmarkSearch";
import { Bookmark } from "@prisma/client";

export default function BookmarkGrid({ bookmarks }: { bookmarks: Bookmark[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    const query = search.toLowerCase();

    return (
      bookmark.title.toLowerCase().includes(query) ||
      bookmark.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <BookmarkSearch value={search} onChange={setSearch} />
        {/* <BookmarkFilter active={category} onChange={setCategory} /> */}
        <h2 className="text-h2">All Bookmarks</h2>
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
        "
      >
        {filteredBookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}
