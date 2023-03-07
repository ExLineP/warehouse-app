import { useNavigate } from "react-router-dom"
import Table from "../components/Table"
const Home = () => {
    const navigate = useNavigate();
    return (
    <div>

     <button onClick={() => navigate('/create')} className="mb-2 ml-3 m-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg border-none" type="button">
     Новый заказ
     </button>

    <Table />
    </div>
)}
export default Home