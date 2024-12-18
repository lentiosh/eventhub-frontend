import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background-color border-b border-border-color">
      <div className="max-w-7xl mx-auto h-16 relative flex items-center px-half-spacing">
        <div className="absolute right-half-spacing flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="p-2 rounded-md text-text-color hover:text-link-color hover:bg-background-alt-color focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <HiX className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <HiMenu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="mx-auto md:mx-0">
          <Link to="/" className="flex items-center space-x-quarter-spacing">
  
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-link-color">
         <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
         <line x1="16" y1="2" x2="16" y2="6" />
         <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
         <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
        </svg>
            <span className="text-2xl font-bold text-link-color">EventHub</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4 absolute right-half-spacing">
          <Link
            to="/"
            className="text-text-color hover:text-link-color text-sm font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/events"
            className="text-text-color hover:text-link-color text-sm font-medium transition-colors duration-200"
          >
            Events
          </Link>
          {isAuthenticated && user.is_staff && (
            <Link
              to="/dashboard"
              className="text-text-color hover:text-link-color text-sm font-medium transition-colors duration-200"
            >
              Dashboard
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <span className="text-text-color text-sm">Hello, {user.name}</span>
              <button
                onClick={logout}
                className="px-3 py-1 bg-background-alt2-color text-background-color text-sm font-medium rounded-full shadow hover:bg-background-alt-color transition-colors duration-200 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 bg-link-color text-background-color text-sm font-medium rounded-full shadow hover:bg-opacity-90 transition-opacity duration-200 focus:outline-none"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-background-alt2-color text-background-color text-sm font-medium rounded-full shadow hover:bg-background-alt-color transition-colors duration-200 focus:outline-none"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background-color border-t border-border-color" id="mobile-menu">
          <div className="py-quarter-spacing px-half-spacing space-y-quarter-spacing text-center">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block text-text-color hover:text-link-color text-base font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/events"
              onClick={() => setIsOpen(false)}
              className="block text-text-color hover:text-link-color text-base font-medium transition-colors duration-200"
            >
              Events
            </Link>
            {isAuthenticated && user.is_staff && (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-text-color hover:text-link-color text-base font-medium transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <span className="block text-text-color text-base">
                  Hello, {user.name}
                </span>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full inline-block px-3 py-1 bg-background-alt2-color text-background-color text-base font-medium rounded-full shadow hover:bg-background-alt-color focus:outline-none transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-1 bg-link-color text-background-color text-base font-medium rounded-full shadow hover:bg-opacity-90 focus:outline-none transition-opacity duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-1 bg-background-alt2-color text-background-color text-base font-medium rounded-full shadow hover:bg-background-alt-color focus:outline-none transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
