import { Link } from 'react-router-dom';
import { IoCalendarOutline } from 'react-icons/io5';

const Hero = () => {
  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-background-color overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-link-color/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-background-alt2-color/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col items-center text-center">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full bg-background-alt-color/30 backdrop-blur-sm mb-8"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-link-color opacity-75"
                aria-hidden="true"
              ></span>
              <span
                className="relative inline-flex rounded-full h-2 w-2 bg-link-color"
                aria-hidden="true"
              ></span>
            </span>
            <span className="ml-3 text-sm font-medium text-text-color">
              Discover Amazing Events
            </span>
          </div>

          <h1
            id="hero-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold"
          >
            <span className="block text-text-color mb-2">Welcome to</span>
            <span className="block bg-gradient-to-r from-link-color to-background-alt2-color bg-clip-text text-transparent">
              EventHub
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-text-alt-color max-w-2xl leading-relaxed">
            Connect, discover, and attend events that inspire and engage. Whether you are looking to network with professionals or seeking fun and learning opportunities, EventHub has something for everyone.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/events"
              className="group inline-flex items-center px-8 py-4 bg-link-color text-background-color font-semibold rounded-2xl
                         shadow-lg shadow-link-color/25 hover:shadow-link-color/40 transform hover:-translate-y-0.5
                         transition-all duration-200 w-full sm:w-auto justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
              aria-label="Discover Events"
            >
              <IoCalendarOutline
                className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110"
                aria-hidden="true"
              />
              Discover Events
            </Link>
          </div>

          <div className="mt-10 w-full max-w-3xl mx-auto" aria-hidden="true">
            <div className="h-px bg-gradient-to-r from-transparent via-border-color to-transparent opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
