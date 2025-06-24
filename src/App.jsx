// import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import './App.css'
// import Calendar from '/Calendar.jsx';

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Calendar/>
//     </div>



// import React, { useState, useEffect } from 'react';
// import Calendar from './components/Calendar';
// import EventForm from './components/EventForm';
// import Modal from './components/Modal';
// import './App.css';

// function App() {
//   const [events, setEvents] = useState(() => {
//     const stored = localStorage.getItem('events');
//     return stored ? JSON.parse(stored) : [];
//   });
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setEditingEvent(null);
//     setShowModal(true);
//   };

//   const handleEventClick = (event) => {
//     setEditingEvent(event);
//     setShowModal(true);
//   };

//   const handleSaveEvent = (eventData) => {
//     setEvents((prev) => {
//       const existing = prev.filter(e => e.id !== eventData.id);
//       return [...existing, eventData];
//     });
//     setShowModal(false);
//   };

//   const handleDeleteEvent = (id) => {
//     setEvents(events.filter(e => e.id !== id));
//     setShowModal(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Calendar
//         events={events}
//         onDateClick={handleDateClick}
//         onEventClick={handleEventClick}
//       />
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <EventForm
//             date={selectedDate}
//             existingEvent={editingEvent}
//             onSave={handleSaveEvent}
//             onDelete={handleDeleteEvent}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; // <-- 🧠 Required for web

import Calendar from './components/Calendar';
import EventForm from './components/EventForm';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [events, setEvents] = useState(() => {
    const stored = localStorage.getItem('events');
    return stored ? JSON.parse(stored) : [];
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setEditingEvent(null);
    setShowModal(true);
  };

  const handleEventClick = (event) => {
    setEditingEvent(event);
    setSelectedDate(event.date);
    setShowModal(true);
  };

  const handleEventDrop = (updatedEvent) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === updatedEvent.id ? { ...e, date: updatedEvent.date } : e
      )
    );
  };

  const handleSaveEvent = (eventData) => {
    setEvents((prev) => {
      const updated = prev.filter(e => e.id !== eventData.id);
      return [...updated, eventData];
    });
    setShowModal(false);
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
    setShowModal(false);
  };

  return (
    <DndProvider backend={HTML5Backend}> 
     <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-md">
        <Calendar
          events={events}
          onDateClick={handleDateClick}
          onEventClick={handleEventClick}
          onEventDrop={handleEventDrop}
        />
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EventForm
              date={selectedDate}
              existingEvent={editingEvent}
              onSave={handleSaveEvent}
              onDelete={handleDeleteEvent}
            />
          </Modal>
        )}
      </div>
      </div>
    </DndProvider>
  );
}

export default App;



// import React, { useState, useEffect } from 'react';
// import Calendar from './components/Calendar';
// import EventForm from './components/EventForm';
// import Modal from './components/Modal';
// import './App.css';

// function App() {
//   const [events, setEvents] = useState(() => {
//     const stored = localStorage.getItem('events');
//     return stored ? JSON.parse(stored) : [];
//   });

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [editingEvent, setEditingEvent] = useState(null); // holds clicked event
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setEditingEvent(null); // create new
//     setShowModal(true);
//   };

//   const handleEventClick = (event) => {
//     setEditingEvent(event); // edit mode
//     setSelectedDate(event.date); // so date shows correctly in form
//     setShowModal(true);
//   };
//   const handleEventDrop = (updatedEvent) => {
//   setEvents(prev =>
//     prev.map(e =>
//       e.id === updatedEvent.id ? { ...e, date: updatedEvent.date } : e
//     )
//   );
// };


//   const handleSaveEvent = (eventData) => {
//     setEvents((prev) => {
//       const updated = prev.filter(e => e.id !== eventData.id);
//       return [...updated, eventData];
//     });
//     setShowModal(false);
//   };

//   const handleDeleteEvent = (id) => {
//     setEvents(events.filter(e => e.id !== id));
//     setShowModal(false);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Calendar
//         events={events}
//         onDateClick={handleDateClick}
//         onEventClick={handleEventClick}
//          onEventDrop={handleEventDrop}
//       />
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <EventForm
//             date={selectedDate}
//             existingEvent={editingEvent}
//             onSave={handleSaveEvent}
//             onDelete={handleDeleteEvent}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default App;


    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
//   )
// }

// export default App
// function App() {
//   return (
//     <div>
//       <h1>Hello World</h1>
//     </div>
//   );
// }