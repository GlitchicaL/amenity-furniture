import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import "../css/components/ProductCard.css";
import Rating from './Rating';

import { addToCart } from '../actions/cartActions';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch()

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, 1))
    }

    return (
        <Card className="mx-auto product-card">
            <Card.Img src={product.image} className="p-3 product-img" alt={product.name} />

            <Card.Body>
                <Card.Title>
                    <Link className='product-link' to={`/products/${product._id}`}>{product.name}</Link>
                </Card.Title>

                <Rating value={product.rating} reviews={product.numReviews} />

                <Card.Text>${product.price}</Card.Text>

                <Button onClick={addToCartHandler} disabled={product.countInStock === 0}>Add to Cart</Button>

            </Card.Body>
        </Card>
    );
}

export default ProductCard;