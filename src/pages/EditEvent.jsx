import EventForm from './EventForm';
import { useParams } from 'react-router-dom';

const EditEvent = () => {
  const { id } = useParams(); 

  return (
        <EventForm eventId={id} />
  );
};

export default EditEvent;
