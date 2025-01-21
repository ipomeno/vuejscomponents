import { DateTime } from "luxon";

/**
 * Verifica se uma data é válida.
 * @param {string} date - Date in ISO format 8601
 * @returns {boolean}
 */
function isDateTimeValid(date) {
  return DateTime.fromISO(date).isValid;
}

/**
 * Formata o nome do mês e o ano de uma data para nome_do_mes/ano.
 * @param {string} date - Date in ISO format 8601
 * @returns {string} - Day of the month
 */
export function formatTitle(date) {
  if (!isDateTimeValid(date)) {
    throw new Error(`Data ${date} deve estar no formato ISO 8601`);
  }

  const dateTime = DateTime.fromISO(date);
  const monthName = dateTime.monthLong;
  const year = dateTime.year;

  return `${monthName}/${year}`;
}