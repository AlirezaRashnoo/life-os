export default function DashboardGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        grid
        grid-cols-12
        gap-6
      "
    >
      {children}
    </div>
  );
}
