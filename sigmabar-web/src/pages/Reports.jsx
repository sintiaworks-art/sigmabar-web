import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function Reports(){
  const [comandas, setComandas] = useState([])

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'comandas'), snap=>{
      setComandas(snap.docs.map(d=>({id:d.id, ...d.data()})).sort((a,b)=>b.data-a.data))
    })
    return ()=>unsub()
  },[])

  const totalGeral = comandas.reduce((acc,c)=> acc + Number(c.total||0), 0)

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Relatórios</h2>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead><tr className="text-left">
            <th className="p-3">Data</th><th className="p-3">Cliente</th><th className="p-3">Itens</th><th className="p-3">Total</th>
          </tr></thead>
          <tbody>
            {comandas.map(c=> (
              <tr key={c.id} className="border-t">
                <td className="p-3">{new Date(c.data).toLocaleString()}</td>
                <td className="p-3">{c.clienteId}</td>
                <td className="p-3">{c.itens?.length||0}</td>
                <td className="p-3">R$ {Number(c.total||0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right text-xl font-bold">Total geral: R$ {totalGeral.toFixed(2)}</div>
    </div>
  )
}
