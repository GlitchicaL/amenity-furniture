import axios from 'axios';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader';

import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {

        // If logged in user is not an admin, redirect
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }

    }, [dispatch, history, userInfo, product, productId, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', productId)

        setUploading(true)

        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/products/upload/', formData, config)

            setImage(data)
            setUploading(false)

        } catch (error) {
            setUploading(false)
        }

    }

    return (
        <Container>
            <h1 className='my-4'>Edit Product</h1>

            <Link to='/admin/productlist'><Button><i className="fas fa-chevron-left mx-1"></i>Go Back</Button></Link>

            {loadingUpdate && <Loader message={"Updating Product"} />}
            {errorUpdate && <Alert variant='danger' className='my-4'>{errorUpdate}</Alert>}

            {loading ? (
                <Loader message={"Loading Product Details"} />
            ) : error ? (
                <Alert variant='danger'>{error}</Alert>
            ) : (
                <Form onSubmit={submitHandler} className="my-4">
                    {/* NAME */}
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    {/* PRICE */}
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>

                    {/* IMAGE */}
                    {/* TODO: CHANGE TO FILE UPLOAD FIELD */}
                    <Form.Group controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            disabled
                        />

                        <Form.File
                            id="image-file"
                            label='Choose File'
                            custom
                            onChange={uploadFileHandler}
                        >

                        </Form.File>

                        {uploading && <Loader message={"Uploading Image..."} />}

                    </Form.Group>

                    {/* BRAND */}
                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </Form.Group>

                    {/* CATEGORY */}
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </Form.Group>

                    {/* COUNT IN STOCK */}
                    <Form.Group controlId="countInStock">
                        <Form.Label>Quantity In Stock</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder='Stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                    </Form.Group>

                    {/* DESCRIPTION */}
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder='Enter Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit'>Update</Button>
                </Form>
            )}
        </Container>
    );
}

export default ProductEditScreen;