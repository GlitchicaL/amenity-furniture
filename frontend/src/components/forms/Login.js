import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

// Import Actions
import { login } from '../../actions/userActions';

const Login = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) { // If user is logged in, redirect
            history.push(redirect)
        }
    }, [history, redirect, userInfo, dispatch])

    const loginHandler = (e) => {
        e.preventDefault()

        dispatch(login(email, password))
    }

    return (
        <Form className='p-3' onSubmit={loginHandler}>
            <Form.Group className='mb-2'>
                <Form.Label className='mb-2'>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label className='my-2'>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button className='d-block mt-4 mx-auto' type='submit'>Login</Button>
        </Form>
    );
}

export default Login;