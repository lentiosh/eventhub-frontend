import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
        alert('Failed to fetch events. Please try again later.');
      }
    };

    fetchEvents();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/dashboard/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Event deleted successfully.');
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">Welcome, {user.name}</p>
          </div>
          <Link to="/create-event">
            <button className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-300">
              Create New Event
            </button>
          </Link>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">All Events</h2>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
                  {event.img && (
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  <p className="mt-2 text-gray-700">{event.description}</p>
                  <p className="mt-2 text-gray-600">
                    <span className="font-semibold">Date:</span>{' '}
                    {new Date(event.date).toLocaleString()}
                  </p>
                  <p className="mt-1 text-gray-600">
                    <span className="font-semibold">Location:</span> {event.location}
                  </p>
                  <div className="mt-4 flex space-x-2">
                    <Link to={`/edit-event/${event.id}`}>
                      <button className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-semibold rounded-md shadow hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-colors duration-300">
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white font-semibold rounded-md shadow hover:from-red-500 hover:via-red-600 hover:to-red-700 transition-colors duration-300"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No events found. Start by creating a new event!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;