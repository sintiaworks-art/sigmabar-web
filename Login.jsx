import { useState } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

export default function Login(){
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')

  async function submit(e){
    e.preventDefault()
    setError('')
    try {
      if(mode==='login'){
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      window.location.href = '/'
    } catch(err){
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-600 to-brand-800 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-2 text-brand-800 text-center">SigmaBar Web</h1>
        <p className="text-center text-sm text-slate-500 mb-6">Entre com seu e-mail e senha</p>
        <form onSubmit={submit} className="grid gap-3">
          <input className="border rounded-lg px-3 py-2" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <input className="border rounded-lg px-3 py-2" placeholder="Senha" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button className="bg-brand-600 hover:bg-brand-700 text-white rounded-lg px-4 py-2">{mode==='login'?'Entrar':'Criar conta'}</button>
        </form>
        <div className="mt-4 text-center">
          <button className="text-brand-700 underline" onClick={()=>setMode(mode==='login'?'signup':'login')}>
            {mode==='login'?'Criar conta de administrador':'Já tenho conta'}
          </button>
        </div>
      </div>
    </div>
  )
}
