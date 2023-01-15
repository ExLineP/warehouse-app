import React from 'react'
import { Checkbox } from './CheckProduct'
import { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import { format } from 'date-fns'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'


const COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
    sticky: 'left'
  },
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
  },
  {
    Header: 'Категория',
    Footer: 'Категория',
    accessor: 'Категория',
  },
  {
    Header: 'Единица_измерения',
    Footer: 'Единица_измерения',
    accessor: 'Единица_измерения'
  },
]


function Modal({closeModal, setTableData}) {
  const [retrievedData, setRetrievedData] = useState([])
  useEffect(() => {
    axios.get("http://192.168.50.187:3000/products").then((response) => {
      setRetrievedData(response.data)
    });
    }, []);

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => retrievedData, [retrievedData])
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
  useEffect(() => {
    setTableData(...selectedFlatRows)
  })
  return (
    <div className=''>
        <div className='flex'>
        <button className='ml-auto mr-3 mb-3 mt-2' type='button' onClick={() => closeModal(false)}>X</button>
        </div>
        <div>
        <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedFlatRows: selectedFlatRows.map(row => row.original)
            },
            null,
            2
          )}
        </code>
      </pre>
        
        </div>
        
    </div>
  )
}

export default Modal