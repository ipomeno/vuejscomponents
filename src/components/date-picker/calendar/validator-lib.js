import { DateTime } from 'luxon';

/**
 * 
 * @callback dateTimeISOValidator
 * @param {string} date - Date in ISO format
 * @returns {boolean} - If the date is in ISO format
 * @throws {Error} - If the date is not in ISO format
 * @throws {Error} - If the property is required and the value is not present
 */

/*
 * 
 * @param {string} propValue - Date in ISO format
 * @param {string} propName - Name of the property
 * @param {boolean} required - If the property is required
 * @returns {dateTimeISOValidator} - A function that validates if the date is in ISO format
 */
export function createDateTimeIsoValidator(propName, required = false) {
  return function dateTimeISOValidator(date) {
    if (required && !date) {
      throw new Error(`Propriedade ${propName} é obrigatória`);
    }

    if (!date) {
      return true;
    }

    const dateTime = DateTime.fromISO(date);
    if (!dateTime.isValid) {
      throw new Error(`Propriedade ${propName} precisa ser uma data no formato ISO 8601`);
    };

    return true;
  }
}