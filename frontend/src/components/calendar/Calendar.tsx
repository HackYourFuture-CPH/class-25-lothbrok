import './Calendar.css';

import { Calendar as BigCalendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Task } from '../../types/Task';
import { ViewProps } from '../../types/ViewProps';

type PropsType = {
  tasks: Task;
};
const events = [
  {
    start: moment('2023-10-10').toDate(),
    end: moment('2023-10-15').toDate(),
    title: 'MRI Registration',
  },
  {
    start: moment('2023-10-18T14:00:00').toDate(),
    end: moment('2023-10-18T15:30:00').toDate(),
    title: 'ENT Appointment',
  },
];
const localizer = momentLocalizer(moment);

const Calendar = ({ tasks }: ViewProps) => {
  return (
    <div style={{ height: '95vh' }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  );
};

export default Calendar;
