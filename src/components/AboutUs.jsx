import { Link } from 'react-router-dom';
import { IoCalendarOutline, IoPeopleOutline, IoRocketOutline } from 'react-icons/io5';

const AboutUs = () => {

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-background-color text-text-color px-6 py-12">
      <section className="w-full max-w-5xl bg-background-alt-color/30 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">About EventHub</h1>
          <p className="text-lg text-text-alt-color mb-6">
            EventHub is your ultimate platform to discover, create, and manage events seamlessly. Whether you are hosting a small gathering or a large conference, EventHub provides all the tools you need to make your event a success.
          </p>
          <Link to="/register">
            <button className="inline-flex items-center px-6 py-3 bg-link-color text-white font-semibold rounded-2xl shadow-lg hover:shadow-link-color/40 transition-all duration-200">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      <section className="w-full max-w-5xl bg-background-alt-color/30 backdrop-blur-sm rounded-3xl shadow-xl p-12 mb-12">
        <h2 className="text-3xl font-semibold text-text-color mb-8 text-center">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="flex flex-col items-center text-center">
            <IoCalendarOutline className="w-12 h-12 text-link-color mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-semibold mb-2">Easy Event Management</h3>
            <p className="text-text-alt-color">
              Create, organize, and manage your events with just a few clicks. Our intuitive interface makes event planning a breeze.
            </p>
          </div>


          <div className="flex flex-col items-center text-center">
            <IoRocketOutline className="w-12 h-12 text-link-color mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-semibold mb-2">Seamless Integration</h3>
            <p className="text-text-alt-color">
              Integrate your events with Google Calendar effortlessly. Keep track of all your events in one place without any hassle.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <IoPeopleOutline className="w-12 h-12 text-link-color mb-4" aria-hidden="true" />
            <h3 className="text-2xl font-semibold mb-2">Community Engagement</h3>
            <p className="text-text-alt-color">
              Connect with a community of event enthusiasts. Share your events, get feedback, and engage with your audience like never before.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
