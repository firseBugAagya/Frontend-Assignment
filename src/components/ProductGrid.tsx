import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: any
}

type Props = { products: Product[] };

const ProductGrid: React.FC<Props> = ({ products }) => (
    <div className="container my-4">
        <Row className="g-3">
            {products.map((product) => (
                <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/product/${product.id}`} style={{ color: 'white', textDecoration: 'none' }}>
                        <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={product.image}
                                alt={product.title}
                                style={{ height: '200px', objectFit: 'contain' }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="text-truncate">{product.title}</Card.Title>
                                <Card className="mt-2 mb-2" style={{ color: "burlywood", maxWidth: '200px', lineHeight: '5px' }}>
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
                                <b className="mb-2">${product.price.toFixed(2)}</b>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            ))}
        </Row>
    </div>
);

export default ProductGrid;