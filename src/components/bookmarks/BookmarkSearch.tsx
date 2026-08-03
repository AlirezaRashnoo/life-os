"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function BookmarkSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        size={16}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-muted-foreground
        "
      />

      <Input
        placeholder="Search bookmarks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}
