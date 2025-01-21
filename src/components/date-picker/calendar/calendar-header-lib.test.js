import { DateTime } from "luxon";
import { formatTitle } from "./calendar-header-lib";

describe('calendar-header-lib', () => {

  describe('formatTitle', () => {

    it('Should format a date in the name of the month/year', () => {
      const date = DateTime.now().set({ day: 1, month: 3, year: 2025 });
      const result = formatTitle(date);
      expect(result).toEqual('março/2025');
    });

    it.each([null, undefined, '', '01/01/2025'])('Should throw error if date is \'%s\'.', (value) => {
      expect(() => { formatTitle(value); }).toThrow(`Data ${value} deve estar no formato ISO 8601`);
    })

  });

});