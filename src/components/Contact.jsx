import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { HiOutlineMail, HiOutlineUser, HiOutlineChat } from 'react-icons/hi';
import { IoMdSend } from 'react-icons/io';
import apiClient from '../api/apiClient';

const inputClasses = `
  w-full px-4 py-3 pl-12 
  bg-background-alt-color text-text-color
  border-2 border-transparent
  rounded-xl
  placeholder-text-alt-color
  focus:outline-none focus:border-link-color
  transition-all duration-300
`;

const textareaClasses = `
  w-full px-4 py-3 pl-12 
  bg-background-alt-color text-text-color
  border-2 border-transparent
  rounded-xl
  placeholder-text-alt-color
  focus:outline-none focus:border-link-color
  transition-all duration-300
  resize-none
`;

const buttonClasses = `
  w-full py-3.5 px-6
  flex items-center justify-center
  text-sm font-medium
  rounded-2xl
  transition-all duration-300
  focus:outline-none focus:ring-2 focus:ring-offset-2 
`;

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const mutation = useMutation({
    mutationFn: async ({ name, email, subject, message }) => {
      const response = await apiClient.post('/contact', { name, email, subject, message });
      return response.data;
    },
    onSuccess: () => {
      setSuccess('Your message has been sent successfully!');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    },
    onError: (error) => {
      setError(error.response?.data?.message || 'Failed to send your message. Please try again later.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    mutation.mutate({ name, email, subject, message });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background-color text-text-color">

      <main id="main-content" className="w-full max-w-4xl bg-background-alt-color/30 backdrop-blur-sm border border-border-color/20 rounded-3xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
          <p className="text-text-alt-color">
            We would love to hear from you! Whether you have a question, feedback, or need support, feel free to reach out.
          </p>
        </div>

        {success && (
          <div
            className="py-3 px-4 bg-green-500 bg-opacity-10 border border-green-500 rounded-xl"
            role="status"
            aria-live="polite"
          >
            <p className="text-green-500 text-sm">{success}</p>
          </div>
        )}

        {error && (
          <div
            className="py-3 px-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-xl"
            role="alert"
            aria-live="assertive"
          >
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="sr-only">Contact Form</h2>

          {/* Full Name Field */}
          <div className="relative">
            <label htmlFor="name" className="sr-only">Full Name</label>
            <HiOutlineUser className="absolute left-3.5 top-3.5 h-5 w-5 text-text-alt-color" aria-hidden="true" />
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClasses}
              required
              aria-required="true"
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">Email Address</label>
            <HiOutlineMail className="absolute left-3.5 top-3.5 h-5 w-5 text-text-alt-color" aria-hidden="true" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              required
              aria-required="true"
            />
          </div>

          <div className="relative">
            <label htmlFor="subject" className="sr-only">Subject</label>
            <HiOutlineChat className="absolute left-3.5 top-3.5 h-5 w-5 text-text-alt-color" aria-hidden="true" />
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={inputClasses}
              required
              aria-required="true"
            />
          </div>

          <div className="relative">
            <label htmlFor="message" className="sr-only">Your Message</label>
            <HiOutlineChat className="absolute left-3.5 top-3.5 h-5 w-5 text-text-alt-color" aria-hidden="true" />
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={textareaClasses}
              rows="6"
              required
              aria-required="true"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`${buttonClasses} bg-link-color text-white hover:bg-opacity-90 flex items-center justify-center`}
            aria-label="Send Message"
          >
            {mutation.isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true"></div>
                Sending...
              </div>
            ) : (
              <>
                <IoMdSend className="w-5 h-5 mr-2" aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
