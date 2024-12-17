import EventForm from './EventForm'; 

const CreateEvent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
        <EventForm />
      </div>
    </div>
  );
};

export default CreateEvent;