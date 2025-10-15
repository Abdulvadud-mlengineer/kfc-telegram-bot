import React from 'react';
import './CategoryMenu.css';

const CategoryMenu = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="category-menu">
      <div className="categories-scroll">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-item ${
              selectedCategory === category.id ? 'category-item--active' : ''
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;