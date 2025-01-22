import React from 'react';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';

const Cart: React.FC = () => {
    const { cart, totalItems, totalPrice, removeFromCart } = useCart();

    return (
        <Container className="App my-5">
            <h1 className="mb-4">Your Shopping Cart</h1>
            {totalItems === 0 ? (
                <p>Your cart is empty. Start adding items to your cart!</p>
            ) : (
                <>

                    <Table responsive bordered className="text-center">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            thumbnail
                                            style={{ maxWidth: '80px' }}
                                        />
                                    </td>
                                    <td>{item.title}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Row className="mb-12 text-end">
                        <Col>
                            <h5>Total Items: {totalItems}</h5>
                            <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
                        </Col>
                    </Row>

                </>
            )}
        </Container>
    );
};

export default Cart;