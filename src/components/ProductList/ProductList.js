import React from 'react';
import './ProductList.css';

const ProductList = ({ products, onAddToCart }) => {
  if (products.length === 0) {
    return (
      <div className="product-list">
        <div className="empty-state">
          <div className="empty-icon">🍗</div>
          <h3>Товары не найдены</h3>
          <p>Попробуйте выбрать другую категорию</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <span className="product-emoji">{product.image}</span>
            </div>
            
            <div className="product-content">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-footer">
                <span className="product-price">
                  {product.price.toLocaleString()} сум
                </span>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product)}
                >
                  Добавить
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;