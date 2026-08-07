"use client";

import {
  Home,
  NotebookText,
  Calendar,
  Bookmark,
  ListChecks,
  Settings,
  Bot,
  CircleCheck,
} from "lucide-react";

import Link from "next/link";

const navigation = [
  {
    label: "داشبورد",
    href: "/",
    icon: Home,
  },
  {
    label: "یادداشت‌ها",
    href: "/notes",
    icon: NotebookText,
  },
  {
    label: "تقویم",
    href: "/calendar",
    icon: Calendar,
  },
  {
    label: "نشانک‌ها",
    href: "/bookmarks",
    icon: Bookmark,
  },
  {
    label: "عادت‌ها",
    href: "/habits",
    icon: CircleCheck,
  },
  {
    label: "وظایف",
    href: "/tasks",
    icon: ListChecks,
  },
  {
    label: "دستیار هوشمند",
    href: "/ai-assistant",
    icon: Bot,
  },
  {
    label: "تنظیمات",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside
      dir="rtl"
      className="
      fixed
      right-0
      top-0
      h-screen
      w-60
      bg-sidebar
      border-l
      border-border
      p-4
      flex
      flex-col
      "
    >
      <h1
        className="
        text-lg
        font-semibold
        mb-8
        px-3
        "
      >
        HomeOS
      </h1>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
              flex
              items-center
              gap-3
              px-3
              py-2
              rounded-md
              text-muted-foreground
              hover:bg-accent
              hover:text-foreground
              "
            >
              <Icon size={18} />

              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
