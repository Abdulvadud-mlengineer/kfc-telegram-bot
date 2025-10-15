import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import CategoryMenu from './components/CategoryMenu/CategoryMenu';
import ProductList from './components/ProductList/ProductList';
import Cart from './components/Cart/Cart';
import { categories, products } from './data/products';
import './styles/App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Фильтрация продуктов при изменении категории
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Добавление товара в корзину
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Обновление количества товара
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Удаление товара из корзины
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Расчет общей стоимости
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Получение общего количества товаров
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Получение chatId из Telegram Web App
  const getTelegramChatId = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      const user = tg.initDataUnsafe?.user;
      return user?.id || 'unknown_chat_id';
    }
    return 'test_chat_id'; // Для тестирования вне Telegram
  };

  // Оформление заказа с отправкой в Telegram
  const handleCheckout = async () => {
    if (cart.length === 0) return;
    
    setIsLoading(true);

    const orderData = {
      chatId: getTelegramChatId(),
      items: cart,
      total: getTotalPrice(),
      timestamp: new Date().toLocaleString('ru-RU'),
      branch: 'KFC Fayz',
      orderId: 'KFC-' + Date.now()
    };

    try {
      // Отправка заказа на backend
      const response = await fetch('http://localhost:3001/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        // Показываем уведомление в Telegram Web App
        if (window.Telegram && window.Telegram.WebApp) {
          window.Telegram.WebApp.showAlert(
            `✅ Заказ успешно оформлен!\nИтого: ${getTotalPrice().toLocaleString()} сум\n\nМы свяжемся с вами для подтверждения.`,
            () => {
              setCart([]);
              setShowCart(false);
              setIsLoading(false);
            }
          );
        } else {
          // Для браузера показываем обычный alert
          alert(`✅ Заказ успешно оформлен!\nИтого: ${getTotalPrice().toLocaleString()} сум\n\nМы свяжемся с вами для подтверждения.`);
          setCart([]);
          setShowCart(false);
          setIsLoading(false);
        }

        // Закрываем Web App после успешного заказа (опционально)
        setTimeout(() => {
          if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.close();
          }
        }, 3000);

      } else {
        throw new Error(result.error || 'Ошибка сервера');
      }

    } catch (error) {
      console.error('Order error:', error);
      
      // Показываем ошибку
      if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.showAlert(
          '❌ Ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.',
          () => setIsLoading(false)
        );
      } else {
        alert('❌ Ошибка при оформлении заказа. Пожалуйста, попробуйте еще раз.');
        setIsLoading(false);
      }
    }
  };

  // Очистка корзины
  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="app telegram-webapp">
      <Header
        cartItemsCount={getTotalItems()}
        totalPrice={getTotalPrice()}
        onCartClick={() => setShowCart(true)}
      />
      
      <CategoryMenu
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
      
      <ProductList
        products={filteredProducts}
        onAddToCart={addToCart}
      />
      
      {showCart && (
        <Cart
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          totalPrice={getTotalPrice()}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
          isLoading={isLoading}
          onClearCart={clearCart}
        />
      )}
    </div>
  );
}

export default App;