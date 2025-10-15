import React from 'react';
import './Cart.css';

const Cart = ({ 
  cart, 
  onUpdateQuantity, 
  onRemoveItem, 
  totalPrice, 
  onClose, 
  onCheckout,
  isLoading,
  onClearCart
}) => {
  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Ваш заказ</h2>
          <button className="close-btn" onClick={onClose} disabled={isLoading}>
            ✕
          </button>
        </div>
        
        <div className="cart-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Корзина пуста</h3>
              <p>Добавьте товары из меню</p>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="item-image">
                      <span>{item.image}</span>
                    </div>
                    
                    <div className="item-details">
                      <h4 className="item-name">{item.name}</h4>
                      <p className="item-price">{item.price.toLocaleString()} сум</p>
                      
                      <div className="quantity-controls">
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoading}
                        >
                          −
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoading}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <div className="item-total">
                      <span className="total-price">
                        {(item.price * item.quantity).toLocaleString()} сум
                      </span>
                      <button 
                        className="remove-btn"
                        onClick={() => onRemoveItem(item.id)}
                        disabled={isLoading}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="cart-footer">
                <div className="total-section">
                  <div className="total-line">
                    <span>Итого:</span>
                    <span className="final-price">{totalPrice.toLocaleString()} сум</span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <button 
                    className="clear-cart-btn"
                    onClick={onClearCart}
                    disabled={isLoading}
                  >
                    Очистить корзину
                  </button>
                  
                  <button 
                    className="checkout-btn"
                    onClick={onCheckout}
                    disabled={isLoading || cart.length === 0}
                  >
                    {isLoading ? 'Оформляем заказ...' : 'Оформить заказ'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;