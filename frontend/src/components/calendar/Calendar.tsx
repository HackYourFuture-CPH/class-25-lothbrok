import React from 'react';
import './Calendar.css';
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  Month,
  Agenda,
  EventSettingsModel,
} from '@syncfusion/ej2-react-schedule';

const Calendar = () => {
  return (
    <ScheduleComponent currentView='Month' className='calendar'>
      <Inject services={[Day, Week, Month, Agenda]} />
    </ScheduleComponent>
  );
};

export default Calendar;
