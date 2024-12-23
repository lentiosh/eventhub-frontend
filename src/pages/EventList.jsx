import { useQuery } from '@tanstack/react-query';
import { fetchEvents } from '../api/eventApi';
import { Link } from 'react-router-dom';
import { 
  IoCalendarOutline, 
  IoLocationOutline, 
  IoChevronForwardOutline,
  IoImageOutline
} from "react-icons/io5";

const EventList = () => {
  const { data: events, isLoading, isError, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    retry: 1, 
  });

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
            Loading events...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="min-h-screen flex flex-col justify-center items-center bg-background-color"
        role="alert"
        aria-live="assertive"
      >
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-500/10 backdrop-blur-sm">
          <span className="text-red-500 text-sm font-medium">
            Unable to load events. Please try again later.
          </span>
        </div>
        <button
          onClick={() => refetch()}
          className="group inline-flex items-center px-6 py-3 bg-background-alt-color text-text-color font-semibold 
                   rounded-2xl shadow-lg shadow-background-alt-color/25 hover:shadow-background-alt-color/40
                   transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color mt-4"
          aria-label="Retry loading events"
        >
          <IoChevronForwardOutline
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
      className="relative min-h-screen bg-background-color py-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      id="main-content"
      role="main"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 bg-link-color/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-background-alt2-color/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">

        <header className="mb-8">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-link-color to-background-alt2-color bg-clip-text text-transparent">
              Events
            </span>
          </h1>
          <p className="mt-2 text-text-alt-color text-lg">
            Discover upcoming events
          </p>
        </header>

        {events && events.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            aria-labelledby="events-heading"
          >
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="block group h-full"
                aria-label={`View details for ${event.title}`}
              >
                <div
                  className="bg-background-alt-color/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-border-color/20 shadow-xl 
                            transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 h-full flex flex-col
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
                  role="article"
                  aria-labelledby={`event-title-${event.id}`}
                >
                  <div className="relative">
                    {event.img ? (
                      <div className="relative h-48">
                        <img
                          src={event.img}
                          alt={event.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden="true"></div>
                      </div>
                    ) : (
                      <div
                        className="h-48 bg-background-alt-color/50 flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <IoImageOutline className="w-12 h-12 text-text-alt-color/50" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h2
                      id={`event-title-${event.id}`}
                      className="text-lg font-bold text-text-color group-hover:text-link-color transition-colors mb-4 line-clamp-2"
                    >
                      {event.title}
                    </h2>
                    
                    <div className="space-y-2 mt-auto">
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
                      
                      <div className="flex items-center justify-end text-link-color pt-2">
                        <IoChevronForwardOutline 
                          className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="bg-background-alt-color/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-border-color/20 shadow-xl"
            role="status"
            aria-live="polite"
          >
            <IoCalendarOutline className="w-16 h-16 mx-auto text-link-color mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold text-text-color mb-2">No Events Found</h3>
            <p className="text-text-alt-color">Check back later for upcoming events.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default EventList;
