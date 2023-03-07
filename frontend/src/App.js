import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Table from './components/Table';
import Home from './pages/Home';
import Rules from './pages/Rules';
import Admin from './pages/Admin';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { BrowserRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Details from './components/Detail';
import Order from './pages/Order';
import { Login } from './pages/Login';
import NavbarLayout from './components/NavbarLayout';
import "bootstrap/dist/css/bootstrap.min.css"
import CreateForm from './components/CreateOrder/CreateForm';


function App() {
  var [isNavbarHidden, setIsNavbarHidden] = useState(true);
  return (
<div>
<AuthProvider
 authType = {'cookie'}
authName={'_auth'}
cookieDomain={window.location.hostname}
cookieSecure={false}
>
  <BrowserRouter>
    <Routes>

    <Route element={isNavbarHidden && <NavbarLayout closeNavbar = {setIsNavbarHidden}/>}>
      
    <Route path={'/'} element={
        <RequireAuth loginPath={'/login'}>
          <Home/>
        </RequireAuth>}/>

    <Route path="/rules" element={
      <RequireAuth loginPath={'/login'}>
    <Rules/>
    </RequireAuth>}/>

    <Route path="/admin" element={
    <RequireAuth loginPath={'/login'}>
    <Admin/>
    </RequireAuth>}/>

    <Route path="/products/:id" element={
    <RequireAuth loginPath={'/login'}>
    <Order />
    </RequireAuth>}/>

    <Route path="/create" element={
    <RequireAuth loginPath={'/login'}>
    <CreateForm />
    </RequireAuth>}/>

    
    </Route>

    <Route path = "/login" element={<Login/>} />
    
    </Routes>
  </BrowserRouter>
  </AuthProvider>
  </div>
  );
}
export default App;

