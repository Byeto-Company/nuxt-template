export * from "./api-endpoints";
export * from "./assets";
export * from "./bus-events";
export * from "./provide-keys";
export * from "./state-keys";

export const PERSIAN_MONTHS = [
    "دی",
    "بهمن",
    "اسفند",
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
];

export const PERSIAN_WEEK_DAYS: Record<string, string> = {
    saturday: "شنبه",
    sunday: "یکشنبه",
    monday: "دوشنبه",
    tuesday: "سه‌شنبه",
    wednesday: "چهارشنبه",
    thursday: "پنج‌شنبه",
    friday: "جمعه",
};

export const PERSIAN_WEEK_DAYS_ALIAS: Record<string, string> = {
    saturday: "ش",
    sunday: "ی",
    monday: "د",
    tuesday: "س",
    wednesday: "چ",
    thursday: "پ",
    friday: "ج",
};
