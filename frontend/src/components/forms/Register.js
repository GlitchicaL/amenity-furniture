import { useState, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import { register } from '../../actions/userActions';

const Register = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) { // If user is logged in, redirect
            history.push('/account')
        }
    }, [history, userInfo, dispatch])

    const registerHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            console.log('Passwords do not match')
        } else {
            dispatch(register(email, password))
        }
    }

    return (
        <Form className='p-3' onSubmit={registerHandler}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Create Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Retype Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Retype Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </Form.Group>

            <Button className='d-block mx-auto' type='submit'>Register</Button>
        </Form>
    );
}

export default Register;