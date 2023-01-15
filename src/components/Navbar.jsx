import { Link } from "react-router-dom";
  import { useSignOut } from 'react-auth-kit'

const SignInComponent = () => {
    const signOut = useSignOut()

const HandleClick = () => {
    signOut()
    window.location.reload();
}
    return (
      <a href="/login" onClick={HandleClick}>Выйти</a>
    )
}

const Navbar = () => {
    return ( 
    <nav className="nav">
        <Link className="site-title" to="/">
        Warehouse
        </Link>
        <ul>
    <Link to="/">Главная</Link>
    <Link to="/admin">Админ Панель</Link>
    <Link to="/rules">Правила работы</Link>
    <SignInComponent/>
        </ul>
    </nav>
)}

export default Navbar