import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Formik, Field, Form } from 'formik'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'


export function LoginSignup() {
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(false)

    async function onSubmit(credentials) {
        try {
            const user = isSignup ? await signup(credentials) : await login(credentials)
            showSuccessMsg(`Welcome ${user.fullname}`)
            navigate('/toy')
        } catch (err) {
            showErrorMsg(isSignup ? 'Cannot signup' : 'Wrong username or password')
        }
    }

    return (
        <section className="login-signup">
            <h2>{isSignup ? 'Signup' : 'Login'}</h2>

            <Formik
                initialValues={{ username: '', password: '', fullname: '' }}
                onSubmit={onSubmit}
            >
                <Form>
                    <Field name="username" type="text" placeholder="Username" required autoFocus />
                    <Field name="password" type="password" placeholder="Password" required />
                    {isSignup && <Field name="fullname" type="text" placeholder="Full name" required />}
                    <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
                </Form>
            </Formik>

            <button onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
            </button>
        </section>
    )
}
