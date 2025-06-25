import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const recurrenceOptions = ['None', 'Daily', 'Weekly', 'Monthly'];
const EventForm = ({ date, existingEvent, onSave, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [recurrence, setRecurrence] = useState('None');
  console.log("Editing event:", existingEvent);


  useEffect(() => {
    if (existingEvent) {
      setTitle(existingEvent.title);
      setDescription(existingEvent.description);
      setTime(existingEvent.time);
      setRecurrence(existingEvent.recurrence || 'None');
    } else {
      setTitle('');
      setDescription('');
      setTime('');
      setRecurrence('None');
    }
  }, [existingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const eventData = {
      id: existingEvent?.id || uuid(),  
      title,
      description,
      date,
      time,
      recurrence,
    };
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border p-2"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="w-full border p-2"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <textarea
        className="w-full border p-2"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full border p-2"
        value={recurrence}
        onChange={(e) => setRecurrence(e.target.value)}
      >
        {recurrenceOptions.map(opt => (
  <option key={opt} value={opt}>{opt}</option>
))}

      </select>

      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {existingEvent ? 'Update' : 'Create'}
        </button>

        {existingEvent && (
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => onDelete(existingEvent.id)}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};
export default EventForm;


