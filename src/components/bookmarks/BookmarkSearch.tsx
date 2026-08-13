"use client";

import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

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
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
      />

      <Input
        placeholder="جستجو نشانک ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-8 text-body"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="
            absolute right-2.5 top-1/2 -translate-y-1/2
            text-text-tertiary hover:text-text-primary
            transition-colors duration-150
          "
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
