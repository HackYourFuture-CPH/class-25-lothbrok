import './Calendar.css';

import { Calendar as BigCalendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Task } from '../../types/Task';
type CalendarPropsType = {
  tasks: Task[];
};

const localizer = momentLocalizer(moment);

const components = {
  event: (props: any) => {
    console.log(props);
    return null;
  },
};

const Calendar = ({ tasks }: CalendarPropsType) => {
  return (
    <div style={{ height: '95vh' }}>
      <BigCalendar
        localizer={localizer}
        events={tasks}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
        // components={components}
      />
    </div>
  );
};

export default Calendar;
