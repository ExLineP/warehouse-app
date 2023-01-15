import { useState } from "react";
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"
import { useCallback } from "react";



const Table = () => {
    const [products, setProducts] = useState([]);
      useEffect(() => {
        axios.get("http://192.168.50.187:3000/orders").then((response) => {
          setProducts(response.data)
        });
        }, []);
      let navigate = useNavigate()
  const CellClickedListener = useCallback( e =>{
    navigate('products/' + e.data.id)
  })
        const columnDefs = [
            {headerName: "id", field: "id", sortable: true},
            {headerName: "Дата", field: "created_at", sortable: true},
            {headerName: "Контрагент", field: "contractor", sortable: true},
            {headerName: "Торговая точка", field: "sellingpoint", sortable: true},
            {headerName: "Тип Заказа", field: "type", sortable: true},
            {headerName: "Статус", field: "status", sortable: true}]
    return (
        <div className="ag-theme-alpine" style={{width:1210, height:800}}>
            <AgGridReact
            onRowClicked={CellClickedListener}
            rowData = {products}
            columnDefs = {columnDefs}/>
        </div>
    )
    }    
export default Table;