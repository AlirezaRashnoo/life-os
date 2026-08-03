import { ExternalLink } from "lucide-react";
import { Bookmark } from "@prisma/client";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import EditBookmarkDialog from "./EditBookmarkDialog";
import Link from "next/link";

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  return (
    <div
      className="
      border
      border-border
      rounded-lg
      p-4
      bg-card
      hover:bg-accent
      transition
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-h3">{bookmark.title}</h3>

          <p
            className="
          text-sm 
          text-muted-foreground
          mt-2
          line-clamp-2
          "
          >
            {bookmark.description}
          </p>
        </div>
        <div className="flex items-center gap-x-3">
          <EditBookmarkDialog bookmark={bookmark} />
          <DeleteBookmarkButton id={bookmark.id} />
        </div>
      </div>

      <p
        className="
        text-xs
        text-muted-foreground
        mt-4
        truncate
        "
      >
        <Link
          href={
            bookmark.url.startsWith("http")
              ? bookmark.url
              : `https://${bookmark.url}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between"
        >
          {bookmark.url}
          <ExternalLink size={16} className="text-muted-foreground" />
        </Link>
      </p>
    </div>
  );
}
