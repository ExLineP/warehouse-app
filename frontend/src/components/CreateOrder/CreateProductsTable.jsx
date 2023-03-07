import React, { useState, useEffect } from 'react';

const CreateProductsTable = ({ tableData, setTableData }) => {
  let formatedData = tableData.map(row => row.original);
  console.log(tableData)
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(formatedData);
  }, [tableData]);

  const columns = [
    { key: 'Код', name: 'Код' },
    { key: 'Наименование', name: 'Имя' },
    { key: 'quantity', name: 'Кол-во'},
    { key: 'actions', name: 'Actions'}
  ];

  const handleQuantityChange = (e, index) => {
    const updatedData = [...data];
    updatedData[index].quantity = e.target.value;
    setData(updatedData);
  };

  const handleDelete = (index) => {

    const ModalData = [...tableData]
    ModalData.splice(index, 1);
    setTableData(ModalData)

    console.log(index)
  };

  return (
    <table className="table-auto w-full text-left">
      <thead>
        <tr className="bg-gray-900 text-white">
          {columns.map(column => (
            <th key={column.key} className="px-4 py-2">
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.key} className="text-gray-700">
            <td className="border px-4 py-2">{row.Код}</td>
            <td className="border px-4 py-2">{row.Наименование}</td>
            <td className="border px-4 py-2">
              <input
                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                type="number"
                value={row.quantity}
                onChange={e => handleQuantityChange(e, index)}
              />
            </td>
            <td className="border px-4 py-2">
              <button type='button'
                className="bg-red-500 hover:bg-red-700 border-none text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(index)}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CreateProductsTable;
