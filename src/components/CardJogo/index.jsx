import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSessionStorage, useAsyncFn } from 'react-use'

const validationSchema = Yup.object().shape({
    homeTeamScore: Yup.string().required(),
    awayTeamScore: Yup.string().required(),
})

export const CardJogo = ({ gameId, homeTeam, awayTeam, gameDay, gameTime, homeTeamScore, awayTeamScore, disabled }) => {

    const [auth] = useSessionStorage('auth')

    const formik = useFormik({
        onSubmit: (values) => {
            axios({
                method: 'post',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/guesses',
                headers: {
                    authorization: `Bearer ${auth.accessToken}`
                },
                data: {
                    ...values,
                    gameId
                }
            })
        },        
        initialValues: {
            homeTeamScore,
            awayTeamScore
        },
        validationSchema
    })

    return (
        <div className="rounded-xl border border-grey-300 p-4 text-center space-y-4 max-w-[100%]">
            <span className="text-sm md:text-base text-grey-700 font-bold">{ gameDay }, </span>
            <span className="text-sm md:text-base text-grey-700 font-bold">{ gameTime }</span>

            <form className="flex space-x-4 p-2 justify-center items-center">
                <span className="uppercase text-sm">{homeTeam}</span>
                <img src={`/bandeiras/${homeTeam}.png`} alt={`${homeTeam}`} className="max-w-[15%]" />
                <input
                    type="number"
                    name="homeTeamScore"
                    value={formik.values.homeTeamScore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleSubmit}
                    disabled={disabled}
                    className="self-stretch bg-green-300/[0.2] max-w-[15%] text-green-700 text-xl text-center"
                />
                <span className="text-green-500 font-bold">X</span>
                <input
                    type="number"
                    name="awayTeamScore"
                    value={formik.values.awayTeamScore}
                    onChange={formik.handleChange}
                    onBlur={formik.handleSubmit}
                    disabled={disabled}
                    className="self-stretch bg-green-300/[0.2] max-w-[15%] text-green-700 text-xl text-center"
                />
                <img src={`/bandeiras/${awayTeam}.png`} alt={`${awayTeam}`} className="max-w-[15%]" />
                <span className="uppercase text-sm">{awayTeam}</span>
            </form>
        </div>
    )
}