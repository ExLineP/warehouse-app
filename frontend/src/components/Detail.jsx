import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



const Details = () => {
    let { id } = useParams();
    const [orders, setOrder] = useState([]);
    const [orderContent, setOrderContent] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:3000/orders/" + id ).then((response) => {
        setOrder(response.data)
      });
      axios.get("http://localhost:3000/content/" + id ).then((response) => {
        setOrderContent(response.data)
      });
      }, [id]);
  return (
    <table className="table">
<thead>
    <tr>
        <th>ID</th>
        <th>Контрагент</th>
        <th>Торговая точка</th>
        <th>Тип заказа</th>
    </tr>
    {orderContent.map((item) => (
      <tr key={item.id}>
    <td>{item.order_id}</td>
    <td>{item.contractor}</td>
    <td>{item.sellingpoint}</td>
    <td>{item.type}</td>
  </tr>
    ))}
</thead>
</table>
)}
export default Details;