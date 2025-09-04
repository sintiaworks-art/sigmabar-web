import { Outlet, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useEffect, useState } from 'react'

export default function Protected({ layout }){
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, u=>{
      setUser(u)
      setLoading(false)
    })
    return ()=>unsub()
  },[])
  if(loading) return <div className="p-6">Carregando...</div>
  if(!user) return <Navigate to="/login" />
  return (
    <div>
      {layout}
      <div className="max-w-6xl mx-auto p-4">
        <Outlet/>
      </div>
    </div>
  )
}
