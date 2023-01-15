import { Link, useNavigate } from "react-router-dom"
import Table from "../components/Table"
const Home = () => {
    const navigate = useNavigate();
    return (
    <>

     <button onClick={() => navigate('/create')} className="NewOrderButton" type="button">
     Новый заказ
     </button>

    <Table />
    </>
)}
export default Home