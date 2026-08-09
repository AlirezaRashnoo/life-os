import { toJalaali, toGregorian } from "jalaali-js";

const IRAN_TIMEZONE = "Asia/Tehran";

// میلادی Date -> شمسی
export function dateToJalali(date: Date) {
  const { jy, jm, jd } = toJalaali(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );

  return `${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`;
}

// ساعت تهران
export function dateToTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: IRAN_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

// شمسی -> Date واقعی
export function jalaliToDate(jalali: string, time = "00:00") {
  const [jy, jm, jd] = jalali.split("/").map(Number);

  const { gy, gm, gd } = toGregorian(jy, jm, jd);

  const [hour, minute] = time.split(":").map(Number);

  return new Date(gy, gm - 1, gd, hour, minute);
}

// مقایسه روز شمسی
export function sameJalaliDay(a: Date, b: Date) {
  return dateToJalali(a) === dateToJalali(b);
}

// نمایش
export function jalaliDateTime(date: Date) {
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: IRAN_TIMEZONE,
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

export function formatTehranDateTime(date: Date) {
  return new Intl.DateTimeFormat("fa-IR", {
    timeZone: "Asia/Tehran",
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}
