import {
  format,
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
} from "date-fns-jalali";

import { faIR } from "date-fns-jalali/locale/fa-IR";

export const MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

export const WEEKDAYS = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export function persianNumber(value: string | number) {
  return String(value).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function formatJalali(date: Date) {
  return format(date, "d MMMM yyyy", {
    locale: faIR,
  });
}

export function monthTitle(date: Date) {
  return format(date, "MMMM yyyy", {
    locale: faIR,
  });
}

export function jalaliDateTime(date: Date) {
  return `${formatJalali(date)} - ${persianNumber(
    date.getHours(),
  )}:${persianNumber(date.getMinutes())}`;
}
