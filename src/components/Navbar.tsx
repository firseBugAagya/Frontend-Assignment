import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
    const { totalItems } = useCart();

    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <Link to="/" style={styles.link}>
                    <h1>E-Shop</h1>
                </Link>
            </div>
            <div style={styles.links}>
                <Link to="/cart" style={styles.link}>
                    Cart ({totalItems})
                </Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#282c34',
        color: 'white',
    },
    logo: {
        fontSize: '24px',
    },
    links: {
        display: 'flex',
        gap: '15px',
    },
    link: {
        textDecoration: 'none',
        color: 'white',
        fontSize: '18px',
    },
};

export default Navbar;