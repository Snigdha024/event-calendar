import { useDrag } from 'react-dnd';

const EventItem = ({ event, onClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id, originalDate: event.date },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
  <div
  ref={drag}
  onClick={onClick}
  className={`text-xs px-2 py-1 mt-1 rounded cursor-pointer transition-colors duration-150
    ${isDragging ? 'opacity-50' : ''}
    bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700`}
>
  {event.title}
</div>
  );
};

export default EventItem;
