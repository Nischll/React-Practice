import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
// import "../assets/style/demo.css";
import { useReactTable, getPaginationRowModel, getCoreRowModel, flexRender } from '@tanstack/react-table';

function Demo() {
  
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalItems, setTotalItems] = useState();
  const pageSize = 10;

  useEffect(() => {
      async function dataFetch () {
        try{
          const response = await fetch('https://667d2474297972455f63aec9.mockapi.io/api/crud/crud');
          // convert fetched data into json
          const convertedData = await response.json();
          // console.log("Fetched data for page", pageIndex + 1, convertedData);
          setData(convertedData);
          setTotalItems(convertedData.length);
        }catch(error) {
          console.error("Error fetching data:", error);
        }
      }
      dataFetch();     
  }, []);//Dependency
  

  const columns = [
    // columnHelper:accessor(row => row.name,{
    //   header:() => <h2>Full Name</h2>
    // })
    {
      accessorKey: 'id',
      header: 'S.no',
      cell: ({row}) => {
        return row.index + 1;
      }
    },
    {
      accessorKey: 'name',
      header: 'Full Name',
      cell: ({getValue}) => {
        const value = getValue();
        return !value ? <span className='text-red-600'>Null</span> : <span className='text-green-500'>{value}</span>
      }
    },
    {
      accessorKey: 'email',
      header: 'Email'
    },
    {
      accessorKey: 'password',
      header: 'Password',
      cell: ({getValue}) => {
        const value = getValue();
        return !value ? <span className='bg-red-400'>Null</span> : <span className='text-yellow-500'>******</span>
      }
    },
    // {
    //   header:'Actions'
    // }
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
      {/* <Link to="/components/nextDemo">
        <button>Click me</button>
      </Link> */}

      <main className="relative flex flex-wrap justify-center w-full h-[450px] overflow-y-scroll mb-[15px] mt-8"> 
        <table className='relative h-fit w-full border-collapse'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className=' border-b-2 border-indigo-800 w-inherit'>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='text-xl w-[100px] h-[50px] bg-slate-200'>
                    {/* {typeof header.column.columnDef.header === 'function'
                    ? header.column.columnDef.header()
                    : header.column.columnDef.header} */}
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext())
                    }
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
                    {/* {typeof cell.column.columnDef.cell === 'function'
                    ? cell.column.columnDef.cell(cell.getContext())
                    : cell.getValue()} */}
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      
      {/* PAGINATION */}
      <div className='flex flex-wrap justify-between item-center text-center'>
        <button onClick={() => 
          {
            setPageIndex(old => Math.max(old - 1, 0))
            table.previousPage(); 
          }
          } disabled={!table.getCanPreviousPage()} className='bg-slate-600 hover:bg-slate-500 active:bg-slate-700 px-[10px] py-[2px]'>
        &lt; Previous
        </button>
        <span>Page { pageIndex + 1 } of {Math.ceil(totalItems / pageSize)}</span>
        <button onClick={() =>
          {
            setPageIndex(old => old + 1)
            table.nextPage();
          }
        }disabled={!table.getCanNextPage()} className='bg-lime-500 hover:bg-lime-600 active:bg-lime-700 px-[25px]'>
        Next &gt; 
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