import { DateTime } from "luxon";

/**
 * 
 * @param {string} date - Date in ISO format 8601
 * @param {string} format 
 */
export function formatDay(date) {
  return DateTime.fromISO(date).toFormat('dd');
}