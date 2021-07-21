import { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

/* Import Components */
import Rating from '../components/Rating';

/* Import Actions */
import { listProductDetails } from '../actions/productActions';
import { addToCart } from '../actions/cartActions';

const ProductScreen = ({ match }) => {
    const productDetails = useSelector(state => state.productDetails);
    const { error, loading, product } = productDetails;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProductDetails(match.params.id));
    }, [dispatch, match])

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, 1))
    }

    return (
        <Container>
            <Row>

                {/* Main Product Details */}

                <Col>
                    <Row>
                        <Col className='my-auto py-4'>
                            <img src={product.image} className="product-img flex" style={{ border: "0.75em solid #402E32" }} alt={product.name} />
                        </Col>

                        <Col className='m-4'>

                            <h3 className='text-center'>{product.name}</h3>

                            <Rating value={product.rating} reviews={product.numReviews} />

                            <p className='text-center'>{product.description}</p>

                            <h4 className='text-center'>Specifications</h4>
                            <div className='my-4'>
                                <p>Color: Brown</p>
                                <p>Material: Pine</p>
                                <p>Dimensions: N/A</p>
                            </div>
                        </Col>

                        <Col className='m-4' style={{ 'background': 'var(--clr-brown)' }}>
                            <Row className="m-4 text-center">
                                <Col>
                                    <h4>${product.price}</h4>
                                    <Button onClick={addToCartHandler} disabled={product.countInStock === 0}>Add to Cart</Button>
                                </Col>
                            </Row>

                            <Row className="m-2 text-center">
                                <Col>
                                    <h5>Free Delivery</h5>
                                    <p className="bold">Wednesday, June 2nd</p>
                                </Col>
                            </Row>

                            <Row className="m-2 text-center">
                                <Col>
                                    <h5>In Stock</h5>

                                    {product.countInStock === 0 ? (
                                        <p className="bold">Out of Stock</p>
                                    ) : <p className="bold">{product.countInStock}</p>}

                                </Col>
                            </Row>

                            <Row className="m-2 text-center">
                                <Col>
                                    <h5>Return Policy</h5>
                                    <p className="bold">Returnable</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Product Review Section */}

            <Row>
                <Col className='my-4 text-center'>
                    <h2>Reviews & Questions</h2>
                    <p>Reviews are currently unavailable</p>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductScreen;