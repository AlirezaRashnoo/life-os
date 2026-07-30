export default function TopNav() {
  return (
    <header
      className="
        fixed
        left-60
        right-0
        top-0
        h-14
        border-b
        border-border
        bg-background
        flex
        items-center
        justify-between
        px-6
      "
    >
      <div className="text-sm text-muted-foreground">Dashboard</div>

      <button
        className="
          text-sm
          text-muted-foreground
          hover:text-foreground
        "
      >
        ⌘ K
      </button>
    </header>
  );
}
