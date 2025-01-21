import { DateTime } from "luxon";
import { fireEvent, render, screen } from "@testing-library/vue";
import CalendarHeader from "./calendar-header.vue";

describe('calendar-header.vue', () => {
  function renderComponent(props) {
    return render(CalendarHeader, { props });
  }

  it('should render the component', () => {
    const props = { date: DateTime.now().set({ day: 1, month: 1, year: 2025 }).toISO() };
    renderComponent(props);

    const headerElement = screen.getByRole('calendar-header-text');
    expect(headerElement.textContent).toContain('janeiro/2025');
  });

  it('Should emit the event moveNextMonth when click in the button', async () => {
    const props = { date: DateTime.now().set({ day: 1, month: 1, year: 2025 }).toISO() };
    const { emitted } = renderComponent(props);

    const button = screen.getByRole('btn-next-month');
    await fireEvent.click(button);

    const result = emitted();
    expect(result).toHaveProperty('moveNextMonth');
  });

  it('Should emit the event movePreviousMonth when click in the button', async () => {
    const props = { date: DateTime.now().set({ day: 1, month: 1, year: 2025 }).toISO() };
    const { emitted } = renderComponent(props);

    const button = screen.getByRole('btn-previous-month');
    await fireEvent.click(button);

    const result = emitted();
    expect(result).toHaveProperty('movePreviousMonth');
  });

});