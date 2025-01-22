import React from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import { useFetch } from '../hooks/useFetch';

interface SidebarProps {
    onCategorySelect: (category: string) => void;
    onResetFilters: () => void;
    selectedCategories: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategories, onCategorySelect, onResetFilters }) => {
    const { data: categories, loading, error } = useFetch(`${process.env.REACT_APP_BASEURL}/products/categories`);

    if (loading) {
        return <div className="text-center my-5"><Spinner /></div>;
    }

    if (error) {
        return <p>Categories not found... {error}</p>;
    }

    return (
        <div className="sidebar">
            <h5>Categories</h5>
            <ListGroup>
                <ListGroup.Item
                    className={selectedCategories.length === 0 ? 'active list-group-item-dark' : ''}
                    onClick={onResetFilters}
                    style={{ cursor: 'pointer' }}
                >
                    All Products
                </ListGroup.Item>
                {categories.map((category: string) => (
                    <ListGroup.Item
                        key={category}
                        className={selectedCategories.includes(category) ? 'active list-group-item-dark' : ''}
                        onClick={() => onCategorySelect(category)}
                        style={{ cursor: 'pointer' }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default Sidebar;