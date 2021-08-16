import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import "../css/components/ProductCard.css";
import Rating from './Rating';

import { addToCart } from '../actions/cartActions';

const ProductCard = ({ product }) => {

    return (
        <LinkContainer to={`/products/${product._id}`}>
            <Card className="mx-auto product-card">
                <div style={{ width: '100%', maxHeight: '250px', minHeight: '200px', margin: '0 auto' }}>
                    <Card.Img src={product.image} className="p-3 product-img" alt={product.name} />
                </div>

                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>

                    <Rating value={product.rating} reviews={product.numReviews} />

                    <Card.Text>{product.description}</Card.Text>

                </Card.Body>

                <Card.Footer>${product.price}</Card.Footer>
            </Card>
        </LinkContainer>
    );
}

export default ProductCard;