import { DateTime } from "luxon";
import { createDateTimeIsoValidator, formatDay } from "./calendar-day-lib";

describe('calendar-day-lib', () => {
  describe('formatDay', () => {
    it('should return the day of the month', () => {
      const date = DateTime.now().toISO();
      const expected = DateTime.fromISO(date).toFormat('dd');
      const result = formatDay(date);
      expect(result).toBe(expected);
    });
  })
});