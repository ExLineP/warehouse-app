import React from 'react'
import { Checkbox } from './CheckProduct'
import { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import LoadingIcon from '../LoadingComponent'


const COLUMNS = [
  {
    Header: 'Код',
    Footer: 'Код',
    accessor: 'Код',
    sticky: 'left'
  },
  {
    Header: 'Наименование',
    Footer: 'Наименование',
    accessor: 'Наименование',
    sticky: 'left'
  }
]


function Modal({closeModal, setTableData, tableData}) {
  const [loading, setLoading] = useState(true);
  const [retrievedData, setRetrievedData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const unique = [...new Set(retrievedData.map(item => item.Категория))];
  useEffect(() => {
    axios.get("http://192.168.50.187:3000/products").then((response) => {
      setFilteredData(response.data)
      setRetrievedData(response.data)
    });
    setTimeout(() => {
      setLoading(false);
    }, 200);
    }, []);

    const filteredDataFunc = (query) => {
    if (query === "Все") {
      setFilteredData(retrievedData)
    }
    else {
    setFilteredData(retrievedData.filter(product => {
    return product.Категория === query;
  }))}}
  
  const handleChange = event  => {
    filteredDataFunc(event.target.value)
  }
  
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => filteredData, [filteredData])
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows
  } = useTable(
    {
      columns,
      data
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />
        },
        ...columns
      ])
    }
  )
  
  return (
    <>
    {loading ? (
        <LoadingIcon />
      ) : (
    <div className="p-2">
      <div className="items-center mb-3">
        <select onChange={handleChange} className="mr-auto mb-3 mt-2 border border-gray-300 rounded-lg p-2 w-60">
          <option value="" disabled selected hidden>Фильтр</option>
          <option value="Все">Все</option>
          {unique.map((val) => {
            return <option key={val} value={val}>{val} 
                   </option>;
          })}
        </select>
        <button className="btn-blue ml-auto bg-red-500 hover:bg-red-600 text-white border-none font-bold py-2 px-4 rounded" type='button' onClick={() =>{ 
          setTableData([...tableData, ...selectedFlatRows])
          closeModal(false)}}>X</button>
      </div>
      <div className='grid h-screen place-items-center'>
      <table className="lg:w-3/4 table-auto text-left" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr className="bg-gray-100" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="px-4 py-2" {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr className="hover:bg-gray-200" {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td className="border px-4 py-2 text-base" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </div>
      )}
    </>
  )
}

export default Modal