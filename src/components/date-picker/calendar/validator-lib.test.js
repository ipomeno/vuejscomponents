import { createDateTimeIsoValidator } from "./validator-lib";

describe('dateTimeIsoValidator', () => {
  it.each([null, undefined, '', 0])('Should throw an error if date is \'%s\'', (date) => {
    console.log(date);
    const dateTimeIsoValidator = createDateTimeIsoValidator('date', true);
    expect(() => { dateTimeIsoValidator(date); }).toThrow('Propriedade date é obrigatória');
  });

  it.each(['01/01/2025', '0'])('Should throw an error if date is \'%s\' is not ISO date format', () => {
    const date = '01/01/2025';
    const dateTimeIsoValidator = createDateTimeIsoValidator('date', true);
    expect(() => { dateTimeIsoValidator(date); }).toThrow('Propriedade date precisa ser uma data no formato ISO 8601');
  });

  it('should return true if the date is in ISO format', () => {
    const date = DateTime.now().toISO();
    const dateTimeIsoValidator = createDateTimeIsoValidator('date');
    expect(dateTimeIsoValidator(date)).toBeTruthy();
  });
});