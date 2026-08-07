// "use client";

// import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import { Search, Bell, Sun, Moon } from "lucide-react";

// interface TopNavProps {
//   userName?: string;
//   userInitial?: string;
// }

// export default function TopNav({
//   userName = "Alireza",
//   userInitial = "A",
// }: TopNavProps) {
//   const { resolvedTheme, setTheme } = useTheme();
//   const [today, setToday] = useState("");

//   useEffect(() => {
//     setToday(
//       new Date().toLocaleDateString("en-US", {
//         weekday: "long",
//         month: "long",
//         day: "numeric",
//       }),
//     );
//   }, []);

//   const toggleTheme = () => {
//     setTheme(resolvedTheme === "dark" ? "light" : "dark");
//   };

//   return (
//     <header
//       className="
//         fixed right-60 left-0 top-0 h-18 z-40
//         border-b border-border-subtle
//         bg-bg-canvas
//         flex items-center justify-between
//         px-6
//       "
//     >
//       {/* Left — Dashboard variant: minimal, just current date (no breadcrumb, root page) */}
//       <div className="flex items-center">
//         <span className="text-body text-text-tertiary">{today}</span>
//       </div>

//       {/* Right — Command palette trigger, notifications, theme toggle, avatar */}
//       <div className="flex items-center gap-2">
//         {/* Command Palette trigger — pill-shaped, the one intentional radius exception */}
//         <button
//           className="
//             flex items-center gap-2
//             h-9 px-3
//             rounded-full
//             border border-border-subtle
//             bg-bg-inset
//             text-text-tertiary
//             hover:border-border-strong hover:text-text-secondary
//             transition-colors duration-150 ease-out
//           "
//         >
//           <Search size={14} strokeWidth={2} />
//           <span className="text-body-sm">Search or jump to…</span>
//           <span
//             className="
//               ml-2 flex items-center gap-0.5
//               px-1.5 py-0.5
//               rounded-sm
//               border border-border-subtle
//               bg-surface-1
//               font-mono text-caption text-text-tertiary
//             "
//           >
//             ⌘K
//           </span>
//         </button>

//         {/* Notifications — ghost icon button, square */}
//         <button
//           aria-label="Notifications"
//           className="
//             h-9 w-9
//             flex items-center justify-center
//             rounded-md
//             text-text-secondary
//             hover:bg-surface-hover hover:text-text-primary
//             transition-colors duration-150 ease-out
//           "
//         >
//           <Bell size={18} strokeWidth={2} />
//         </button>

//         {/* Theme toggle — ghost icon button, square */}
//         <button
//           aria-label="Toggle theme"
//           onClick={toggleTheme}
//           className="
//             h-9 w-9
//             flex items-center justify-center
//             rounded-md
//             text-text-secondary
//             hover:bg-surface-hover hover:text-text-primary
//             transition-colors duration-150 ease-out
//           "
//         >
//           {resolvedTheme === "dark" ? (
//             <Sun size={18} strokeWidth={2} />
//           ) : (
//             <Moon size={18} strokeWidth={2} />
//           )}
//         </button>

//         {/* Divider */}
//         <div className="h-5 w-px bg-border-subtle mx-1" />

//         {/* Avatar */}
//         <button
//           aria-label={`${userName} account menu`}
//           className="
//             h-8 w-8
//             rounded-full
//             bg-primary-500
//             flex items-center justify-center
//             text-caption font-medium text-text-inverse
//             hover:opacity-90
//             transition-opacity duration-150 ease-out
//           "
//         >
//           {userInitial}
//         </button>
//       </div>
//     </header>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Search, Bell, Sun, Moon } from "lucide-react";
import { Button } from "../ui/button";

interface TopNavProps {
  userName?: string;
  userInitial?: string;
}

export default function TopNav({
  userName = "علیرضا",
  userInitial = "ع",
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
        right-60
        left-0
        h-18
        flex
        items-center
        justify-between
        px-6
        border-b
        border-border
        bg-background
        z-20
      "
    >
      <div className="text-sm text-muted-foreground">{today}</div>

      <div className="flex items-center gap-2">
        <button
          className="
            flex
            items-center
            gap-2
            h-9
            px-3
            rounded-full
            border
            border-border
            bg-muted
            text-muted-foreground
            hover:text-foreground
            transition-colors
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
        </button>

        <button className="h-9 w-9 rounded-md">
          <Bell size={18} />
        </button>

        <button
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="
            h-9
            w-9
            rounded-md
          "
        >
          {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="h-5 w-px bg-border mx-1" />

        <button
          className="
            h-8
            w-8
            rounded-full
            bg-primary
            text-primary-foreground
            text-xs
            font-medium
          "
        >
          {userInitial}
        </button>
      </div>
    </header>
  );
}
