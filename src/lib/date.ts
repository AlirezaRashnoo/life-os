export function formatTaskDate(date: Date) {
  return new Intl.DateTimeFormat("fa-IR", {
    month: "short",
    day: "numeric",
  }).format(date);
}

export const USER_TIMEZONE = "Asia/Tehran";
