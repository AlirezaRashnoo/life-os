import { logoutUser } from "@/actions/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <form action={logoutUser}>
      <button
        type="submit"
        className="flex h-9 w-full items-center gap-2 rounded-md px-3 text-sm font-medium text-destructive cursor-pointer"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>خروج</span>
      </button>
    </form>
  );
}
