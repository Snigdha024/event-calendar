import React from 'react';

import {
  startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, subMonths, format
} from 'date-fns';
import DayCell from './DayCell';


const Calendar = ({ events, onDateClick, onEventClick, onEventDrop }) => {

  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-6 px-4">
  <button
    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
    className="text-xl px-3 py-1 rounded hover:bg-gray-200"
  >
    &lt;
  </button>
  <h2 className="text-2xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
  <button
    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
    className="text-xl px-3 py-1 rounded hover:bg-gray-200"
  >
    &gt;
  </button>
</div>

  );

//To render days
 const renderDays = () => {
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const days = [];

  let day = startDate;
  while (day <= endDate) {
    const date = new Date(day); 
    days.push(
      <DayCell
        key={format(date, 'yyyy-MM-dd')}
        date={date}
        events={events}
        currentMonth={currentMonth}
        onDateClick={onDateClick}
        onEventClick={onEventClick}
        onEventDrop={onEventDrop}
      />
    );
    day = addDays(day, 1);
  }

  return (
  <div className="grid grid-cols-7 gap-1 min-h-[36rem]"> 
    {days}
  </div>
);

};


  return (
    <div>
      {renderHeader()}
      {renderDays()}
    </div>
  );
};

export default Calendar;

