import { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Clients(){
  const [items,setItems] = useState([])
  const [nome,setNome] = useState('')
  const [contato,setContato] = useState('')

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'clientes'), snap=>{
      setItems(snap.docs.map(d=>({id:d.id, ...d.data()})))
    })
    return ()=>unsub()
  },[])

  async function add(e){
    e.preventDefault()
    if(!nome) return
    await addDoc(collection(db,'clientes'), { nome, contato, createdAt: Date.now() })
    setNome(''); setContato('')
  }

  async function remove(id){
    if(confirm('Excluir este cliente?')) await deleteDoc(doc(db,'clientes',id))
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Clientes</h2>
      <form onSubmit={add} className="bg-white rounded-xl shadow p-4 grid sm:grid-cols-3 gap-3">
        <input className="border rounded px-3 py-2" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Contato" value={contato} onChange={e=>setContato(e.target.value)} />
        <button className="bg-brand-600 text-white rounded px-4 py-2">Adicionar</button>
      </form>

      <div className="mt-4 bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead><tr className="text-left">
            <th className="p-3">Nome</th><th className="p-3">Contato</th><th className="p-3">Ações</th>
          </tr></thead>
          <tbody>
            {items.map(i=> (
              <tr key={i.id} className="border-t">
                <td className="p-3">{i.nome}</td>
                <td className="p-3">{i.contato}</td>
                <td className="p-3"><button onClick={()=>remove(i.id)} className="text-red-600">Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
