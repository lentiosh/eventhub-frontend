import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEvent } from '../api/eventApi';

// eslint-disable-next-line react/prop-types
const DeleteEvent = ({ eventId }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
    },
    onError: (error) => {
      alert(error.response?.data?.message || 'Failed to delete event');
    },
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteMutation.mutate(eventId);
    }
  };

  return (
    <button onClick={handleDelete} disabled={deleteMutation.isLoading}>
      {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteEvent;
