import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import BillPage from './pages/BillPage';
import CustomerPages from './pages/CustomersPage'
import StatisticPage from './pages/StatisticPage'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ProductPage from './pages/ProductPage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
function App() {
  const cart = useSelector((state) => state.cart)

  useEffect(()=> {
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart])
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RouteControl><HomePage/></RouteControl>}>       
      </Route>
      <Route path="/cart" element={<RouteControl><CartPage/></RouteControl>}> 
      </Route>
      <Route path="/bills" element={<RouteControl><BillPage/></RouteControl>}></Route>
      <Route path="/customers" element={<RouteControl><CustomerPages/></RouteControl> }></Route>
      <Route path="/statistic" element={<RouteControl><StatisticPage/></RouteControl>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/products" element={<RouteControl><ProductPage/></RouteControl>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({children}) => {
  if(localStorage.getItem("posUser")){
    return children
  }else{
    return <Navigate to="/login"/>
  }
}
