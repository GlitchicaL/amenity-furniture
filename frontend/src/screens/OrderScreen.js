import { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Image, Card, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';

import { ORDER_PAY_RESET } from '../constants/orderConstants';
import { getOrderDetails, payOrder } from '../actions/orderActions';

const OrderScreen = ({ match }) => {
    // Ac734GI9sLLGYLFwxW1akkR_CT7ImW573aza3DJiOdh6CEhdCCNU6IoobSiYcLsZb7oT2ruiX1iG2j6d

    const orderId = match.params.id
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    }

    const addPayPalScript = () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=Ac734GI9sLLGYLFwxW1akkR_CT7ImW573aza3DJiOdh6CEhdCCNU6IoobSiYcLsZb7oT2ruiX1iG2j6d'
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }

        document.body.appendChild(script)
    }

    useEffect(() => {

        if (!order || successPay || order._id !== Number(orderId)) {

            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))

        } else if (!order.isPaid) {

            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }

        }

    }, [dispatch, order, orderId, successPay])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    return (
        <Container>
            {loading ? (
                <Spinner />
            ) : error ? (
                <Alert variant='danger'>{error}</Alert>
            ) : (
                <div>
                    <h1 className='my-4'>Order: {order._id}</h1>

                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>

                                    <p><strong>Name: </strong> {order.user.name}</p>
                                    <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                                    <p>
                                        <strong>Shipping: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city},
                                        {'   '}
                                        {order.shippingAddress.postalCode}
                                        {'   '}
                                        {order.shippingAddress.country}
                                    </p>

                                    {order.isDelivered ? (
                                        <Alert variant='success'>Delievered on {order.deliveredAt}</Alert>
                                    ) : (
                                        <Alert variant='warning'>Not delievered</Alert>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment</h2>

                                    <p>
                                        <strong>Method: </strong>
                                        {order.paymentMethod}
                                    </p>

                                    {order.isPaid ? (
                                        <Alert variant='success'>Paid on {new Date(order.paidAt).toLocaleString()}</Alert>
                                    ) : (
                                        <Alert variant='warning'>Not paid</Alert>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? <Alert variant='info'>
                                        Order is empty
                                    </Alert> : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>

                                                        <Col>
                                                            <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                        </Col>

                                                        <Col md={4}>
                                                            {item.qty} X {item.price} = ${(item.qty * item.price).toFixed(2)}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={4}>
                            <Card style={{ background: '#402E32' }}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Item:</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total Price:</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Spinner />}

                                            {!sdkReady ? (
                                                <Spinner />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                        </ListGroup.Item>
                                    )}

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </Container>
    )
}

export default OrderScreen;