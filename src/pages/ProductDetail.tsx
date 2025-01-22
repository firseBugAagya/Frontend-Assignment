import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: product, loading } = useFetch(`${process.env.REACT_APP_BASEURL}/products/${id}`);
    const { cart, addToCart } = useCart();

    const isInCart = cart.some(item => item.id === Number(id));

    if (loading) {
        return (
            <div className="text-center my-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return product ? (
        <Container className="my-5">
            <Row>
                <Col>
                    <Button
                        variant="outline-dark"
                        className="mb-4"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft className="me-1 mb-1" />

                    </Button>
                </Col>
            </Row>
            <Row className="align-items-center">
                <Col md={6} className="text-center">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="img-fluid"
                        style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                </Col>
                <Col md={6}>
                    <h1 className="mb-3">{product.title}</h1>
                    <Card className="mt-2 mb-2" style={{ maxWidth: '200px', lineHeight: '5px' }}>
                        <Card.Body>
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <span className="fw-bold">{product.rating.rate}</span> / 5
                                </div>
                                <div>
                                    <span className="text-muted">({product.rating.count} reviews)</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    <p className="text-muted">{product.description}</p>
                    <h3 className="text-dark">${product.price.toFixed(2)}</h3>

                    <Button
                        variant="dark"
                        className="mt-4"
                        onClick={() => addToCart(product)}
                    >
                        {isInCart ? (
                            <Link to="/cart" className="text-white text-decoration-none">
                                Go to Cart <FaArrowRight />
                            </Link>

                        ) : (
                            'Add to Cart'
                        )}
                    </Button>
                </Col>
            </Row>
        </Container>
    ) : (
        <Container className="my-5 text-center">
            <h2>Product not found</h2>
        </Container>
    );
};

export default ProductDetail;