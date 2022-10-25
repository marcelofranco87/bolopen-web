import { useState, useEffect } from 'react'
import { useLocalStorage, useAsyncFn } from 'react-use'
import { Navigate } from 'react-router-dom'
import { format, formatISO } from 'date-fns'
import axios from 'axios'

import { Icon, CardJogo, DateSelect } from '~/components'

import logo from '~/assets/logo/logo-open-vermelho.svg'

export const Profile = () => {    

    const [currentDate, setCurrentDate] = useState(formatISO(new Date(2022, 10, 20)))

    const [auth, setAuth] = useLocalStorage('auth', {})

    const [guesses, fetchGuesses] = useAsyncFn(async () => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: `/${auth.user.username}`,            
        })

        const guessesMap = res.data.reduce((acc, guess) => {
            acc[guess.gameId] = guess
            return acc
        }, {})

        return guessesMap

    })

    const [games, fetchGames] = useAsyncFn(async (params) => {
        const res = await axios({
            method: 'get',
            baseURL: import.meta.env.VITE_API_URL,
            url: '/games',
            params
        })

        return res.data
    })

    const isLoading = games.loading || guesses.loading
    const hasError = games.error || guesses.hasError
    const isLoaded = !isLoading && !hasError
    const logout = () => setAuth({})

    useEffect(() => {        
        fetchGuesses()
    }, [])

    useEffect(() => {
        fetchGames({ gameTime: currentDate })
        fetchGuesses()
    }, [currentDate])

    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>

            <header className="bg-green-500 p-4 text-white">            
                <div className="container max-w-3xl flex justify-between">
                    <img src={logo} className="w-28 md:w-40" />
                    <div className="p-2 cursor-pointer" onClick={logout}>
                        Sair
                    </div>
                </div>
            </header>

            <main className="space-y-6">
                <section id="header" className="bg-green-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <a href="/dashboard">
                            <Icon name="back" className="w-10" />
                        </a>
                        <h3 className="text-2xl font-bold">{auth.user.name}</h3>
                        <h4 className="text-xl font-bold">({auth.user.username})</h4>
                    </div>
                </section>

                <section id="content" className="container max-w-3xl p-4 space-y-4">

                    <h2 className="text-xl text-green-500 font-bold">Seus palpites</h2>

                    <DateSelect currentDate={currentDate} onChange={setCurrentDate} />

                    <div className="space-y-4">

                        {isLoading && <div className="text-center">Carregando...</div>}
                        {hasError && <div className="text-center">Ops! Algo deu errado.</div>}

                        {!isLoading}

                        {isLoaded && games.value?.map(game => (
                            <CardJogo
                            key={game.id}
                            gameId={game.id}
                            homeTeam={game.homeTeam}
                            awayTeam={game.awayTeam}
                            gameTime={format(new Date(game.gameTime), 'H:mm')}
                            homeTeamScore={guesses?.value?.[game.id]?.homeTeamScore || 0}
                            awayTeamScore={guesses?.value?.[game.id]?.awayTeamScore || 0}
                            disabled={true}
                            />
                        ))}                        
                    
                    </div>
                    
                </section>
            </main>

        </>
    )
}