import { daysSplittedByWeeks } from "./calendar-body-lib.";

describe('calendar-body-lib', () => {

  describe('daysSplittedByWeeks', () => {

    it('should be six weeks', () => {
      const date = '2025-01-01';
      const result = daysSplittedByWeeks(date);
      expect(result).toHaveProperty('length');
      expect(result.length).toBe(6);
    })

    it('should split days in weeks', () => {
      const date = '2024-12-01';
      const result = daysSplittedByWeeks(date);
      expect(result).toEqual([
        [
          "2024-11-24",
          "2024-11-25",
          "2024-11-26",
          "2024-11-27",
          "2024-11-28",
          "2024-11-29",
          "2024-11-30",
        ],
        [
          "2024-12-01",
          "2024-12-02",
          "2024-12-03",
          "2024-12-04",
          "2024-12-05",
          "2024-12-06",
          "2024-12-07",
        ],
        [
          "2024-12-08",
          "2024-12-09",
          "2024-12-10",
          "2024-12-11",
          "2024-12-12",
          "2024-12-13",
          "2024-12-14",
        ],
        [
          "2024-12-15",
          "2024-12-16",
          "2024-12-17",
          "2024-12-18",
          "2024-12-19",
          "2024-12-20",
          "2024-12-21",
        ],
        [
          "2024-12-22",
          "2024-12-23",
          "2024-12-24",
          "2024-12-25",
          "2024-12-26",
          "2024-12-27",
          "2024-12-28",
        ],
        [
          "2024-12-29",
          "2024-12-30",
          "2024-12-31",
          "2025-01-01",
          "2025-01-02",
          "2025-01-03",
          "2025-01-04",
        ]
      ]);
    });
  });

});