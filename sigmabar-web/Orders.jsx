import { useEffect, useMemo, useState } from 'react'
import { collection, addDoc, onSnapshot, doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function Orders(){
  const [clientes,setClientes] = useState([])
  const [produtos,setProdutos] = useState([])
  const [itens,setItens] = useState([])
  const [clienteId, setClienteId] = useState('')
  const [produtoId, setProdutoId] = useState('')
  const [qtd, setQtd] = useState(1)

  useEffect(()=>{
    const u1 = onSnapshot(collection(db,'clientes'), s=> setClientes(s.docs.map(d=>({id:d.id, ...d.data()}))))
    const u2 = onSnapshot(collection(db,'produtos'), s=> setProdutos(s.docs.map(d=>({id:d.id, ...d.data()}))))
    return ()=>{u1();u2()}
  },[])

  const total = useMemo(()=> itens.reduce((acc,i)=> acc + i.preco*i.qtd, 0), [itens])

  function addItem(){
    if(!produtoId || qtd<=0) return
    const p = produtos.find(p=>p.id===produtoId)
    setItens([...itens, {produtoId, nome:p.nome, preco:Number(p.preco), qtd:Number(qtd)}])
    setProdutoId(''); setQtd(1)
  }

  async function finalizar(){
    if(!clienteId || itens.length===0) return
    const comanda = {
      clienteId,
      itens,
      total,
      data: Date.now()
    }
    await addDoc(collection(db,'comandas'), comanda)
    // baixa estoque
    for(const item of itens){
      const p = produtos.find(p=>p.id===item.produtoId)
      if(p){
        await updateDoc(doc(db,'produtos', p.id), { estoque: Number(p.estoque||0) - Number(item.qtd) })
      }
    }
    setItens([])
    alert('Comanda finalizada!')
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Comandas</h2>
      <div className="bg-white rounded-xl shadow p-4 grid sm:grid-cols-4 gap-3">
        <select className="border rounded px-3 py-2" value={clienteId} onChange={e=>setClienteId(e.target.value)}>
          <option value="">Cliente</option>
          {clientes.map(c=> <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <select className="border rounded px-3 py-2" value={produtoId} onChange={e=>setProdutoId(e.target.value)}>
          <option value="">Produto</option>
          {produtos.map(p=> <option key={p.id} value={p.id}>{p.nome} — R$ {Number(p.preco).toFixed(2)}</option>)}
        </select>
        <input className="border rounded px-3 py-2" type="number" min="1" placeholder="Qtd" value={qtd} onChange={e=>setQtd(e.target.value)} />
        <button onClick={addItem} className="bg-brand-600 text-white rounded px-4 py-2">Adicionar</button>
      </div>

      <div className="mt-4 bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead><tr className="text-left">
            <th className="p-3">Produto</th><th className="p-3">Qtd</th><th className="p-3">Preço</th><th className="p-3">Total</th>
          </tr></thead>
          <tbody>
            {itens.map((i,idx)=> (
              <tr key={idx} className="border-t">
                <td className="p-3">{i.nome}</td>
                <td className="p-3">{i.qtd}</td>
                <td className="p-3">R$ {i.preco.toFixed(2)}</td>
                <td className="p-3">R$ {(i.preco*i.qtd).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-xl font-bold">Total: R$ {total.toFixed(2)}</div>
        <button onClick={finalizar} className="bg-brand-700 text-white rounded-xl px-5 py-2">Fechar Comanda</button>
      </div>
    </div>
  )
}
