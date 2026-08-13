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
  X,
} from "lucide-react";

import Link from "next/link";
import LogoutButton from "./LogoutButton";

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
    label: "کار ها",
    href: "/tasks",
    icon: ListChecks,
  },
  // {
  //   label: "دستیار هوشمند",
  //   href: "/ai-assistant",
  //   icon: Bot,
  // },
];

interface SidebarProps {
  mobile?: boolean;
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  mobile = false,
  open = false,
  onClose,
}: SidebarProps) {
  if (mobile) {
    return (
      <>
        {/* Overlay */}
        <div
          onClick={onClose}
          className={`
            fixed
            inset-0
            z-40
            bg-black/40
            backdrop-blur-[2px]
            transition-opacity
            duration-300
            md:hidden
            ${open ? "opacity-100" : "pointer-events-none opacity-0"}
          `}
        />

        {/* Mobile Drawer */}
        <aside
          dir="rtl"
          className={`
            fixed
            right-0
            top-0
            z-50
            h-dvh
            w-60            
            border-l
            border-border
            bg-card
            p-4
            shadow-xl
            transition-transform
            duration-300
            ease-in-out
            md:hidden
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <SidebarContent onNavigate={onClose} />
        </aside>
      </>
    );
  }

  return (
    <aside
      dir="rtl"
      className="
        fixed
        right-0
        top-0
        z-30
        hidden
        h-dvh
        w-60
        border-l
        border-border
        bg-card
        p-4
        md:flex
        md:flex-col
      "
    >
      <SidebarContent />
    </aside>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between px-3">
        <h1 className="text-lg font-semibold">HomeOS</h1>

        {onNavigate && (
          <button
            type="button"
            onClick={onNavigate}
            aria-label="بستن منو"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-md
              text-muted-foreground
              transition-colors
              hover:bg-accent
              hover:text-foreground
            "
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-md
                  px-3
                  py-2.5
                  text-base
                  text-muted-foreground
                  transition-colors
                  hover:bg-accent
                  hover:text-foreground
                "
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <LogoutButton />
        </div>

        {/* <div className="mt-auto">
          <LogoutButton />
        </div> */}
      </nav>
    </div>
  );
}
