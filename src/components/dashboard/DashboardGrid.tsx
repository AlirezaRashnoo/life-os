export default function DashboardGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-stretch gap-6">
      {children}
    </div>
  );
}
