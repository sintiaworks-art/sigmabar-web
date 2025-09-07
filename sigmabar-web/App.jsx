import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Products from './pages/Products.jsx'
import Clients from './pages/Clients.jsx'
import Orders from './pages/Orders.jsx'
import Reports from './pages/Reports.jsx'
import Navbar from './components/Navbar.jsx'
import Protected from './components/Protected.jsx'

export default function App(){
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route element={<Protected layout={<Navbar/>}/>}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/produtos" element={<Products/>} />
          <Route path="/clientes" element={<Clients/>} />
          <Route path="/comandas" element={<Orders/>} />
          <Route path="/relatorios" element={<Reports/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}
