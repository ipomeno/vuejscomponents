import { screen, render, fireEvent } from "@testing-library/vue";
import Calendar from "./calendar.vue";
import { DateTime } from "luxon";

describe('calendar', () => {
  function renderComponent(props) {
    return render(Calendar, { props });
  }

  it('should render the component', () => {
    const props = {
      startDate: '',
      endDate: '',
    };

    const { container } = renderComponent(props);
    expect(container.getElementsByClassName('calendar-container').length).toBe(1);
  });

  it('should render calendar start date and end date', () => {
    const props = {
      startDate: DateTime.now().set({day: 10, month: 1, year: 2025}).toISO(),
      endDate: DateTime.now().set({day: 15, month: 1, year: 2025}).toISO(),
    };

    renderComponent(props);
    const startDate = screen.getByText('10');
    const endDate = screen.getByText('15');
    const inRangeDate = screen.getByText('12');

    expect(startDate).toBeTruthy();
    expect(endDate).toBeTruthy();
    expect(startDate.classList.contains('day--selected')).toBeTruthy();
    expect(endDate.classList.contains('day--selected')).toBeTruthy();
    expect(inRangeDate.classList.contains('day--in-range')).toBeTruthy();
  });

  it.only('should select date range', async () => {
    const startDateTime = DateTime.now().set({day: 10, month: 1, year: 2025});
    const endDateTime = DateTime.now().set({day: 15, month: 1, year: 2025});

    const props = {
      startDate: null,
      endDate: null,
    };

    const { emitted } = renderComponent(props);
    const startDate = screen.getByText( startDateTime.toFormat('dd') );
    const endDate = screen.getByText( endDateTime.toFormat('dd') );

    await fireEvent.click(startDate);
    await fireEvent.click(endDate);

    const result = emitted();
    expect(result).toHaveProperty('select');
    expect(result.select[0]).toEqual([{ 
      startDate: startDateTime.toISODate(), 
      endDate: endDateTime.toISODate() 
    }]);
  });
});