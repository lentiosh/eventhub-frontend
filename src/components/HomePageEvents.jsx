import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../api/eventApi';
import { IoCalendarOutline, IoLocationOutline, IoTimeOutline, IoRefreshOutline } from 'react-icons/io5';

const HomePageEvents = () => {
  const { data: events, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['homeEvents'],
    queryFn: fetchEvents,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div
        className="flex justify-center items-center min-h-[50vh] bg-background-color"
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
            Loading amazing events...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="flex flex-col justify-center items-center min-h-[50vh] space-y-6 bg-background-color"
        role="alert"
        aria-live="assertive"
      >
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-500/10 backdrop-blur-sm">
          <span className="text-red-500 text-sm font-medium">
            Error loading events: {error.message}
          </span>
        </div>
        <button
          onClick={() => refetch()}
          className="group inline-flex items-center px-6 py-3 bg-background-alt-color text-text-color font-semibold 
                   rounded-2xl shadow-lg shadow-background-alt-color/25 hover:shadow-background-alt-color/40
                   transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
          aria-label="Retry loading events"
        >
          <IoRefreshOutline
            className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110"
            aria-hidden="true"
          />
          Retry Loading
        </button>
      </div>
    );
  }

  return (
    <main
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-background-color overflow-hidden"
      id="main-content"
      role="main"
    >

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-link-color/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-background-alt2-color/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold" id="upcoming-events-heading">
            <span className="block text-text-color mb-2">Discover</span>
            <span className="block bg-gradient-to-r from-link-color to-background-alt2-color bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <p className="mt-4 text-text-alt-color max-w-2xl mx-auto">
            Find and join events that match your interests. Connect with like-minded people and create memorable experiences.
          </p>
        </div>

        {events && events.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            aria-labelledby="upcoming-events-heading"
          >
            {events.map((event) => (
              <Link
                to={`/events/${event.id}`}
                key={event.id}
                className="group relative bg-background-alt-color/50 backdrop-blur-sm rounded-3xl overflow-hidden
                         border border-border-color/20 shadow-xl shadow-background-alt-color/10
                         hover:shadow-2xl hover:shadow-background-alt-color/20 
                         transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
                aria-label={`View details for ${event.title}`}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  {event.img ? (
                    <img
                      src={event.img}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center h-48 bg-background-alt-color"
                      aria-hidden="true"
                    >
                      <span className="text-text-alt-color text-sm font-medium">No Image Available</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-text-color mb-3 line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-text-alt-color line-clamp-2 mb-4">
                    {event.description || 'No description available.'}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-text-alt-color">
                      <IoCalendarOutline
                        className="w-4 h-4 mr-2 text-link-color"
                        aria-hidden="true"
                      />
                      <span>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-text-alt-color">
                      <IoTimeOutline
                        className="w-4 h-4 mr-2 text-link-color"
                        aria-hidden="true"
                      />
                      <span>
                        {new Date(event.date).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center text-sm text-text-alt-color">
                      <IoLocationOutline
                        className="w-4 h-4 mr-2 text-link-color"
                        aria-hidden="true"
                      />
                      <span>{event.location || 'TBA'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12" role="status" aria-live="polite">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-background-alt-color/30 backdrop-blur-sm">
              <span className="text-text-alt-color text-sm font-medium">
                No events found at the moment
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePageEvents;
