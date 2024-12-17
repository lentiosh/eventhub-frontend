import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../api/eventApi';

const HomePageEvents = () => {
  const { data: events, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['homeEvents'],
    queryFn: fetchEvents,
    retry: 1,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-color">
        <p className="text-text-color text-base">Loading events...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-half-spacing bg-background-color">
        <p className="text-red-600 text-base">Error loading events: {error.message}</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-background-alt2-color text-background-color rounded hover:bg-background-alt-color transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="py-spacing px-spacing sm:px-half-spacing lg:px-double-spacing bg-background-color">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-semibold text-center text-text-color mb-spacing">
          Upcoming Events
        </h1>
        {events && events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-half-spacing">
            {events.map((event) => (
              <Link
                to={`/events/${event.id}`}
                key={event.id}
                className="block rounded-lg border border-border-color shadow-sm hover:shadow-md transition-shadow duration-200 bg-background-alt-color"
              >
                <div className="relative w-full h-48 rounded-t-lg overflow-hidden bg-background-background-color">
                  {event.img ? (
                    <img
                      src={event.img}
                      alt={event.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-text-alt-color italic text-sm">
                      No Image
                    </div>
                  )}
                </div>
                <div className="p-spacing">
                  <h2 className="text-lg font-semibold text-text-color mb-half-spacing">
                    {event.title}
                  </h2>
                  <p className="text-sm text-text-alt-color line-clamp-3 mb-half-spacing">
                    {event.description || 'No description available.'}
                  </p>
                  <div className="text-sm text-text-color space-y-quarter-spacing">
                    <div className="flex items-center space-x-quarter-spacing">
                      <span className="font-medium">Date:</span>
                      <span>
                        {new Date(event.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-quarter-spacing">
                      <span className="font-medium">Location:</span>
                      <span>{event.location || 'TBA'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-text-alt-color mt-spacing">
            No events found.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePageEvents;
