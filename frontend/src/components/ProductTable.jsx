import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'react-data-grid/lib/styles.css';
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
      value={row[column.key] === null ? "" : row[column.key]}
      onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true)}
    />
  );
}





const OrderDetailsTable = () => {

const [data, setData] = useState([])
let { id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:3000/content/"+ id).then((response) => {
            setData(response.data)
            console.log(response.data)
        });
        }, [id]);
        const columns = [
            { key: 'id', name: 'ID' },
            { key: 'Код', name: 'Код' },
            { key: 'Наименование', name: 'Имя' },
            { key: 'weight', name: 'Заказано(шт/кг)' },
            { key: 'shipped', name: 'Отгружено', editor: textEditor }
          ];

          const handleClick = async () => {
            try {
            await axios.put('http://localhost:3000/content/' + id, data, {headers: {'Accept': 'application/json'}})
            } catch (error) {
               console.log(error) 
            }
            window.location.reload(false); // баг, убрал таким образом
        }
        return (
        <>
        <DataGrid 
            columns={columns} 
            rows={data} 
            onRowsChange={setData} 
            />
            <button onClick={handleClick}>
                Сохранить
            </button>
            </>)
}

export default OrderDetailsTable;