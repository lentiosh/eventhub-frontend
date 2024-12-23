import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchEventsStaff, deleteEvent } from '../api/eventApi';
import useAuthStore from '../store/authStore';
import { 
  IoCalendarOutline, 
  IoLocationOutline,
  IoAddCircleOutline,
  IoPencilOutline,
  IoImageOutline,
  IoTrashOutline
} from "react-icons/io5";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(''); 

  const {
    data: events = [],
    isLoading,
  } = useQuery({
    queryKey: ['eventsStaff'],
    queryFn: fetchEventsStaff,
    onError: (err) => {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events. Please try again later.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventsStaff'] });
      setSuccess('Event deleted successfully.');
    },
    onError: (err) => {
      console.error('Error deleting event:', err);
      setError('Failed to delete event. Please try again.');
    },
  });

  const handleDelete = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this event?');
    if (!confirmed) return;
    deleteMutation.mutate(id);
  };

  const sortedEvents = events.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex justify-center items-center bg-background-color"
        role="status"
        aria-live="polite"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-alt-color/30 backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
            <span
              className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-link-color opacity-75"
              aria-hidden="true"
            ></span>
            <span
              className="relative inline-flex rounded-full h-2 w-2 bg-link-color"
              aria-hidden="true"
            ></span>
          </span>
          <span className="ml-3 text-sm font-medium text-text-color">
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <main
      className="relative min-h-screen bg-background-color py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="main-content"
      role="main"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-link-color/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-background-alt2-color/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
 
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-link-color to-background-alt2-color bg-clip-text text-transparent">
                Dashboard
              </span>
            </h1>
            <p className="mt-2 text-text-alt-color text-lg">Welcome back, {user.name}</p>
          </div>
          
          <Link to="/create-event" className="mt-6 sm:mt-0">
            <button
              className="group flex items-center px-6 py-3 bg-link-color text-white font-semibold rounded-2xl shadow-lg shadow-link-color/25 hover:shadow-link-color/40 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
              aria-label="Create a new event"
            >
              <IoAddCircleOutline
                className="w-5 h-5 mr-2 transition-transform group-hover:scale-110"
                aria-hidden="true"
              />
              Create Event
            </button>
          </Link>
        </div>

        {success && (
          <div
            className="mb-6 p-4 bg-green-500/10 backdrop-blur-sm rounded-2xl border border-green-500/20"
            role="status"
            aria-live="polite"
          >
            <p className="text-green-500 text-sm font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div
            className="mb-6 p-4 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-red-500 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" aria-label="Events List">
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="group bg-background-alt-color/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-border-color/20 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
              role="article"
              aria-labelledby={`event-title-${event.id}`}
            >
              <div className="relative">
                {event.img ? (
                  <div className="relative h-48">
                    <img
                      src={event.img}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
                  </div>
                ) : (
                  <div
                    className="h-48 bg-background-alt-color/50 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <IoImageOutline
                      className="w-12 h-12 text-text-alt-color/50"
                      aria-hidden="true"
                    />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h2
                  id={`event-title-${event.id}`}
                  className="text-lg font-bold text-text-color group-hover:text-link-color transition-colors line-clamp-1"
                >
                  {event.title}
                </h2>
                
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-text-alt-color">
                    <IoCalendarOutline
                      className="w-4 h-4 mr-2 text-link-color flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm truncate">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  <div className="flex items-center text-text-alt-color">
                    <IoLocationOutline
                      className="w-4 h-4 mr-2 text-link-color flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm truncate">{event.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link to={`/edit-event/${event.id}`} className="flex-1">
                    <button
                      className="w-full group flex items-center justify-center px-4 py-2 bg-yellow-500/10 text-yellow-500 font-medium rounded-xl hover:bg-yellow-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                      aria-label={`Edit event ${event.title}`}
                    >
                      <IoPencilOutline
                        className="w-4 h-4 mr-2"
                        aria-hidden="true"
                      />
                      Edit
                    </button>
                  </Link>
                  
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex-1 group flex items-center justify-center px-4 py-2 bg-red-500/10 text-red-500 font-medium rounded-xl hover:bg-red-500/20 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    aria-label={`Delete event ${event.title}`}
                  >
                    <IoTrashOutline
                      className="w-4 h-4 mr-2"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
