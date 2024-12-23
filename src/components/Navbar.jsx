import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { HiMenu, HiX } from 'react-icons/hi';
import { IoHomeOutline, IoCalendarOutline, IoGridOutline, IoPersonCircleOutline } from 'react-icons/io5';

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (isOpen && event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-background-color/80 backdrop-blur-lg border-b border-border-alt-color"
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-link-color"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
              </svg>
              <span className="text-2xl font-bold bg-gradient-to-r from-link-color to-background-alt2-color bg-clip-text text-transparent">
                EventHub
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="flex items-center px-4 py-2 rounded-xl text-text-color hover:bg-background-alt-color transition-all duration-200"
            >
              <IoHomeOutline className="w-5 h-5 mr-3" aria-hidden="true" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/events"
              className="flex items-center px-4 py-2 rounded-xl text-text-color hover:bg-background-alt-color transition-all duration-200"
            >
              <IoCalendarOutline className="w-5 h-5 mr-3" aria-hidden="true" />
              <span className="font-medium">Events</span>
            </Link>

            {isAuthenticated && user.is_staff && (
              <Link
                to="/dashboard"
                className="flex items-center px-4 py-2 rounded-xl text-text-color hover:bg-background-alt-color transition-all duration-200"
              >
                <IoGridOutline className="w-5 h-5 mr-3" aria-hidden="true" />
                <span className="font-medium">Dashboard</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="flex items-center ml-4 space-x-4">
                <div
                  className="flex items-center space-x-2 px-3 py-1 rounded-xl bg-background-alt-color"
                  aria-label={`User: ${user.name}`}
                >
                  <IoPersonCircleOutline className="w-5 h-5 text-text-color" aria-hidden="true" />
                  <span className="text-sm font-medium text-text-color">{user.name}</span>
                </div>

                <button
                  onClick={logout}
                  className="px-4 py-2 bg-background-alt2-color text-text-color text-sm font-medium rounded-xl 
                           hover:bg-opacity-90 transition-all duration-200 shadow-lg shadow-background-alt2-color/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center ml-4 space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 bg-link-color text-background-color text-sm font-medium rounded-xl 
                           hover:bg-opacity-90 transition-all duration-200 shadow-lg shadow-link-color/20"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-background-alt2-color text-text-color text-sm font-medium rounded-xl 
                           hover:bg-opacity-90 transition-all duration-200 shadow-lg shadow-background-alt2-color/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-text-color hover:bg-background-alt-color transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-link-color"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              ref={menuButtonRef}
            >
              {isOpen ? (
                <HiX className="h-6 w-6" aria-hidden="true" />
              ) : (
                <HiMenu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden bg-background-color/95 backdrop-blur-lg border-t border-border-alt-color"
          role="menu"
          aria-label="Mobile Menu"
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 rounded-xl text-text-color hover:bg-background-alt-color transition-all duration-200"
              role="menuitem"
            >
              <IoHomeOutline className="w-5 h-5 mr-3" aria-hidden="true" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/events"
              onClick={() => setIsOpen(false)}
              className="flex items-center px-4 py-2 rounded-xl text-text-color hover:bg-background-alt-color transition-all duration-200"
              role="menuitem"
            >
              <IoCalendarOutline className="w-5 h-5 mr-3" aria-hidden="true" />
              <span className="font-medium">Events</span>
            </Link>

            {isAuthenticated && user.is_staff && (
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-2 rounded-xl text-text-color hover:bg-background-alt-color transition-all duration-200"
                role="menuitem"
              >
                <IoGridOutline className="w-5 h-5 mr-3" aria-hidden="true" />
                <span className="font-medium">Dashboard</span>
              </Link>
            )}

            {isAuthenticated ? (
              <div className="space-y-3 pt-2">
                <div
                  className="flex items-center px-4 py-2 rounded-xl bg-background-alt-color"
                  aria-label={`User: ${user.name}`}
                >
                  <IoPersonCircleOutline className="w-5 h-5 text-text-color mr-3" aria-hidden="true" />
                  <span className="text-text-color font-medium">{user.name}</span>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-background-alt2-color text-text-color font-medium rounded-xl 
                           hover:bg-opacity-90 transition-all duration-200 shadow-lg shadow-background-alt2-color/20"
                  role="menuitem"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 bg-link-color text-background-color font-medium rounded-xl 
                           text-center hover:bg-opacity-90 transition-all duration-200 shadow-lg shadow-link-color/20"
                  role="menuitem"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-2 bg-background-alt2-color text-text-color font-medium rounded-xl 
                           text-center hover:bg-opacity-90 transition-all duration-200 shadow-lg shadow-background-alt2-color/20"
                  role="menuitem"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
