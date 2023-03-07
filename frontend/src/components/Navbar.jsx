import { Link } from "react-router-dom";
  import { useSignOut } from 'react-auth-kit'



const Navbar = () => {
    const signOut = useSignOut()
    const HandleClick = () => {
        signOut()
        window.location.reload();
    }
    return ( 
        <div className="w-[calc(100%+24px)]">
    <nav className="pb-4 font-sans bg-blue-500 text-white p-0 justify-between items-stretch gap-8">
        <Link  className="no-underline h-full flex items-center p-1 text-inherit text-3xl" to="/">
        Warehouse
        </Link>
        <ul className="p-0 m-0 flex gap-2 list-none">
    <Link className="no-underline h-full flex items-center p-1 text-inherit" to="/">Главная</Link>
    <Link className="no-underline h-full flex items-center p-1 text-inherit" to="/admin">Админ Панель</Link>
    <Link className="no-underline h-full flex items-center p-1 text-inherit" to="/rules">Правила работы</Link>
    <Link className="no-underline h-full flex items-center p-1 text-inherit" to="/login" onClick={HandleClick}>Выйти</Link>
        </ul>
    </nav>
    </div>
)}

export default Navbar