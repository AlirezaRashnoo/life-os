import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AppShell from "@/components/layout/AppShell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <AppShell>
      <div className="mt-16">{children}</div>
    </AppShell>
  );
}
