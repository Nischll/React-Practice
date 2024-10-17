import GenericTable from './genericTable';

const fetchUserData = async () => {
  const response = await fetch('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud');
  return await response.json();
};

const UserTable = () => {
  const columns = [
    {
      accessorKey: 'id',
      header: 'S.no',
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
  ];

  return (
    <GenericTable
      columns={columns}
      fetchData={fetchUserData}
      pageSize={10}
    />
  );
};

export default UserTable;
