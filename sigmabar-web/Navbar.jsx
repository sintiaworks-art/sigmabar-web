import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

export default function Navbar(){
  const navigate = useNavigate()
  async function logout(){
    await signOut(auth)
    navigate('/login')
  }
  return (
    <div>
      <nav className="bg-brand-700 text-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">🍹 SigmaBar</span>
            <span className="opacity-80 hidden sm:block">Web</span>
          </div>
          <div className="flex gap-4 text-sm">
            <Link to="/" className="hover:underline">Painel</Link>
            <Link to="/produtos" className="hover:underline">Produtos</Link>
            <Link to="/clientes" className="hover:underline">Clientes</Link>
            <Link to="/comandas" className="hover:underline">Comandas</Link>
            <Link to="/relatorios" className="hover:underline">Relatórios</Link>
            <button onClick={logout} className="bg-white/10 rounded px-3 py-1">Sair</button>
          </div>
        </div>
      </nav>
    </div>
  )
}
