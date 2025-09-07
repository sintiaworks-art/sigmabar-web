# SigmaBar Web (Vercel + Firebase)

Sistema para bar e distribuidora com login, produtos, clientes, comandas e relatórios.

## Tecnologias
- React + Vite
- Tailwind CSS (tema azul minimalista)
- Firebase Auth + Firestore
- Deploy na Vercel

## Passo a passo (5 minutos)

### 1) Criar projeto Firebase
- Acesse https://console.firebase.google.com/
- Crie um projeto → Adicione um app Web
- Ative **Authentication** → método **Email/Password**
- Ative **Firestore Database** (modo produção)
- Copie as credenciais do app (apiKey, authDomain, ...)

### 2) Configurar variáveis (.env)
- Baixe o projeto e renomeie `.env.example` para `.env`
- Preencha com as suas credenciais do Firebase

### 3) Rodar local (opcional)
```bash
npm i
npm run dev
```

### 4) Deploy na Vercel
- Crie conta em https://vercel.com e conecte ao GitHub
- Crie um repositório **sigmabar-web** com estes arquivos
- Na Vercel: **Add New → Project → Import Git Repository**
- Build Command: `npm run build`
- Output Directory: `dist`
- Clique **Deploy** e aguarde o link

### 5) Regras simples do Firestore (opcionalmente endureça depois)
Em **Firestore → Rules**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
> Em produção, crie regras mais específicas por coleção/usuário.

## Estrutura
- `/src/pages`: Login, Dashboard, Products, Clients, Orders, Reports
- `/src/components`: Navbar, Protected
- `/src/firebase.js`: inicialização Firebase

## Observações
- O campo `clienteId` na comanda guarda o documento do cliente. Você pode evoluir para gravar também `clienteNome` para facilitar relatórios.
- Estoque é reduzido ao fechar comanda.
- Excluir produto/cliente está implementado nas telas respectivas.

Boa venda! 🍹
