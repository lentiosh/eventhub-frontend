import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { FaCalendarAlt, FaTachometerAlt } from 'react-icons/fa'; 

const Hero = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  const renderCTAButton = () => {
    if (isAuthenticated) {
      if (user.is_staff) {
        return (
          <Link
            to="/dashboard"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FaTachometerAlt className="inline-block mr-2" />
            Go to Dashboard
          </Link>
        );
      } else {
        return (
          <Link
            to="/events"
            className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 text-white font-semibold rounded-md shadow-md hover:from-green-600 hover:via-teal-600 hover:to-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <FaCalendarAlt className="inline-block mr-2" />
            View Events
          </Link>
        );
      }
    } else {
      return (
        <Link
          to="/login"
          className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 text-white font-semibold rounded-md shadow-md hover:from-red-600 hover:via-yellow-600 hover:to-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Login to Get Started
        </Link>
      );
    }
  };

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center">
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              EventHub
            </span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700">
            Connect, discover, and attend events that inspire and engage. Whether you are a
            professional looking to network or someone seeking fun and learning, EventHub
            has something for everyone.
          </p>
          <div className="mt-6">
            {renderCTAButton()}
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/event.jpg"
            alt="Event Illustration"
            className="w-3/4 h-auto"
          />
         
        </div>
      </div>
    </section>
  );
};

export default Hero;