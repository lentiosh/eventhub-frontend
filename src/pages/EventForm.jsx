import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createEvent, updateEvent, fetchEventByIdStaff } from '../api/eventApi';
import { useNavigate, Link } from 'react-router-dom';
import { 
  IoCalendarOutline,
  IoLocationOutline,
  IoImageOutline,
  IoTextOutline,
  IoChevronBackOutline
} from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const EventForm = ({ eventId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    img: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (eventId) {
      const fetchEvent = async () => {
        try {
          const event = await fetchEventByIdStaff(eventId);
          setFormData({
            title: event.title,
            description: event.description,
            date: event.date.slice(0, 16),
            location: event.location,
            img: event.img || ''
          });
        } catch (error) {
          console.error('Error fetching event:', error);
          setError('Failed to fetch event details.');
        }
      };

      fetchEvent();
    }
  }, [eventId]);

  const createMutation = useMutation({
    mutationFn: (eventData) => createEvent(eventData),
    onSuccess: () => {
      setSuccess('Event created successfully.');
      setTimeout(() => navigate('/dashboard'), 1500);
    },
    onError: (error) => {
      console.error('Error creating event:', error);
      setError(error.response?.data?.message || 'Failed to create event. Please try again.');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (eventData) => updateEvent(eventId, eventData),
    onSuccess: () => {
      setSuccess('Event updated successfully.');
      setTimeout(() => navigate('/dashboard'), 1500);
    },
    onError: (error) => {
      console.error('Error updating event:', error);
      setError(error.response?.data?.message || 'Failed to update event. Please try again.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (eventId) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  if (createMutation.isLoading || updateMutation.isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background-color">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-background-alt-color/30 backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-link-color opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-link-color"></span>
          </span>
          <span className="ml-3 text-sm font-medium text-text-color">
            {eventId ? 'Updating event...' : 'Creating event...'}
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

      <div className="relative max-w-3xl mx-auto">
        
        <div className="mb-8">
          <Link to="/dashboard" className="inline-flex items-center text-text-alt-color hover:text-link-color transition-colors">
            <IoChevronBackOutline className="w-5 h-5 mr-2" aria-hidden="true" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          
          <h1 className="mt-4 text-4xl font-bold text-center">
            <span className="bg-gradient-to-r from-link-color to-background-alt2-color bg-clip-text text-transparent">
              {eventId ? 'Edit Event' : 'Create Event'}
            </span>
          </h1>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-500/10 backdrop-blur-sm rounded-2xl border border-green-500/20">
            <p className="text-green-500 text-sm font-medium">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20">
            <p className="text-red-500 text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="bg-background-alt-color/30 backdrop-blur-sm rounded-3xl border border-border-color/20 shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text-color mb-2">
                <div className="flex items-center">
                  <IoTextOutline className="w-5 h-5 mr-2 text-link-color" aria-hidden="true" />
                  Event Title
                </div>
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="block w-full text-text-color px-4 py-3 border border-border-color/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-link-color focus:border-link-color transition-all duration-200 placeholder:text-text-alt-color bg-background-alt-color/30 backdrop-blur-sm"
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-text-color mb-2">
                <div className="flex items-center">
                  <IoTextOutline className="w-5 h-5 mr-2 text-link-color" aria-hidden="true" />
                  Description
                </div>
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                className="block w-full text-text-color px-4 py-3 border border-border-color/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-link-color focus:border-link-color transition-all duration-200 placeholder:text-text-alt-color bg-background-alt-color/30 backdrop-blur-sm"
                placeholder="Enter event description"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-text-color mb-2">
                <div className="flex items-center">
                  <IoCalendarOutline className="w-5 h-5 mr-2 text-link-color" aria-hidden="true" />
                  Date and Time
                </div>
              </label>
              <input
                type="datetime-local"
                id="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="block w-full text-text-color px-4 py-3 border border-border-color/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-link-color focus:border-link-color transition-all duration-200 placeholder:text-text-alt-color bg-background-alt-color/30 backdrop-blur-sm"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-text-color mb-2">
                <div className="flex items-center">
                  <IoLocationOutline className="w-5 h-5 mr-2 text-link-color" aria-hidden="true" />
                  Location
                </div>
              </label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="block w-full text-text-color px-4 py-3 border border-border-color/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-link-color focus:border-link-color transition-all duration-200 placeholder:text-text-alt-color bg-background-alt-color/30 backdrop-blur-sm"
                placeholder="Enter event location"
              />
            </div>

            <div>
              <label htmlFor="img" className="block text-sm font-medium text-text-color mb-2">
                <div className="flex items-center">
                  <IoImageOutline className="w-5 h-5 mr-2 text-link-color" aria-hidden="true" />
                  Image URL (Optional)
                </div>
              </label>
              <input
                type="url"
                id="img"
                value={formData.img}
                onChange={handleChange}
                className="block w-full text-text-color px-4 py-3 border border-border-color/20 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-link-color focus:border-link-color transition-all duration-200 placeholder:text-text-alt-color bg-background-alt-color/30 backdrop-blur-sm"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <button
              type="submit"
              disabled={createMutation.isLoading || updateMutation.isLoading}
              className="w-full group flex items-center justify-center px-6 py-3 bg-link-color text-white font-semibold rounded-2xl shadow-lg shadow-link-color/25 hover:shadow-link-color/40 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
            >
              {eventId ? 'Update Event' : 'Create Event'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventForm;
