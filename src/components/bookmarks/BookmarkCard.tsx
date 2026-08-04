import { ExternalLink } from "lucide-react";
import { Bookmark } from "@prisma/client";
import DeleteBookmarkButton from "./DeleteBookmarkButton";
import EditBookmarkDialog from "./EditBookmarkDialog";
import Link from "next/link";

function getDomain(url: string) {
  try {
    const withProtocol = url.startsWith("http") ? url : `https://${url}`;
    return new URL(withProtocol).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const domain = getDomain(bookmark.url);
  const href = bookmark.url.startsWith("http")
    ? bookmark.url
    : `https://${bookmark.url}`;

  return (
    <div
      className="
      group
      border
      border-border
      rounded-lg
      p-4
      bg-card
      hover:bg-accent
      transition
      hover:bg-surface-hover
      "
    >
      <div className="flex items-start gap-3">
        <img
          src={`https://www.google.com/s2/favicons?sz=64&domain=${domain}`}
          alt=""
          width={28}
          height={28}
          className="mt-0.5 h-7 w-7 shrink-0 rounded-sm border border-border-subtle bg-surface-2"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="text-h3 text-text-primary truncate"
              title={bookmark.title}
            >
              {bookmark.title}
            </h3>

            <div
              className="
              flex shrink-0 items-center gap-0.5
              opacity-0 transition-opacity duration-150
              group-hover:opacity-100
              focus-within:opacity-100
              "
            >
              <EditBookmarkDialog bookmark={bookmark} />
              <DeleteBookmarkButton id={bookmark.id} />
            </div>
          </div>

          {bookmark.description && (
            <p className="text-body-sm text-text-secondary mt-1 line-clamp-2">
              {bookmark.description}
            </p>
          )}
        </div>
      </div>

      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="
        mt-3 flex items-center gap-1.5
        font-mono text-caption text-text-tertiary
        hover:text-text-secondary
        transition-colors duration-150
        truncate
        "
      >
        <span className="truncate">{domain}</span>
        <ExternalLink size={11} className="shrink-0" />
      </Link>
    </div>
  );
}
