import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert a date format to unix epoch format
// read more here: https://danawoodman.com/writing/sort-javascript-array-by-date-javascript-typescript
export function dateToUnixEpoch(date: Date): number {
  return Math.floor(date.getTime()) / 1000;
}
