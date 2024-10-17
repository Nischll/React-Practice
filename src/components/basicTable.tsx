import { useEffect, useState } from 'react';
import { useReactTable, getPaginationRowModel, getCoreRowModel, flexRender, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';

function BasicTable() {
  
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalItems, setTotalItems] = useState();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
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
    {
      accessorKey: 'id',
      header: 'ID',
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
  
  // TABLE HERE
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state:{
      // pagination:{
      //   pageIndex:0, 
      //   pageSize:15
      // },
      sorting : sorting,
      // globalFilter: filtering,
      columnFilters : columnFilters,
    },
    onSortingChange: setSorting,
    // onFilterChange: setFiltering,
    onColumnFiltersChange: setColumnFilters,
  });  

  return (
    <div>
      <main className="relative flex flex-wrap justify-center w-full h-[450px] overflow-y-scroll mb-[15px] mt-8 "> 
        <table className='relative h-fit w-full mx-6 border-x-2 border-indigo-800'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className=' border-y-2 border-indigo-800 w-inherit'>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='text-xl h-[50px] bg-slate-200 py-[5px] border-x-2 border-indigo-400'>
                    {/* {typeof header.column.columnDef.header === 'function'
                    ? header.column.columnDef.header()
                    : header.column.columnDef.header} */}
                    <div onClick={header.column.getToggleSortingHandler()} className='cursor-pointer '>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext())
                      }
                      {
                        header.column.getIsSorted() && { asc: '↑', desc: '↓' }[
                          header.column.getIsSorted() as 'asc' | 'desc'
                        ]
                      }
                    </div>

                    {/* Filtering */}
                    {header.column.getCanFilter() ? (
                      <div className='flex justify-center item-center my-[5px] h-[26px]'>
                        <input type="text" 
                        value={header.column.getFilterValue() ?? ''} 
                        onChange={e => header.column.setFilterValue(e.target.value)} 
                        placeholder='search here' 
                        className='border border-slate-500 font-semibold text-base rounded-lg placeholder:text-sm placeholder:font-medium placeholder:text-center text-left px-2 w-[150px]'/>
                      </div>
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className=" border-b-2 border-indigo-800 even:bg-[#D6EEEE]">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-[30px] py-[10px] border-x-2 border-indigo-400">
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
      <footer className='flex flex-wrap justify-between item-center text-center mx-6 my-4'>
        <div className='flex justify-center item-center gap-[4px] p-[2px]'>
          {/* First Page */}
          <button onClick={() => 
            {
              table.setPageIndex(0);
              setPageIndex(0);
            }
            } className='flex justify-center item-center text-base m-[6px] py-[5px] px-[6px] bg-slate-600 hover:bg-slate-500 active:bg-slate-700'>
            First Page
          </button>

          {/* Previous Button */}
          <button onClick={() => 
            {
              setPageIndex(old => Math.max(old - 1, 0));
              table.previousPage(); 
            }
            } disabled={!table.getCanPreviousPage()} className='flex justify-center item-center m-[6px] py-[1px] px-[6px] p-[4px] cursor-pointer bg-slate-600 hover:bg-slate-500 active:bg-slate-700'>
            &lt;
          </button>
        </div>
        
        <span>Page { pageIndex + 1 } of {Math.ceil(totalItems / pageSize)}</span>

        <div className='flex justify-center item-center gap-[4px] p-[2px]'>
          {/* Next Button */}
          <button onClick={() =>
            {
              setPageIndex(old => old + 1)
              table.nextPage();
            }
            }disabled={!table.getCanNextPage()} className='flex justify-center item-center m-[6px] py-[1px] px-[6px] p-[4px] bg-green-600 hover:bg-green-700 active:bg-green-800'>
            &gt; 
          </button>

          {/* Last Page */}
          <button onClick={() => 
            {
              table.setPageIndex(table.getPageCount() - 1);
              setPageIndex(table.getPageCount() - 1);
            }
            } className='flex justify-center item-center text-base m-[6px] py-[5px] px-[6px] bg-green-600 hover:bg-green-700 active:bg-green-800'>
            Last Page
          </button>
        </div>
      </footer>
    </div>
  );
}
 export default BasicTable;