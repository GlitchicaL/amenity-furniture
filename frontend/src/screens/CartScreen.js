import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Form, Button, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import { addToCart, removeFromCart } from '../actions/cartActions';

// FIXME: If an item is already in a user's cart, but the price has an update on the backend, it does not update in the user's cart...
// FIXME: With the issue mentioned above, we may have a similar issue with the stock count if it's updated on the backend as well.

const CartScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const dispatch = useDispatch()

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Container>
            <h1 className='my-4'>My Cart</h1>

            <Row>
                <Col md={8}>
                    <h2 className='p-2'>Items In Cart</h2>

                    <ListGroup variant='flush'>
                        {cartItems.map((product, index) => (
                            <ListGroup.Item key={index} style={{ background: '#402E32' }} className='p-4'>
                                <Row>
                                    <Col md={2} className='flex p-0'>
                                        <Image src={product.image} alt={product.name} style={{ width: '50px' }} fluid />
                                    </Col>

                                    <Col md={4} className='flex p-0'>
                                        <Link className='product-link' to={`/products/${product.product}`}>{product.name}</Link>
                                    </Col>

                                    <Col md={2} className='flex p-0'>
                                        ${product.price}
                                    </Col>

                                    <Col md={3} className='flex'>
                                        <Form.Control
                                            size="sm"
                                            style={{ maxWidth: '100px' }}
                                            as="select"
                                            value={product.qty}
                                            onChange={(e) => dispatch(addToCart(product.product, Number(e.target.value)))}
                                        >
                                            {
                                                [...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>

                                    <Col md={1} className='flex'>
                                        <Button onClick={() => { removeFromCartHandler(product.product) }}><i class="fas fa-minus"></i></Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col>
                    <h2 className='py-2'>Cart Details</h2>

                    <Card style={{ background: '#402E32' }} className='my-2'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item style={{ background: '#402E32' }}>
                                <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                                ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup className='p-3' style={{ background: '#402E32' }}>
                            <Button
                                type='button'
                                className='btn-block mx-auto'
                                style={{ maxWidth: '250px' }}
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed To Checkout
                            </Button>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CartScreen;