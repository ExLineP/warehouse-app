import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
      value={row[column.key]}
      onChange={(event) => onRowChange({ ...row, [column.key]: event.target.value })}
      onBlur={() => onClose(true)}
    />
  );
}





const OrderDetailsTable = () => {

const [data, setData] = useState([])
let { id } = useParams();
    useEffect(() => {
        axios.get("http://192.168.50.187:3000/content/"+ id).then((response) => {
            setData(response.data)
        });
        }, [id]);
        const columns = [
            { key: 'id', name: 'ID' },
            { key: 'code', name: 'Код' },
            { key: 'name', name: 'Имя', editor: textEditor },
            { key: 'type', name: 'Тип' },
            { key: 'ordered', name: 'Заказано' },
            { key: 'shipped', name: 'Отгружено', editor: textEditor }
          ];

          const handleClick = async () => {
            try {
            await axios.put('http://192.168.50.187:3000/content/' + id, data, {headers: {'Accept': 'application/json'}})
            } catch (error) {
               console.log(error) 
            }
            window.location.reload(false);
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