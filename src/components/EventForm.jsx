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
      id: existingEvent?.id || uuid(),  // ← use old ID if editing
      title,
      description,
      date,
      time,
      recurrence,
    };

    onSave(eventData);
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


// const EventForm = ({ date, existingEvent, onSave, onDelete }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [time, setTime] = useState('');
//   const [recurrence, setRecurrence] = useState('None');

//   useEffect(() => {
//     if (existingEvent) {
//       setTitle(existingEvent.title);
//       setDescription(existingEvent.description);
//       setTime(existingEvent.time);
//       setRecurrence(existingEvent.recurrence || 'None');
//     } else {
//       setTitle('');
//       setDescription('');
//       setTime('');
//       setRecurrence('None');
//     }
//   }, [existingEvent]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newEvent = {
//       id: existingEvent?.id || uuid(),
//       title,
//       description,
//       date,
//       time,
//       recurrence,
//     };
//     onSave(newEvent);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4">
//       <input
//         className="w-full border p-2"
//         placeholder="Event title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />
//       <input
//         className="w-full border p-2"
//         type="time"
//         value={time}
//         onChange={(e) => setTime(e.target.value)}
//       />
//       <textarea
//         className="w-full border p-2"
//         placeholder="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       />
//       <select
//         className="w-full border p-2"
//         value={recurrence}
//         onChange={(e) => setRecurrence(e.target.value)}
//       >
//         {recurrenceOptions.map(option => (
//           <option key={option}>{option}</option>
//         ))}
//       </select>
//       <div className="flex justify-between">
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           {existingEvent ? 'Update' : 'Create'}
//         </button>
//         {existingEvent && (
//           <button
//             type="button"
//             className="bg-red-500 text-white px-4 py-2 rounded"
//             onClick={() => onDelete(existingEvent.id)}
//           >
//             Delete
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default EventForm;





// import React, { useState, useEffect } from 'react';
// import { v4 as uuid } from 'uuid';

// const recurrenceOptions = ['None', 'Daily', 'Weekly', 'Monthly'];

// const EventForm = ({ date, existingEvent, onSave, onDelete }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDesc] = useState('');
//   const [time, setTime] = useState('');
//   const [recurrence, setRecurrence] = useState('None');

//   useEffect(() => {
//     if (existingEvent) {
//       setTitle(existingEvent.title);
//       setDesc(existingEvent.description);
//       setTime(existingEvent.time);
//       setRecurrence(existingEvent.recurrence || 'None');
//     }
//   }, [existingEvent]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newEvent = {
//       id: existingEvent?.id || uuid(),
//       title,
//       description,
//       date,
//       time,
//       recurrence,
//     };
//     onSave(newEvent);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4">
//       <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Event title" className="w-full border p-2" required />
//       <input type="time" value={time} onChange={e => setTime(e.target.value)} className="w-full border p-2" />
//       <textarea value={description} onChange={e => setDesc(e.target.value)} placeholder="Description" className="w-full border p-2" />
//       <select value={recurrence} onChange={e => setRecurrence(e.target.value)} className="w-full border p-2">
//         {recurrenceOptions.map(opt => <option key={opt}>{opt}</option>)}
//       </select>
//       <div className="flex justify-between">
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2">Save</button>
//         {existingEvent && <button type="button" onClick={() => onDelete(existingEvent.id)} className="bg-red-500 text-white px-4 py-2">Delete</button>}
//       </div>
//     </form>
//   );
// };

// export default EventForm;
