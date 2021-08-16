import { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../css/screens/HomeScreen.css';

/* Import Components */
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

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

            <div className='mx-auto welcome-section'>

                <div className='welcome-section-image'></div>

                <div className='welcome-section-text'>
                    <h1>Amenity Furniture</h1>
                    <p>For all your home furnishing needs.</p>
                    <Link to='/products' className="btn">View Products</Link>
                </div>

            </div>

            {/* Featured Products Section */}

            <Row className='mx-auto py-4'>
                <Col>
                    <h1 className='mx-auto text-center'>Featured Products</h1>

                    <div className="mx-auto py-3">
                        {
                            loading ? <Loader message='Fetching our current favorites...' />
                                : error ? <p>{error}</p>
                                    : <Row className='product-list mx-auto'>
                                        {
                                            products.map(product => (
                                                <Col key={product._id} className='mx-auto my-2' xs={12} sm={6} md={4} lg={3}>
                                                    <ProductCard product={product} />
                                                </Col>
                                            ))
                                        }
                                    </Row>
                        }
                    </div>
                </Col>
            </Row>

        </Container >
    );
}

export default HomeScreen;