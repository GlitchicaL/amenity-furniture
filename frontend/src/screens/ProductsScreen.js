import { useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

/* Import Components */
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

/* Import Actions */
import { listProducts } from '../actions/productActions';

const ProductsScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    return (
        <Container>

            {/* Product Filter Section */}

            <Row>
                <Col className='my-4 flex'>
                    <input type="text" className='mx-2 p-2' placeholder="Search Products" />

                    <select name="categories" id="" defaultValue="all" style={{ display: "none" }}>
                        <option value="all">All</option>
                        <option value="tables">Tables</option>
                        <option value="chairs">Chairs</option>
                        <option value="lights">Lights</option>
                    </select>

                    <Button><i className="fas fa-filter"></i></Button>
                </Col>
            </Row>

            {/* Display Products */}

            {
                // TODO: Improve loading message. Maybe add a little animation while loading?
                // TODO: Improve error message. Maybe make both the loading / error message a component?

                loading ? <Loader message='Fetching amazing products...' /> // If loading, show loading message

                    : error ? <p>{error}</p> // If error, show error message

                        // If not loading, or no error, show products
                        : <Row className="product-list">
                            {
                                products.map(product => (
                                    <Col className='my-2' key={product._id}>
                                        <ProductCard product={product} />
                                    </Col>
                                ))
                            }
                        </Row>
            }

            {/* Pagination Section */}

            <Row>
                <Col className='my-4 flex'>
                    <Button className='mx-3'><i className="fas fa-chevron-left"></i></Button>

                    <Link to={'/'} className="mx-2 active">1</Link>
                    <Link to={'/'} className="mx-2">2</Link>
                    <Link to={'/'} className="mx-2">3</Link>

                    <Button className='mx-3'><i className="fas fa-chevron-right"></i></Button>
                </Col>
            </Row>

        </Container>
    );
}

export default ProductsScreen;