import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert, Table, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import { getUserOrders } from '../actions/orderActions';
import { updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const AccountScreen = ({ history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { error, userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: ordersLoading, error: ordersError, orders } = orderListMy

    const dispatch = useDispatch()

    // Ensure that the user is logged in before viewing this page
    useEffect(() => {

        if (userInfo) {

            setEmail(userInfo.email)

            dispatch(getUserOrders())

            if (success) { // Executes when the user updates their account info
                dispatch({ type: USER_UPDATE_RESET })
                setPassword('')
                setConfirmPassword('')
                setMessage('Account Updated')
            }

        } else {
            history.push('/login')
        }

    }, [history, userInfo, success, dispatch])

    const updateUserHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUser(email, password))
        }
    }

    return (
        <Container>
            <h1 className='my-4'>My Account</h1>

            <Row>
                <Col>
                    <h2>Account Details</h2>

                    {message && <Alert variant='primary'>{message}</Alert>}

                    <Form className='p-2' onSubmit={updateUserHandler}>

                        {/* EMAIL */}

                        <Form.Control
                            className='my-3'
                            type="text"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        {/* PASSWORD & CONFIRM PASSWORD */}

                        <Form.Control
                            className='my-3'
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Form.Control
                            className='my-3'
                            type="password"
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <Button type='submit'>Update</Button>
                    </Form>
                </Col>

                <Col>
                    <h2>My Orders</h2>

                    {ordersLoading ? (
                        <Spinner />
                    ) : ordersError ? (
                        <Alert variant='danger'>{ordersError}</Alert>
                    ) : (
                        <Table striped responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delievered</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>${order.totalPrice}</td>
                                        <td>{order.isPaid ? (
                                            <i class="fas fa-check" style={{ color: '#4C8076' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}</td>
                                        <td><i className='fas fa-times' style={{ color: 'red' }}></i></td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='btn-sm'>View</Button>
                                            </LinkContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default AccountScreen;