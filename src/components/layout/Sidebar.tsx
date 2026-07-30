import { Home, Notebook, Calendar, Bookmark, Settings } from "lucide-react";

const navigation = [
  {
    label: "Dashboard",
    icon: Home,
  },
  {
    label: "Notes",
    icon: Notebook,
  },
  {
    label: "Calendar",
    icon: Calendar,
  },
  {
    label: "Bookmarks",
    icon: Bookmark,
  },
];

export default function Sidebar() {
  return (
    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-60
        border-r
        border-border
        bg-sidebar
        px-4
        py-6
      "
    >
      <div className="mb-8">
        <h1 className="text-lg font-semibold">HomeOS</h1>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className="
                flex
                w-full
                items-center
                gap-3
                rounded-md
                px-3
                py-2
                text-sm
                text-muted-foreground
                hover:bg-accent
                hover:text-foreground
              "
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-md
            px-3
            py-2
            text-sm
            text-muted-foreground
            hover:bg-accent
          "
        >
          <Settings size={18} />
          Settings
        </button>
      </div>
    </aside>
  );
}
