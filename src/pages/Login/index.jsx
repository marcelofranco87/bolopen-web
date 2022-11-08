import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSessionStorage } from 'react-use'
import { Navigate } from 'react-router-dom'

import logo from '~/assets/logo/logo-open-branco.svg'

import { Icon, Input } from '~/components'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Informe um e-mail válido').required('Informe seu e-mail'),
    password: Yup.string().required('É preciso cadastrar uma senha'),
})

export const Login = () => {

    const [auth, setAuth] = useSessionStorage('auth', {})

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            const res = await axios ({
                method: 'get',
                baseURL: import.meta.env.VITE_API_URL,
                url: '/login',
                auth: {
                    username: values.email,
                    password: values.password
                }
            })            
            
            setAuth(res.data)
            // const auth = sessionStorage.getItem('auth')
            // console.log(JSON.parse(auth))            
            
        },
        validationSchema
    })

    if (auth?.user?.id) {
        return <Navigate to="/dashboard" replace={true} />
    }

    return (
        <div>
            <header className="p-4 border-b border-green-300">
                <div className="container flex justify-center max-w-xl">
                    <img src={logo} className="w-32 md:w-40" />
                </div>
            </header>
            <main className="container max-w-xl p-4">
                <div className="p-4 flex space-x-4 items-center">
                    <a href="/">
                        <Icon name="back" className="h-6" />
                    </a>
                    <h2 className="text-xl font-bold">Entre na sua conta</h2>
                </div>
                <form className="p-4 space-y-6" onSubmit={formik.handleSubmit}>
                <Input
                        type="text"
                        name="email"
                        label="Seu e-mail"
                        placeholder="Digite seu e-mail"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email}
                    />

<Input
                        type="password"
                        name="password"
                        label="Sua senha"
                        placeholder="Digite sua senha"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password}
                    />

                    <button
                        className="block w-full bg-green-500 text-center text-white text-base px-6 py-3 rounded-xl disabled:opacity-50"
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
                    >
                        {formik.isSubmitting ? 'Aguarde...' : 'Entrar'}
                    </button>
                </form>
            </main>
        </div>
    )
}