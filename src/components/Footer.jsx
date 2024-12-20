import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IoCalendarOutline } from 'react-icons/io5';

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  ];

  const navLinks = [
    { to: '/events', label: 'Events' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy Policy' },
  ];

  return (
    <footer className="relative bg-background-color border-t border-border-color/10">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-link-color/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-background-alt2-color/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between items-center space-y-8 md:space-y-0">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="p-2 rounded-xl bg-background-alt-color/30 backdrop-blur-sm 
                          group-hover:bg-background-alt-color/50 transition-all duration-300">
              <IoCalendarOutline className="h-6 w-6 text-link-color" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-link-color to-background-alt2-color 
                           bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-text-alt-color hover:text-link-color transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-xl bg-background-alt-color/30 backdrop-blur-sm 
                           hover:bg-background-alt-color/50 text-text-alt-color hover:text-link-color 
                           transition-all duration-300 transform hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 w-full max-w-3xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-border-color/20 to-transparent"></div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-alt-color">
            &copy; {new Date().getFullYear()} EventHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;