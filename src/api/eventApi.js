import apiClient from './apiClient';

export const fetchEventsStaff = async () => {
  const response = await apiClient.get('/api/dashboard/events');
  return response.data.events;
};

export const fetchEvents = async () => {
  const response = await apiClient.get('/api/events');
  return response.data.events;
};

export const fetchEventByIdStaff = async (id) => {
  const response = await apiClient.get(`/api/dashboard/events/${id}`);
  return response.data.event;
};

export const fetchEventById = async (id) => {
  const response = await apiClient.get(`/api/events/${id}`);
  return response.data.event;
};

export const createEvent = async (eventData) => {
  const response = await apiClient.post('/api/dashboard/events', eventData);
  return response.data.event;
};

export const updateEvent = async (id, eventData) => {
  const response = await apiClient.put(`/api/dashboard/events/${id}`, eventData);
  return response.data.event;
};

export const deleteEvent = async (id) => {
  const response = await apiClient.delete(`/api/dashboard/events/${id}`);
  return response.data.message;
};

export const signUpForEvent = async (eventId) => {
  const response = await apiClient.post('/api/events/signup', { eventId });
  return response.data; 
};

export const addEventToGoogleCalendar = async (eventId) => {
  const response = await apiClient.post(`/api/events/${eventId}/add-to-google-calendar`);
  return response.data;
};