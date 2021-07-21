import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/* Import Components */
import ProductCard from '../components/ProductCard';

/* Import Actions */
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    return (
        <Container fluid>

            {/* Welcome Section */}

            <Row className='mx-auto p-4'>
                <Col md={12} className='text-center'>
                    <h1>Amenity Furniture</h1>
                    <p>For all your home furnishing needs.</p>
                    <Link to='/products' className="btn">View Products</Link>
                </Col>
            </Row>

            {/* Featured Products Section */}

            <Row className='mx-auto py-4'>
                <Col>
                    <h1 className='mx-auto text-center'>Featured Products</h1>

                    <Row className="mx-auto py-3 product-list">
                        {
                            loading ? <p>Fetching some amazing furniture...</p>
                                : error ? <p>{error}</p>
                                    : products.map(product => (
                                        <Col key={product._id} className='mx-auto my-2' xs={12} sm={6} md={4} lg={3}>
                                            <ProductCard product={product} />
                                        </Col>
                                    ))
                        }
                    </Row>
                </Col>
            </Row>

        </Container >
    );
}

export default HomeScreen;