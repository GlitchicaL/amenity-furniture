import { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Button, Table, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';

import { listProducts, deleteProduct, createProduct } from '../actions/productActions';

import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts())
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])

    const createProductHandler = (product) => {
        dispatch(createProduct())
    }

    const deleteHandler = (id) => {

        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }

    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1 className='my-4'>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-4' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader message={'Deleting Product...'} />}
            {errorDelete && <Alert variant='danger'>{errorDelete}</Alert>}

            {loadingCreate && <Loader message={'Creating Product...'} />}
            {errorCreate && <Alert variant='danger'>{errorCreate}</Alert>}

            <Row>
                {loading ? (
                    <Loader message={'Fetching Products...'} />
                ) : error ? (
                    <Alert variant='danger'>{error}</Alert>
                ) : (
                    <Table striped responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>

                                    <td className='flex'>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`} className='m-2'>
                                            <Button><i className='fas fa-edit'></i></Button>
                                        </LinkContainer>

                                        <Button onClick={() => deleteHandler(product._id)} className='m-2 red'><i className='fas fa-trash'></i></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Row>
        </Container>
    );
}

export default ProductListScreen;