import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEventById, signUpForEvent, addEventToGoogleCalendar } from '../api/eventApi';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useState, useEffect } from 'react';
import { 
  IoCalendarOutline, 
  IoLocationOutline, 
  IoTimeOutline, 
  IoArrowBackOutline,
  IoPencilOutline,
  IoLogoGoogle
} from 'react-icons/io5';

const EventDetails = () => {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const isEventSignedUp = useAuthStore((state) => state.isEventSignedUp);
  const addEventSignup = useAuthStore((state) => state.addEventSignup);
  const addGoogleCalendarEvent = useAuthStore((state) => state.addGoogleCalendarEvent);
  const isGoogleCalendarEventAdded = useAuthStore((state) => state.isGoogleCalendarEventAdded);
  const navigate = useNavigate();
  
  const [hasSignedUpLocally, setHasSignedUpLocally] = useState(false);
  const [googleCalendarAdded, setGoogleCalendarAdded] = useState(false);
  const [needReAuth, setNeedReAuth] = useState(false);

  useEffect(() => {
    if (user && isEventSignedUp(id)) {
      setHasSignedUpLocally(true);
    }
    if (user && !user.is_staff && isGoogleCalendarEventAdded(id)) {
      setGoogleCalendarAdded(true);
    }
  }, [user, isEventSignedUp, isGoogleCalendarEventAdded, id]);

  const { data: event, isLoading: isEventLoading, isError: isEventError } = useQuery({
    queryKey: ['event', id],
    queryFn: () => fetchEventById(id),
  });

  const { mutate: handleSignUp, isLoading: isSigningUp } = useMutation({
    mutationFn: (eventId) => signUpForEvent(eventId),
    onSuccess: (data) => {
      console.log(data.message);
      addEventSignup(id);
      setHasSignedUpLocally(true);
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || 'Failed to sign up for the event.';
      console.error(errMsg);
      if (errMsg === 'User already signed up for this event.') {
        addEventSignup(id);
        setHasSignedUpLocally(true);
      }
    },
  });

  const { mutate: handleAddToGoogle, isLoading: isAddingToGoogle } = useMutation({
    mutationFn: (eventId) => addEventToGoogleCalendar(eventId),
    onSuccess: (data) => {
      console.log(data.message);
      setGoogleCalendarAdded(true);
      addGoogleCalendarEvent(id);
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || 'Failed to add event to Google Calendar.';
      console.error(errMsg);
      if (errMsg === "Your Google permissions need to be refreshed. Please log in with Google again.") {
        setNeedReAuth(true);
      } else {
        alert(errMsg);
      }
    },
  });

  if (isEventLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background-color">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-alt-color/30 backdrop-blur-sm">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-link-color opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-link-color"></span>
          </span>
          <span className="ml-3 text-sm font-medium text-text-color">
            Loading event details...
          </span>
        </div>
      </div>
    );
  }

  if (isEventError || !event) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background-color">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-500/10 backdrop-blur-sm">
          <span className="text-red-500 text-sm font-medium">
            Unable to retrieve event details. Please try again later.
          </span>
        </div>
      </div>
    );
  }

  const showSignUpButton = user && !user.is_staff && !hasSignedUpLocally;
  const showThankYou = user && !user.is_staff && hasSignedUpLocally;

  return (
    <section className="relative min-h-screen bg-background-color py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-link-color/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-background-alt2-color/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-background-alt-color/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-border-color/20 shadow-xl">
          {event.img && (
            <div className="relative h-72 sm:h-96 overflow-hidden">
              <img
                src={event.img}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="bg-gradient-to-r from-link-color to-background-alt2-color bg-clip-text text-transparent">
                {event.title}
              </span>
            </h1>

            <p className="mt-6 text-text-color text-lg leading-relaxed">
              {event.description}
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center text-text-alt-color">
                <IoCalendarOutline className="w-5 h-5 mr-3 text-link-color" />
                <span>
                  {new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div className="flex items-center text-text-alt-color">
                <IoTimeOutline className="w-5 h-5 mr-3 text-link-color" />
                <span>
                  {new Date(event.date).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className="flex items-center text-text-alt-color">
                <IoLocationOutline className="w-5 h-5 mr-3 text-link-color" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {user && user.is_staff && (
                <button
                  onClick={() => navigate(`/edit-event/${event.id}`)}
                  className="group inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-semibold 
                           rounded-2xl shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40
                           transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <IoPencilOutline className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  Edit Event
                </button>
              )}

              {showSignUpButton && (
                <button
                  onClick={() => handleSignUp(id)}
                  disabled={isSigningUp}
                  className="group inline-flex items-center px-6 py-3 bg-link-color text-white font-semibold 
                           rounded-2xl shadow-lg shadow-link-color/25 hover:shadow-link-color/40
                           transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  {isSigningUp ? (
                    <span className="flex items-center">
                      <span className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Signing up...
                    </span>
                  ) : (
                    'Sign Up for Event'
                  )}
                </button>
              )}

              {showThankYou && (
                <div className="inline-flex items-center px-6 py-3 bg-green-500/10 text-green-500 font-semibold rounded-2xl">
                  ✓ Thank you for signing up!
                </div>
              )}

              {showThankYou && !googleCalendarAdded && !needReAuth && (
                <button
                  onClick={() => handleAddToGoogle(id)}
                  disabled={isAddingToGoogle}
                  className="group inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold 
                           rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                           transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <IoLogoGoogle className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                  {isAddingToGoogle ? 'Adding to Calendar...' : 'Add to Google Calendar'}
                </button>
              )}

              {showThankYou && googleCalendarAdded && (
                <div className="inline-flex items-center px-6 py-3 bg-blue-500/10 text-blue-500 font-semibold rounded-2xl">
                  ✓ Added to Google Calendar
                </div>
              )}

              {needReAuth && (
                <div className="w-full">
                  <p className="text-yellow-600 mb-3">
                    Your Google permissions need to be refreshed. Please log in with Google again:
                  </p>
                  <a
                    href="/auth/google"
                    className="group inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold 
                             rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                             transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <IoLogoGoogle className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                    Re-Authenticate with Google
                  </a>
                </div>
              )}

              <Link
                to="/events"
                className="group inline-flex items-center px-6 py-3 bg-background-alt-color text-text-color font-semibold 
                         rounded-2xl shadow-lg shadow-background-alt-color/25 hover:shadow-background-alt-color/40
                         transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <IoArrowBackOutline className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                Back to Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;