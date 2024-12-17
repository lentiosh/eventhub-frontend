import { useQuery } from '@tanstack/react-query';
import { fetchEvents, fetchEventsStaff } from '../api/eventApi';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const EventList = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const fetchEventsFunction = isAuthenticated && user.is_staff ? fetchEventsStaff : fetchEvents;

  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['events', isAuthenticated && user.is_staff],
    queryFn: fetchEventsFunction,
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard/events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('Event deleted successfully.');

    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Failed to delete event.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700 text-lg">Loading events...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error fetching events.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          {isAuthenticated && user.is_staff && (
            <button
              onClick={() => navigate('/create-event')}
              className="mt-4 sm:mt-0 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create New Event
            </button>
          )}
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {event.img ? (
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image Available</span>
                  </div>
                )}

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{event.title}</h2>
                  <p className="mt-2 text-gray-600">{event.description.substring(0, 100)}{event.description.length > 100 && '...'}</p>
                  <div className="mt-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Location:</span> {event.location}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 flex space-x-2">
                  <Link to={`/events/${event.id}`} className="flex-1">
                    <button className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      View Details
                    </button>
                  </Link>
                  {isAuthenticated && user.is_staff && (
                    <>
                      <Link to={`/edit-event/${event.id}`} className="flex-1">
                        <button className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-semibold rounded-md shadow-md hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white font-semibold rounded-md shadow-md hover:from-red-600 hover:via-red-700 hover:to-red-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <FaTrash className="mr-2" />
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventList;