import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
// import "../assets/style/demo.css";
import { useReactTable, getPaginationRowModel, getCoreRowModel } from '@tanstack/react-table';



function Demo() {
  
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
      async function dataFetch () {
        try{
          const response = await fetch(`https://667d2474297972455f63aec9.mockapi.io/api/crud/crud?page=${pageIndex + 1}&limit=${pageSize}`);
          // covert fetched data into json
          const convertedData = await response.json();
          // console.log("Fetched data for page", pageIndex + 1, convertedData);
          setData(convertedData);
        }catch(error) {
          console.error("Error fetching data:", error);
        }
      }
      dataFetch();
  }, [pageIndex, pageSize]);//Dependency

  const columns = [
    // columnHelper:accessor(row => row.name,{
    //   header:() => <h2>Full Name</h2>
    // })
    {
      accessorKey: 'id',
      header: 'ID No:'
    },
    {
      accessorKey: 'name',
      header: 'Full Name'
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'password',
      header: 'Password'
    }
  ];
  
  // TABLE HERE
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });  

  return (
    <div>
      <Link to="/components/nextDemo">
        <button>Click me</button>
      </Link>

      <main className="relative flex justify-center  w-full h-[450px] overflow-y-scroll mb-[15px] mt-2"> 
        <table className='relative h-fit w-full border-collapse'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className=' border-b-2 border-indigo-800'>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='text-xl'>
                    {typeof header.column.columnDef.header === 'function'
                    ? header.column.columnDef.header()
                    : header.column.columnDef.header}
                </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className=" border-b-2 border-indigo-800 even:bg-[#D6EEEE]">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-[30px] py-[10px]">
                    {typeof cell.column.columnDef.cell === 'function'
                    ? cell.column.columnDef.cell(cell.getContext())
                    : cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <div className='flex flex-wrap justify-between item-center '>
        <button onClick={() => setPageIndex(old => Math.max(old - 1, 0))} disabled={pageIndex === 0} className='hover:bg-sky-500 active:bg-sky-700 px-[20px] py-[2px]'>
        &lArr;
        </button>
        <p>Page {pageIndex + 1} of {pageIndex}</p>
        <button onClick={() => setPageIndex(old => old + 1)} disabled={table.getRowModel().rows.length < pageSize}  className='hover:bg-sky-500 active:bg-sky-700'>
        &rArr; 
        </button>
      </div>
      

      {/* FETCHED DATA LIST */}

      {/* <div className='list'>
        <div className='nameList'>
          <h2>User's Name List</h2>
          <ol>
            {data.map(user =><li key={user.id}>{user.name}</li>)}
          </ol>
        </div>

        <div className='emailList'>
          <h2>User's Email List</h2>
          <ol>
            {data.map(user =><li key={user.id}>{user.email}</li>)}
          </ol>
        </div>
      </div> */}
    </div>
  );
}
 export default Demo;