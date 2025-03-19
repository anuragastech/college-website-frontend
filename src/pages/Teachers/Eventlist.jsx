import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('/api/events/get-events');
      setEvents(res.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/api/events/${id}`);
        setEvents(events.filter((event) => event._id !== id));
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete event');
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Event List</h2>

        {/* Event List */}
        {events.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="px-4 py-2 border">Event Name</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Location</th>
                {/* <th className="px-4 py-2 border">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">{event.name}</td>
                  <td className="px-4 py-3 border">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border">{event.location}</td>
                  {/* <td className="px-4 py-3 border text-center">
                    <button
                      onClick={() => handleDeleteEvent(event._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-500">No events added yet.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;
