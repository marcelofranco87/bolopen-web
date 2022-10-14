import React from "react"
import { useLocalStorage } from 'react-use'
import { Navigate, useLocation } from 'react-router-dom'

import { Message } from '~/components';

import imagemCapa from '~/assets/imagem/img2.png'
import logo from '~/assets/logo/logo-open-vinho.svg'

export function Home() { 

  const [auth] = useLocalStorage('auth', {})

  const location = useLocation()

  let msg= null ?? location.state



  if (auth?.user?.id) {
    return <Navigate to="/dashboard" replace={true} />
  }

  return (
    <div className="h-screen bg-red-700 text-white p-4 flex flex-col items-center space-y-6">

      <header className="bg-red-700 container max-w-5xl p-4 flex justify-center">
        <img src={logo} className="w-40" />        
      </header>

      <div className="bg-red-700 container max-w-5xl flex flex-1 flex-col justify-center items-center md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <Message msg={msg} status="sucesso" />
      </div>

      <div className="bg-red-700 container max-w-5xl p-4 flex flex-1 flex-col justify-center items-center md:flex-row space-y-6 md:space-y-0 md:space-x-6">

        <div className="flex md:flex-1 justify-center">
          <img src={imagemCapa} className="w-full max-w-md"/>
        </div>

        <div className="bg-red-700 md:flex-1 flex flex-col space-y-6">
          <h1 className="text-3xl text-center font-bold">99 é o palpite do meu Tévez!</h1>
          <a href="/signup" className="bg-white text-center text-red-700 text-xl px-8 py-4 rounded-xl">
            Criar minha conta
          </a>
          <a href="/login" className="text-white text-center border border-white text-xl px-8 py-4 rounded-xl">
            Fazer login
          </a>
        </div>

      </div>

    </div>
  )
}