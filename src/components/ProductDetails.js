import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    if (!product) return (
        <div className="product-detail-container">
            <div className="product-detail shimmer-wrapper">
                <div className="skeleton-image shimmer"></div>
                <div className="product-detail-info">
                    <div className="skeleton-text shimmer" style={{ width: '60%' }}></div>
                    <div className="skeleton-text shimmer" style={{ width: '80%' }}></div>
                    <div className="skeleton-text shimmer" style={{ width: '40%' }}></div>
                    <div className="skeleton-text shimmer" style={{ width: '50%' }}></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <img src={product.image} alt={product.title} className="product-detail-image" />
                <div className="product-detail-info">
                    <h1 className="product-detail-title">{product.title}</h1>
                    <p className="product-detail-description">{product.description}</p>
                    <p className="product-detail-price">${product.price}</p>
                    <p className="product-detail-rating">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
