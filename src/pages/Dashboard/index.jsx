import { useState, useEffect } from 'react'
import { useSessionStorage, useAsyncFn } from 'react-use'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { format, formatISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import logo from '~/assets/logo/logo-open-fundo-claro.svg'

import { Icon, CardJogo, GroupSelect, DateSelect } from '~/components'

export const Dashboard = () => {

    // const [currentDate, setCurrentDate] = useState(formatISO(new Date(2022, 10, 20)))
    const [currentGroup, setCurrentGroup] = useState('i') //Group Stage: useState('a')
    const [auth] = useSessionStorage('auth', {})

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
    const hasError = games.hasError || guesses.hasError
    const isLoaded = !isLoading && !hasError

    useEffect(() => {        
        fetchGuesses()
    }, [])

    useEffect(() => {
        fetchGames({ groupLetter: currentGroup })
        fetchGuesses()
    }, [currentGroup])

    // useEffect(() => {
    //     fetchGames({ gameTime: currentDate })
    //     fetchGuesses()
    // }, [currentDate])

    if (!auth?.user?.id) {
        return <Navigate to="/" replace={true} />
    }

    return (
        <>

            <header className="bg-green-500 p-4 text-white">            
                <div className="container max-w-3xl flex justify-between">
                    <img src={logo} className="w-28 md:w-40" />
                    <a href="/profile">
                        <Icon name="profile" className="w-10" />
                    </a>
                </div>
            </header>

            <main className="space-y-6">
                <section id="header" className="bg-green-500 text-white">
                    <div className="container max-w-3xl space-y-2 p-4">
                        <span>Olá, {auth.user.name}!</span>
                        <h3 className="text-2xl font-bold">Qual é o seu palpite?</h3>
                    </div>
                </section>

                <section id="content" className="container max-w-3xl p-4 space-y-4">

                    {/* <DateSelect currentDate={currentDate} onChange={setCurrentDate} /> */}
                    <GroupSelect currentGroup={currentGroup} onChange={setCurrentGroup} />

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
                            gameDay={format(new Date(game.gameTime), "d 'de' MMMM", {locale: ptBR})}
                            gameTime={format(new Date(game.gameTime), 'H:mm')}
                            homeTeamScore={guesses?.value?.[game.id]?.homeTeamScore || 0}
                            awayTeamScore={guesses?.value?.[game.id]?.awayTeamScore || 0}
                            disabled={new Date(game.gameTime) > new Date() ? false : true}
                            />
                        ))}                        
                    
                    </div>
                </section>
            </main>

        </>
    )
}