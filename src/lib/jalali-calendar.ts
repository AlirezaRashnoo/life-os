import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns-jalali";

export function getMonthDays(date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  return eachDayOfInterval({
    start,
    end,
  });
}
