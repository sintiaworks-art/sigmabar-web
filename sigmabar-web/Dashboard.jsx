import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'

export default function Dashboard(){
  const [stats, setStats] = useState({ produtos:0, clientes:0, comandasHoje:0 })

  useEffect(()=>{
    async function load(){
      const prodSnap = await getCountFromServer(collection(db,'produtos'))
      const cliSnap = await getCountFromServer(collection(db,'clientes'))
      const hoje = new Date(); hoje.setHours(0,0,0,0)
      const q = query(collection(db,'comandas'), where('data','>=', hoje.getTime()))
      const comSnap = await getCountFromServer(q)
      setStats({ produtos: prodSnap.data().count, clientes: cliSnap.data().count, comandasHoje: comSnap.data().count })
    }
    load().catch(()=>{})
  },[])

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card title="Produtos" value={stats.produtos} />
      <Card title="Clientes" value={stats.clientes} />
      <Card title="Comandas hoje" value={stats.comandasHoje} />
    </div>
  )
}

function Card({title, value}){
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="text-slate-500 text-sm">{title}</div>
      <div className="text-3xl font-bold mt-1">{value}</div>
    </div>
  )
}
