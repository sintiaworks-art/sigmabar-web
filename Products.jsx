import { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Products(){
  const [items,setItems] = useState([])
  const [nome,setNome] = useState('')
  const [preco,setPreco] = useState('')
  const [estoque,setEstoque] = useState('')

  useEffect(()=>{
    const unsub = onSnapshot(collection(db,'produtos'), snap=>{
      setItems(snap.docs.map(d=>({id:d.id, ...d.data()})))
    })
    return ()=>unsub()
  },[])

  async function add(e){
    e.preventDefault()
    if(!nome || !preco) return
    await addDoc(collection(db,'produtos'), {
      nome, preco: Number(preco), estoque: Number(estoque||0), createdAt: Date.now()
    })
    setNome(''); setPreco(''); setEstoque('')
  }

  async function remove(id){
    if(confirm('Excluir este produto?')){
      await deleteDoc(doc(db,'produtos',id))
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Produtos</h2>
      <form onSubmit={add} className="bg-white rounded-xl shadow p-4 grid sm:grid-cols-4 gap-3">
        <input className="border rounded px-3 py-2" placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Preço" type="number" step="0.01" value={preco} onChange={e=>setPreco(e.target.value)} />
        <input className="border rounded px-3 py-2" placeholder="Estoque" type="number" value={estoque} onChange={e=>setEstoque(e.target.value)} />
        <button className="bg-brand-600 text-white rounded px-4 py-2">Adicionar</button>
      </form>

      <div className="mt-4 bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead><tr className="text-left">
            <th className="p-3">Nome</th><th className="p-3">Preço</th><th className="p-3">Estoque</th><th className="p-3">Ações</th>
          </tr></thead>
          <tbody>
            {items.map(i=> (
              <tr key={i.id} className="border-t">
                <td className="p-3">{i.nome}</td>
                <td className="p-3">R$ {Number(i.preco).toFixed(2)}</td>
                <td className="p-3">{i.estoque ?? 0}</td>
                <td className="p-3">
                  <button onClick={()=>remove(i.id)} className="text-red-600">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
