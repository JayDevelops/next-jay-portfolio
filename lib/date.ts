import { parse, format } from "date-fns";
export function convertDateToString(date: string) {
  const displayDate = format(
    parse(date, "yyyy-MM-dd", new Date()),
    "MMMM d, yyyy"
  );
  return displayDate;
}
