import { DateTime } from "luxon";

export function createNewDateTimeISO() {
  return DateTime.now().toISO();
}

export function plusMonth(date, month) {
  return DateTime.fromISO(date).plus({ months: month }).toISODate();
}

export function subMonth(date, month) {
  return DateTime.fromISO(date).minus({ months: month }).toISODate();
}