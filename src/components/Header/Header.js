import React from 'react';
import './Header.css';

const Header = ({ cartItemsCount, onCartClick, totalPrice }) => {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="header-title">KFC Uzbekistan</h1>
        <button 
          className="cart-button"
          onClick={onCartClick}
        >
          <span className="cart-icon">🛒</span>
          {cartItemsCount > 0 && (
            <span className="cart-badge">{cartItemsCount}</span>
          )}
        </button>
      </div>
      
      <div className="branch-info">
        <span className="branch-name">Филиал KFC Fayz</span>
        {totalPrice > 0 && (
          <span className="cart-total">{totalPrice.toLocaleString()} сум</span>
        )}
      </div>
    </header>
  );
};

export default Header;