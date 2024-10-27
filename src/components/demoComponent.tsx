import GenericTable from './genericTable';
import ActionButtons from './actionButtons';
// import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function UserTable() {

  const fetchUserData = async () => {
    const response = await fetch('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud');
    return response.json();
  };

  const handleDelete = async (userId: number) => {
    try {
      await axios.delete(`https://667d2474297972455f63aec9.mockapi.io/api/crud/crud/${userId}`);
    } catch (error) {
      console.error('Failed to delete user!', error);
    }
  };

  const columns = [
    {
      accessorKey: 'id',
      header: 'S.No',
      cell: ({row}) => {
        return row.index + 1;
      },
      enableColumnFilter: false,
      // filterFn: 'equals'
    },
    {
      accessorKey: 'name',
      header: 'Full Name',
      cell: ({getValue}) => {
        const value = getValue();
        return !value ? <span className='text-red-600'>Null</span> : <span className='text-green-500'>{value}</span>
      },
      // filterFn: 'includesString'
    },
    {
      accessorKey: 'email',
      header: 'Email',
      // filterFn: 'includesString'
    },
    {
      accessorKey: 'password',
      header: 'Password',
      cell: ({getValue}) => {
        const value = getValue();
        return !value ? <span className='bg-red-400'>Null</span> : <span className='text-yellow-500'>******</span>
      },
      enableSorting: false,
      enableColumnFilter: false
    },
    {
      header: 'Actions',
      enableSorting: false,
      enableColumnFilter: false,
      cell: ({row}) => {
        const userId = row.original.id;
        return (
          <ActionButtons userId={userId} onDelete={handleDelete}/>
        )
      }
    },
  ];

  return (
    <GenericTable
      columns={columns}
      fetchData={fetchUserData}
      pageSize={6}
      // data={data}
    />
  );
};

export default UserTable;
