// components/DayCell.jsx
import React from 'react';
import { useDrop } from 'react-dnd';
import { format, isSameDay, isSameMonth, isAfter } from 'date-fns';
import EventItem from './EventItem';

const DayCell = ({ date, events, currentMonth, onDateClick, onEventClick, onEventDrop }) => {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const dayOfWeek = date.getDay();
  const dayOfMonth = date.getDate();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item) => {
      const updatedEvent = { ...item, date: formattedDate };
      onEventDrop(updatedEvent);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const todayEvents = events.filter((event) => {
    if (event.date === formattedDate) return true;

    if (event.recurrence === 'Daily') {
      return isAfter(date, new Date(event.date)) || isSameDay(date, new Date(event.date));
    }

    if (event.recurrence === 'Weekly') {
      const original = new Date(event.date);
      return (
        dayOfWeek === original.getDay() &&
        (isAfter(date, original) || isSameDay(date, original))
      );
    }

    if (event.recurrence === 'Monthly') {
      const original = new Date(event.date);
      return (
        dayOfMonth === original.getDate() &&
        (isAfter(date, original) || isSameDay(date, original))
      );
    }

    return false;
  });

  return (
    <div
      ref={drop}
      key={formattedDate}
      onClick={() => onDateClick(formattedDate)}
      className={`border h-[6rem] p-2 cursor-pointer overflow-y-auto ${
        isSameMonth(date, currentMonth) ? 'bg-white' : 'bg-gray-100'
      } ${isSameDay(date, new Date()) ? 'border-blue-500' : ''} ${
        isOver ? 'bg-yellow-100' : ''
      }`}
    >
      <div
        className={`text-sm w-6 h-6 flex items-center justify-center rounded-full ${
          isSameDay(date, new Date()) ? 'bg-blue-500 text-white font-bold' : ''
        }`}
      >
        {format(date, 'd')}
      </div>

      {todayEvents.map((event) => (
        <EventItem
          key={`${event.id}-${formattedDate}`}
          event={event}
          onClick={(e) => {
            e.stopPropagation();
            onEventClick(event);
          }}
        />
      ))}
    </div>
  );
};

export default DayCell;
