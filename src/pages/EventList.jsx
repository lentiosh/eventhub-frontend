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
  const { data: events, isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background-color">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-alt-color/30 backdrop-blur-sm">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-link-color opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-link-color"></span>
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
      <div className="min-h-screen flex justify-center items-center bg-background-color">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-500/10 backdrop-blur-sm">
          <span className="text-red-500 text-sm font-medium">
            Unable to load events. Please try again later.
          </span>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen bg-background-color py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">

      <div className="absolute inset-0 overflow-hidden">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="block group h-full"
              >
                <div className="bg-background-alt-color/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-border-color/20 shadow-xl 
                              transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative">
                    {event.img ? (
                      <div className="relative h-48">
                        <img
                          src={event.img}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    ) : (
                      <div className="h-48 bg-background-alt-color/50 flex items-center justify-center">
                        <IoImageOutline className="w-12 h-12 text-text-alt-color/50" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-bold text-text-color group-hover:text-link-color transition-colors mb-4 line-clamp-2">
                      {event.title}
                    </h2>
                    
                    <div className="space-y-2 mt-auto">
                      <div className="flex items-center text-text-alt-color">
                        <IoCalendarOutline className="w-4 h-4 mr-2 text-link-color flex-shrink-0" />
                        <span className="text-sm truncate">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>

                      <div className="flex items-center text-text-alt-color">
                        <IoLocationOutline className="w-4 h-4 mr-2 text-link-color flex-shrink-0" />
                        <span className="text-sm truncate">{event.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-end text-link-color pt-2">
                        <IoChevronForwardOutline 
                          className="w-5 h-5 transform transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-background-alt-color/50 backdrop-blur-sm rounded-3xl p-12 text-center border border-border-color/20 shadow-xl">
            <IoCalendarOutline className="w-16 h-16 mx-auto text-link-color mb-4" />
            <h3 className="text-xl font-bold text-text-color mb-2">No Events Found</h3>
            <p className="text-text-alt-color">Check back later for upcoming events</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventList;