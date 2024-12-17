import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GoogleCallback from './pages/GoogleCallback';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';
import EventList from './pages/EventList'; 
import EventDetails from './pages/EventDetails';
import StaffRoute from './components/StaffRoute'; 

const App = () => {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} /> 
          <Route path="/events" element={<EventList />} /> 
          <Route path="/events/:id" element={<EventDetails />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/google" element={<GoogleCallback />} /> 
          
          {/* Protected routes */}
          <Route element={<StaffRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/edit-event/:id" element={<EditEvent />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;