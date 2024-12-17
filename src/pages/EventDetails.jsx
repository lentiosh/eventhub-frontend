import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchEventById, signUpForEvent, addEventToGoogleCalendar } from '../api/eventApi';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { FaEdit } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const EventDetails = () => {
  const { id } = useParams();
  const user = useAuthStore((state) => state.user);
  const isEventSignedUp = useAuthStore((state) => state.isEventSignedUp);
  const addEventSignup = useAuthStore((state) => state.addEventSignup);

  const navigate = useNavigate();
  const [hasSignedUpLocally, setHasSignedUpLocally] = useState(false);
  const [googleCalendarAdded, setGoogleCalendarAdded] = useState(false);
  const [needReAuth, setNeedReAuth] = useState(false);

  useEffect(() => {
    if (user && isEventSignedUp(id)) {
      setHasSignedUpLocally(true);
    }
  }, [user, isEventSignedUp, id]);

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 text-lg">Loading event details...</p>
      </div>
    );
  }

  if (isEventError || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Unable to retrieve event details. Please try again later.</p>
      </div>
    );
  }

  const showSignUpButton = user && !user.is_staff && !hasSignedUpLocally;
  const showThankYou = user && !user.is_staff && hasSignedUpLocally;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {event.img && (
          <img
            src={event.img}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        )}

        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-900">{event.title}</h2>
          <p className="mt-4 text-gray-700">{event.description}</p>
          <div className="mt-4">
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span>{' '}
              {new Date(event.date).toLocaleString()}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Location:</span> {event.location}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {user && user.is_staff && (
              <button
                onClick={() => navigate(`/edit-event/${event.id}`)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-semibold rounded-md shadow-md hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 transition-colors duration-300"
              >
                <FaEdit className="mr-2" />
                Edit Event
              </button>
            )}

            {showSignUpButton && (
              <button
                onClick={() => handleSignUp(id)}
                disabled={isSigningUp}
                className="px-4 py-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold rounded-md shadow-md hover:from-green-500 hover:via-green-600 hover:to-green-700 transition-colors duration-300"
              >
                {isSigningUp ? 'Signing up...' : 'Sign Up for Event'}
              </button>
            )}

            {showThankYou && (
              <span className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md">
                Thank you for signing up!
              </span>
            )}

            {showThankYou && !googleCalendarAdded && !needReAuth && (
              <button
                onClick={() => handleAddToGoogle(id)}
                disabled={isAddingToGoogle}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold rounded-md shadow-md hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-colors duration-300"
              >
                {isAddingToGoogle ? 'Adding to Google Calendar...' : 'Add to Google Calendar'}
              </button>
            )}

            {showThankYou && googleCalendarAdded && (
              <span className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md">
                Event added to your Google Calendar!
              </span>
            )}

            {needReAuth && (
              <div className="flex flex-col gap-2">
                <p className="text-yellow-600">Your Google permissions need to be refreshed. Please log in with Google again:</p>
                <a
                  href="/auth/google"
                  className="px-4 py-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white font-semibold rounded-md shadow-md hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 transition-colors duration-300"
                >
                  Re-Authenticate with Google
                </a>
              </div>
            )}

            <Link to="/events">
              <button className="px-4 py-2 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white font-semibold rounded-md shadow-md hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 transition-colors duration-300">
                Back to Events
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;