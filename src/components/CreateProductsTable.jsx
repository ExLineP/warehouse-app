import { useState } from "react";
import DataGrid from 'react-data-grid';


function autoFocusAndSelect(input) {
  input?.focus();
  input?.select();
}

function textEditor({
  row,
  column,
  onRowChange,
  onClose
}) {
  return (
    <input
      ref={autoFocusAndSelect}
      value={row[column.key]}
      onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true)}
    />
  );
}

const CreateProductsTable = ({tableData}) => {

const [data, setData] = useState([])

const columns = [
    { key: 'code', name: 'Код' },
    { key: 'name', name: 'Имя'},
    { key: 'quantity', name: 'Кол-во', textEditor},
  ];

  return (
    <>
        <DataGrid 
            columns={columns} 
            rows={data} 
            onRowsChange={setData} 
            />
    </>
)}
export default CreateProductsTable;