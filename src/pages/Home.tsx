import React, { useState, useEffect } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';
import ProductGrid from '../components/ProductGrid';
import Sidebar from '../components/Sidebar';

const Home: React.FC = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
        const params = new URLSearchParams(window.location.search);
        const categories = params.get('categories');
        return categories ? categories.split(',') : [];
    });

    const apiUrl = `${process.env.REACT_APP_BASEURL}/products`;
    const { data: products, loading } = useFetch(apiUrl);

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedCategories.length > 0) {
            params.set('categories', selectedCategories.join(','));
        }
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }, [selectedCategories]);

    const handleCategorySelect = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((cat) => cat !== category)
                : [...prev, category]
        );
    };

    const handleResetFilters = () => {
        setSelectedCategories([]);
    };

    const filteredProducts =
        selectedCategories.length > 0
            ? products?.filter((product: any) =>
                selectedCategories.includes(product.category)
            )
            : products;

    if (loading) return <div className="text-center my-5"><Spinner /></div>;

    return (
        <div className="container my-5">
            <Row>
                <Col md={3}>
                    <Sidebar
                        onCategorySelect={handleCategorySelect}
                        selectedCategories={selectedCategories}
                        onResetFilters={handleResetFilters}
                    />
                </Col>
                <Col md={9}>
                    <h1 className="App mt-4">Product Listing</h1>
                    <ProductGrid products={filteredProducts || []} />
                </Col>
            </Row>
        </div>
    );
};

export default Home;