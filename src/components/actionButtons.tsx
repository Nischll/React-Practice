import { Link } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';

const ActionButtons = ({ userId, onDelete }) => {
  const confirm = useConfirm();

  const handleDelete = async () => {
    try {
      await confirm({
        title: 'Are you sure?',
        description: 'You are going to delete this user!!',
        confirmationText: 'Delete now',
        cancellationText: 'Not now',  
        dialogProps: {
          maxWidth: 'xs',
        },
      });
      await onDelete(userId);
      toast.success('User deleted successfully!', {autoClose:2000});
    } catch (error) {
      console.error('Failed to delete!!', error);
      toast.error('Failed to delete user!', {autoClose:2000});
    }
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        className='text-[0.9rem] px-[12px] py-[8px] mr-[10px] bg-red-600 text-white-600 active:bg-red-900 hover:bg-red-700'>
        Delete
      </button>
      <Link to={`/components/editDetails/${userId}`}>
        <button className='text-[0.9rem] px-[16px] py-[8px] bg-green-600 text-white-600 active:bg-green-900 hover:bg-green-700'>
          Edit
        </button>
      </Link>
    </div>
  );
};

export default ActionButtons;
