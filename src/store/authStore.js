import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';

const tokenFromStorage = localStorage.getItem('token');
const userFromStorage = tokenFromStorage ? jwtDecode(tokenFromStorage) : null;

const signedUpEventsMap = JSON.parse(localStorage.getItem('signedUpEventsMap') || '{}');

const googleCalendarEventsMap = JSON.parse(localStorage.getItem('googleCalendarEventsMap') || '{}');

const useAuthStore = create((set, get) => ({
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
  user: userFromStorage || null,

  get signedUpEvents() {
    const { user } = get();
    if (!user || !user.id) return [];
    return signedUpEventsMap[user.id] || [];
  },

  get googleCalendarEvents() {
    const { user } = get();
    if (!user || !user.id) return [];
    return googleCalendarEventsMap[user.id] || [];
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
    const decodedToken = jwtDecode(token);
    set({ token, isAuthenticated: true, user: decodedToken });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false, user: null });
  },

  addEventSignup: (eventId) => {
    const { user } = get();
    if (!user || !user.id) return;

    const userId = user.id;
    const existingEvents = signedUpEventsMap[userId] || [];
    if (!existingEvents.includes(eventId)) {
      const updatedEvents = [...existingEvents, eventId];
      signedUpEventsMap[userId] = updatedEvents;
      localStorage.setItem('signedUpEventsMap', JSON.stringify(signedUpEventsMap));
    }
  },

  isEventSignedUp: (eventId) => {
    const { user } = get();
    if (!user || !user.id) return false;
    const userId = user.id;
    const existingEvents = signedUpEventsMap[userId] || [];
    return existingEvents.includes(eventId);
  },

  addGoogleCalendarEvent: (eventId) => {
    const { user } = get();
    if (!user || !user.id) return;

    const userId = user.id;
    const existingGoogleCalEvents = googleCalendarEventsMap[userId] || [];
    if (!existingGoogleCalEvents.includes(eventId)) {
      const updatedEvents = [...existingGoogleCalEvents, eventId];
      googleCalendarEventsMap[userId] = updatedEvents;
      localStorage.setItem('googleCalendarEventsMap', JSON.stringify(googleCalendarEventsMap));
    }
  },

  isGoogleCalendarEventAdded: (eventId) => {
    const { user } = get();
    if (!user || !user.id) return false;
    const userId = user.id;
    const existingGoogleCalEvents = googleCalendarEventsMap[userId] || [];
    return existingGoogleCalEvents.includes(eventId);
  },
}));

export default useAuthStore;
