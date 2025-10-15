import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Инициализация Telegram Web App
const initializeTelegramApp = () => {
  if (window.Telegram && window.Telegram.WebApp) {
    const tg = window.Telegram.WebApp;
    
    // Расширяем окно на весь экран
    tg.expand();
    
    // Устанавливаем цвет фона
    tg.setBackgroundColor('#ffffff');
    tg.setHeaderColor('#e4002b');
    
    // Включаем кнопку "Назад"
    tg.BackButton.show();
    tg.BackButton.onClick(() => {
      tg.close();
    });
    
    console.log('Telegram Web App initialized');
  } else {
    console.log('Running in browser mode');
  }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initializeTelegramApp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);