import React from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css';
import Pagination from './Pagination';

const ProductList = ({ products, currentPage, paginate }) => {
  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="product-list-container">
      <h1 className="heading">Product Listing</h1>
      <div className="product-grid">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className='link'>
              <img src={product.image} alt={product.title} className="product-image" />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-price">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductList;
