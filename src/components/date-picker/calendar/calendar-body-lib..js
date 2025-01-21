import { DateTime } from 'luxon';

/**
 * Verifica se uma data está dentro do mês em outra data.
 * @param {string} date - Date in ISO 8601 format
 * @param {string} actualDate - Actual date in ISO 8601 format
 * @returns {boolean}
 */
export function isDateInMonth(date, actualDate) {
  return DateTime.fromISO(date).hasSame(DateTime.fromISO(actualDate), 'month');
}

/**
  * Verifica se uma data está entre duas datas.
  * @param {string} date - Date in ISO 8601 format
  * @param {string} startDate - Start date in ISO 8601 format
  * @param {string} endDate - End date in ISO 8601 format
  * @returns {boolean}
  */
export function isDateBetween(date, startDate, endDate) {
  if (!startDate || !endDate) {
    return false;
  }

  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);
  const current = DateTime.fromISO(date);

  return (current >= start && current <= end);
}

/**
 * Verifica se duas datas correspondem ao mesmo dia.
 * @param {string} date - Date in ISO 8601 format
 * @param {string} actualDate - Actual date in ISO 8601 format
 * @returns {boolean}
 */
export function isDateEqual(date, actualDate) {
  return DateTime.fromISO(date).hasSame(DateTime.fromISO(actualDate), 'day');
}

export function daysSplittedByWeeks(date) {
  const weeks = [];
  const days = listDaysOfMonth(date);

  while (days.length) {
    weeks.push(days.splice(0, 7));
  }

  if (weeks.length < 6) {
    const lastWeek = weeks[weeks.length - 1];
    const lastDay = lastWeek[lastWeek.length - 1];
    const week = [];
    for (let counter = 0; counter < 7; counter++) {
      const nextDay = DateTime.fromISO(lastDay).plus({ day: (counter + 1) }).toISODate();
      week.push(nextDay);
    }

    weeks.push(week.splice(0, 7));
  }

  return weeks;

  /**
   * 
   * @param {string} date - Date in ISO 8601 format
   * @returns {Array<string>}
   */
  function listDaysOfMonth(date) {
    let result = [];
    result = result.concat(listDaysOfPreviousMonth(date));
    result = result.concat(listDaysInMonth(date));
    result = result.concat(listDaysOfEndWeekday(date));
    return result;
  }

  /**
   * Retorna a quantidade de dias no mês de uma data.
   * @param {string} date - Date in ISO 8601 format
   * @returns {number}
   */
  function daysOfMonth(date) {
    return DateTime.fromISO(date).daysInMonth;
  }

  /**
   * Retorna o dia da semana do primeiro dia do mês.
   * @param {string} date - Date in ISO 8601 format
   * @returns {number} - Weekday of first day of month
   */
  function initialWeekday(date) {
    return DateTime.fromISO(date).startOf('month').weekday;
  }

  /**
   * Retorna os dias da semana anteriores ao primeiro dia do mês.
   * @param {number} initialWeekday - Weekday of first day of month
   * @returns {Array<string>}
   */
  function listDaysOfPreviousMonth(date) {
    const initWeekday = initialWeekday(date);
    const dateTime = DateTime.fromISO(date);
    const result = [];

    for (let day = 0; day < initWeekday; day++) {
      result.push(
        dateTime
          .set({ day: 1 })
          .minus({ days: initWeekday - day })
          .toISODate());
    }

    return result;
  }

  /**
   * Retorna a lista de todos os dias do mês.
   * @param {string} date - Date in ISO 8601 format
   * @returns {boolean}
   */
  function listDaysInMonth(date) {
    const dateTime = DateTime.fromISO(date);
    const daysInMonth = daysOfMonth(date);
    const result = [];

    for (let day = 1; day <= daysInMonth; day++) {
      result.push(
        dateTime
          .set({ day })
          .toISODate());
    }

    return result;
  }

  /**
   * Lista os dias da última semana do mês de uma data.
   * @param {string} date - Date in ISO 8601 format
   * @returns {Array<string>}
   */
  function listDaysOfEndWeekday(date) {
    const dateTime = DateTime.fromISO(date);
    const finalWeekdayOfMonth = endWeekdayOfMonth(date);
    const result = [];

    for (let day = 1; day <= 6 - finalWeekdayOfMonth; day++) {
      result.push(
        dateTime
          .endOf('month')
          .plus({ days: day })
          .toISODate());
    }

    return result;
  }

  function endWeekdayOfMonth(date) {
    return DateTime.fromISO(date).endOf('month').weekday;
  }
}