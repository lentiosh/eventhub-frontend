import { Link } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative bg-background-color py-double-spacing px-half-spacing">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-text-color">
          Welcome to{' '}
          <span className="text-link-color">
            EventHub
          </span>
        </h1>

        <p className="mt-half-spacing text-lg sm:text-xl text-text-alt-color max-w-2xl">
          Connect, discover, and attend events that inspire and engage. Whether you are looking to network with professionals or seeking fun and learning opportunities, Eventify has something for everyone.
        </p>

        <div className="mt-double-spacing">
          <Link
            to="/events"
            className="inline-flex items-center px-8 py-4 bg-link-color text-background-color font-semibold rounded-full shadow-lg hover:bg-opacity-90 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
          >
            <FaCalendarAlt className="mr-half-spacing" />
            Discover Events
          </Link>
        </div>
      </div>

      <div className="mt-double-spacing max-w-7xl mx-auto border-b-2 border-dotted border-border-color w-11/12"></div>
    </section>
  );
};

export default Hero;
