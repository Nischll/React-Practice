import { useEffect, useState } from 'react';
import { useReactTable, getPaginationRowModel, getCoreRowModel, flexRender, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table';
// import {useQuery} from '@tanstack/react-query'
// import axios from 'axios';

function GenericTable({ fetchData, columns, pageSize }) {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  useEffect(() => {
    async function dataFetch() {
      try {
        const fetchedData = await fetchData();
        setData(fetchedData);
        setTotalItems(fetchedData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    dataFetch();
  }, [data]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination: {
        pageIndex,
        pageSize: pageSize
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div>
      <main className="relative flex flex-wrap justify-center w-full h-[450px] overflow-y-scroll mb-[15px] mt-8">
        <table className='relative h-fit w-full mx-6 border-x-2 border-indigo-800'>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className=' border-y-2 border-indigo-800 w-inherit'>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className='text-xl h-[50px] bg-slate-200 py-[5px] border-x-2 border-indigo-400'>
                    <div onClick={header.column.getToggleSortingHandler()} className='cursor-pointer'>
                      {flexRender(
                      header.column.columnDef.header, 
                      header.getContext()
                      )}
                      {header.column.getIsSorted() && { asc: '↑', desc: '↓' }[
                      header.column.getIsSorted() as 'asc' | 'desc'
                      ]}
                    </div>

                    {/* Filtering */}
                    {header.column.getCanFilter() && (
                      <div className='flex justify-center item-center my-[5px] h-[26px]'>
                        <input
                          type="text"
                          value={header.column.getFilterValue() ?? ''}
                          onChange={e => header.column.setFilterValue(e.target.value)}
                          placeholder='search here'
                          className='border border-slate-500 font-semibold text-base rounded-lg placeholder:text-sm placeholder:font-medium placeholder:text-center text-left px-2 w-[150px]'
                        />
                      </div>
                    )}
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
                    {flexRender(
                      cell.column.columnDef.cell, 
                      cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* PAGINATION */}
      <footer className='flex flex-wrap justify-between item-center text-center mx-6 my-4'>
        <div className='flex justify-center item-center p-[2px]'>
          <button
            onClick={() => {
              table.setPageIndex(0);
              setPageIndex(0);
            }}
            className='flex justify-center item-center text-base m-[6px] py-[5px] px-[6px] bg-slate-600 hover:bg-slate-500 active:bg-slate-700'>
            First Page
          </button>
          <button
            onClick={() => {
              setPageIndex(old => Math.max(old - 1, 0));
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            className='flex justify-center item-center m-[6px] py-[1px] px-[6px] p-[4px] cursor-pointer bg-slate-600 hover:bg-slate-500 active:bg-slate-700'>
            &lt;
          </button>
        </div>
        <span>Page {pageIndex + 1} of {Math.ceil(totalItems / pageSize)}</span>
        <div className='flex justify-center item-center p-[2px]'>
          <button
            onClick={() => {
              setPageIndex(old => old + 1);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            className='flex justify-center item-center m-[6px] py-[1px] px-[6px] p-[4px] bg-green-600 hover:bg-green-700 active:bg-green-800 cursor-pointer'>
            &gt;
          </button>
          <button
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
              setPageIndex(table.getPageCount() - 1);
            }}
            className='flex justify-center item-center text-base m-[6px] py-[5px] px-[6px] bg-green-600 hover:bg-green-700 active:bg-green-800'>
            Last Page
          </button>
        </div>
      </footer>
    </div>
  );
}

export default GenericTable;
