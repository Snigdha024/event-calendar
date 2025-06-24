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

 const renderDays = () => {
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));
  const days = [];

  let day = startDate;
  while (day <= endDate) {
    const date = new Date(day); // safe copy
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

// import React, { useState, useEffect } from 'react';
// import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, parseISO } from 'date-fns';
// import { v4 as uuid } from 'uuid';

// export default function Calendar() {
//   const [currentMonth, setCurrentMonth] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [events, setEvents] = useState(() => {
//     const data = localStorage.getItem('events');
//     return data ? JSON.parse(data) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
//   const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

//   const renderHeader = () => (
//     <div className="flex justify-between items-center p-4">
//       <button onClick={prevMonth}>&lt;</button>
//       <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
//       <button onClick={nextMonth}>&gt;</button>
//     </div>
//   );

//   const renderDays = () => {
//     const days = [];
//     const date = new Date();
//     const start = startOfWeek(date);
//     for (let i = 0; i < 7; i++) {
//       days.push(
//         <div key={i} className="text-center font-medium">
//           {format(addDays(start, i), 'EEE')}
//         </div>
//       );
//     }
//     return <div className="grid grid-cols-7">{days}</div>;
//   };

//   const openAddEvent = (day) => {
//     const title = prompt('Event Title');
//     if (title) {
//       setEvents([...events, {
//         id: uuid(),
//         title,
//         date: day.toISOString(),
//       }]);
//     }
//   };

//   const deleteEvent = (id) => {
//     if (confirm('Delete event?')) {
//       setEvents(events.filter(e => e.id !== id));
//     }
//   };

//   const renderCells = () => {
//     const monthStart = startOfMonth(currentMonth);
//     const monthEnd = endOfMonth(monthStart);
//     const startDate = startOfWeek(monthStart);
//     const endDate = endOfWeek(monthEnd);

//     const rows = [];
//     let days = [];
//     let day = startDate;
//     while (day <= endDate) {
//       for (let i = 0; i < 7; i++) {
//         const cloneDay = day;
//         const dayEvents = events.filter(event => isSameDay(parseISO(event.date), cloneDay));
//         days.push(
//           <div key={day} className={`border p-2 h-24 cursor-pointer ${!isSameMonth(day, monthStart) ? 'bg-gray-100' : ''}`} onClick={() => openAddEvent(cloneDay)}>
//             <div className={`text-sm ${isSameDay(day, new Date()) ? 'font-bold text-blue-600' : ''}`}>{format(day, 'd')}</div>
//             {dayEvents.map(event => (
//               <div key={event.id} className="text-xs mt-1 p-1 bg-blue-200 rounded flex justify-between items-center">
//                 <span>{event.title}</span>
//                 <button onClick={(e) => { e.stopPropagation(); deleteEvent(event.id); }} className="text-red-500 ml-1">&times;</button>
//               </div>
//             ))}
//           </div>
//         );
//         day = addDays(day, 1);
//       }
//       rows.push(<div key={day} className="grid grid-cols-7">{days}</div>);
//       days = [];
//     }
//     return <div>{rows}</div>;
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {renderHeader()}
//       {renderDays()}
//       {renderCells()}
//     </div>
//   );
// }
