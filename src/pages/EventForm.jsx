import { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const EventForm = ({ eventId }) => {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [img, setImg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/dashboard/events/${eventId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const event = response.data.event;
          setTitle(event.title);
          setDescription(event.description);
          setDate(event.date.slice(0, 16)); 
          setLocation(event.location);
          setImg(event.img || '');
        } catch (error) {
          console.error('Error fetching event:', error);
          alert('Failed to fetch event details.');
        }
      };

      fetchEvent();
    }
  }, [eventId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const eventData = {
      title,
      description,
      date,
      location,
      img,
    };

    try {
      if (eventId) {
        await axios.put(`${import.meta.env.VITE_API_URL}/api/dashboard/events/${eventId}`, eventData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Event updated successfully.');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/dashboard/events`, eventData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Event created successfully.');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Failed to submit event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Event Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter event title"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter event description"
        ></textarea>
      </div>

      {/* Date and Time */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date and Time
        </label>
        <input
          type="datetime-local"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter event location"
        />
      </div>

      {/* Image URL */}
      <div>
        <label htmlFor="img" className="block text-sm font-medium text-gray-700">
          Image URL (Optional)
        </label>
        <input
          type="url"
          id="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            eventId
              ? 'bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800'
              : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300`}
        >
          {isSubmitting ? (eventId ? 'Updating...' : 'Creating...') : eventId ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;