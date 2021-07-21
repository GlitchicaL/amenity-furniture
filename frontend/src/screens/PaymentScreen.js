import { useState } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = ({ history }) => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    if (!shippingAddress.address) {
        history.push('/shipping')
    }

    const paymentHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <Container>
            <h1 className='my-4'>Payment Details</h1>

            <Form className='m-4' onSubmit={paymentHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>

        </Container>
    );
}

export default PaymentScreen;