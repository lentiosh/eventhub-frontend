import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-background-color text-text-color border-t border-border-color py-spacing">
      <div className="max-w-7xl mx-auto px-spacing flex flex-col md:flex-row md:justify-between items-center space-y-4 md:space-y-0">
        <div>
          <Link to="/" className="text-2xl font-bold hover:text-link-color transition-colors">
            EventHub
          </Link>
        </div>
        <nav className="flex space-x-half-spacing">
          <Link to="/events" className="hover:text-link-color transition-colors">
            Events
          </Link>
          <Link to="/about" className="hover:text-link-color transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-link-color transition-colors">
            Contact
          </Link>
          <Link to="/faq" className="hover:text-link-color transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex space-x-half-spacing">
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-link-color transition-colors">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-link-color transition-colors">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-link-color transition-colors">
            <FaInstagram size={20} />
          </a>
        </div>
      </div>

      <div className="mt-double-spacing text-center text-sm">
        &copy; {new Date().getFullYear()} EventHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
