import { render, screen } from "@testing-library/vue";
import CalendarBody from "./calendar-body.vue";
import { DateTime } from "luxon";

describe('calendar-body', () => {

  function renderComponent(props) {
    return render(CalendarBody, { props });
  }

  it('should render componentshould render the component', () => {
    const props = { date: DateTime.now().set({ day: 1, month: 1, year: 2025 }).toISO() };
    renderComponent(props);

    const daysHeader = screen.getByRole('calendar-days-header');
    expect(daysHeader.textContent).toEqual('DomSegTerQuaQuiSexSáb');
    screen.debug();
  });
});