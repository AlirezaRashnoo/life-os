// components/tasks/TaskSearch.tsx
"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

export default function TaskSearch({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search
        size={15}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
      />

      <Input
        placeholder="جستجو کار ..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 pr-8 text-body max-w-md"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors duration-150"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
