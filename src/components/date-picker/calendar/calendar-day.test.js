import { fireEvent, render, screen } from '@testing-library/vue';
import CalendarDay from './calendar-day.vue';
import { DateTime } from 'luxon';

describe('CalendarDay', () => {
  function renderComponent(props) {
    return render(CalendarDay, { props });
  }

  it('should render the component', () => {
    const date = DateTime.now();
    const props = {
      date: date.toISO(),
      selected: false,
      disabled: false,
      inRange: false,
    };

    renderComponent(props);

    const dateElement = screen.getByText(date.toFormat('dd'));
    expect(dateElement.classList.contains('day')).toBeTruthy();
  });

  it('should render the component with a selected date', () => {
    const date = DateTime.now();
    const props = {
      date: date.toISO(),
      selected: true,
      disabled: false,
      inRange: false,
    };

    renderComponent(props);
    const dateElement = screen.getByText(date.toFormat('dd'));
    expect(dateElement.classList.contains('day--selected')).toBeTruthy();
  });

  it('should render the component with a disabled date', () => { 
    const date = DateTime.now();
    const props = {
      date: date.toISO(),
      selected: false,
      disabled: true,
      inRange: false,
    };

    renderComponent(props);

    const dateElement = screen.getByText(date.toFormat('dd'));
    expect(dateElement.classList.contains('day--disabled')).toBeTruthy();
  });

  it('should render the component with a date in range', () => {
    const date = DateTime.now();
    const props = {
      date: date.toISO(),
      selected: false,
      disabled: false,
      inRange: true,
    };

    renderComponent(props);
    const dateElement = screen.getByText(date.toFormat('dd'));
    expect(dateElement.classList.contains('day--in-range')).toBeTruthy();
  });

  it('should emit an event when clicked', async () => {
    const date = DateTime.now();
    const props = {
      date: date.toISO(),
      selected: false,
      disabled: false,
      inRange: false,
    };

    const { emitted } = renderComponent(props);
    const dateElement = screen.getByText(date.toFormat('dd'));
    await fireEvent.click(dateElement);

    const result = emitted();
    expect(result).toHaveProperty('click');
    expect(result.click[0]).toEqual([date.toISO()]);
  });
});