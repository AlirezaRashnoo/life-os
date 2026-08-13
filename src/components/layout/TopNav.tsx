"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Search, Bell, Sun, Moon, Menu } from "lucide-react";

interface TopNavProps {
  userName?: string;
  userInitial?: string;
  onMenuClick?: () => void;
}

export default function TopNav({
  userName = "علیرضا",
  userInitial = "ع",
  onMenuClick,
}: TopNavProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("fa-IR", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  return (
    <header
      dir="rtl"
      className="
        fixed
        top-0
        right-0
        left-0
        z-20
        flex
        h-16
        items-center
        justify-between
        border-b
        border-border
        bg-background/95
        px-4
        backdrop-blur
        sm:px-6
        md:right-60
      "
    >
      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="باز کردن منو"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            transition-colors
            hover:bg-accent
            md:hidden
          "
        >
          <Menu size={20} />
        </button>

        {/* Date */}
        <div className="text-sm text-muted-foreground">{today}</div>
      </div>

      {/* Left side */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search */}
        {/* <button
          type="button"
          className="
            hidden
            h-9
            items-center
            gap-2
            rounded-full
            border
            border-border
            bg-muted
            px-3
            text-muted-foreground
            transition-colors
            hover:text-foreground
            sm:flex
          "
        >
          <Search size={14} />

          <span className="text-xs">جستجو یا رفتن به...</span>

          <span
            className="
              rounded-sm
              border
              px-1.5
              py-0.5
              font-mono
              text-[11px]
            "
          >
            ⌘K
          </span>
        </button> */}

        {/* Mobile Search */}
        <button
          type="button"
          aria-label="جستجو"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            transition-colors
            hover:bg-accent
            sm:hidden
          "
        >
          <Search size={18} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="اعلان‌ها"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            transition-colors
            hover:bg-accent
          "
        >
          <Bell size={18} />
        </button>

        {/* Theme */}
        <button
          type="button"
          aria-label="تغییر تم"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-md
            transition-colors
            hover:bg-accent
          "
        >
          {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Separator */}
        <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

        {/* User */}
        <button
          type="button"
          aria-label={`حساب کاربری ${userName}`}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-primary
            text-xs
            font-medium
            text-primary-foreground
          "
        >
          {userInitial}
        </button>
      </div>
    </header>
  );
}
