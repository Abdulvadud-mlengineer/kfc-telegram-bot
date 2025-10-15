const TelegramBot = require('node-telegram-bot-api');
const TOKEN = '8374958229:AAHRtvE9b3Ej1wUJ_7ZyI9FUN8xhu5Gjp60';
const bot = new TelegramBot(TOKEN, { polling: true });

// Простое меню в виде кнопок
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  const menuText = `🍗 *KFC Uzbekistan - Филиал Fayz* 🍗\n\n` +
    `*Меню:*\n` +
    `🍔 Бургеры\n` +
    `🌯 Твистеры\n` +
    `🍗 Баскеты\n` +
    `📦 Боксы\n\n` +
    `Выберите категорию:`;

  bot.sendMessage(chatId, menuText, {
    parse_mode: 'Markdown',
    reply_markup: {
      keyboard: [
        ['🍔 Бургеры', '🌯 Твистеры'],
        ['🍗 Баскеты', '📦 Боксы'],
        ['📞 Контакты', '🛒 Корзина']
      ],
      resize_keyboard: true
    }
  });
});

// Обработка кнопок
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '🍔 Бургеры') {
    showBurgers(chatId);
  } else if (text === '🌯 Твистеры') {
    showTwisters(chatId);
  } else if (text === '🍗 Баскеты') {
    showBaskets(chatId);
  } else if (text === '📦 Боксы') {
    showBoxes(chatId);
  } else if (text === '📞 Контакты') {
    bot.sendMessage(chatId, `📞 *KFC Fayz*\n\n📍 Адрес: ул. Примерная, 123\n📱 Телефон: +998 XX XXX XX XX\n⏰ Время работы: 10:00-23:00`, { parse_mode: 'Markdown' });
  } else if (text === '🛒 Корзина') {
    bot.sendMessage(chatId, 'Корзина пока пуста. Добавьте товары из меню!');
  }
});

function showBurgers(chatId) {
  const burgersText = `🍔 *Бургеры*\n\n` +
    `1. БИГ САНДЕРС Б - 36,000 сум\n` +
    `2. САНДЕРС Б - 30,000 сум\n` +
    `3. ЧИЗ САНДЕРС - 32,000 сум\n\n` +
    `Для заказа напишите номер товара и количество.`;

  bot.sendMessage(chatId, burgersText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '➕ Добавить БИГ САНДЕРС', callback_data: 'add_burger_1' }],
        [{ text: '➕ Добавить САНДЕРС Б', callback_data: 'add_burger_2' }],
        [{ text: '🔙 Назад', callback_data: 'back_to_menu' }]
      ]
    }
  });
}

function showTwisters(chatId) {
  const twistersText = `🌯 *Твистеры*\n\n` +
    `1. БОКСМАСТЕР ОРИГИНАЛЬНЫЙ - 34,000 сум\n` +
    `2. ТВИСТЕР ОСТРЫЙ - 32,000 сум\n` +
    `3. БОКСМАСТЕР СЫРНЫЙ - 36,000 сум`;

  bot.sendMessage(chatId, twistersText, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [{ text: '➕ Добавить БОКСМАСТЕР', callback_data: 'add_twister_1' }],
        [{ text: '🔙 Назад', callback_data: 'back_to_menu' }]
      ]
    }
  });
}

function showBaskets(chatId) {
  // Аналогично для баскетов
}

function showBoxes(chatId) {
  // Аналогично для боксов
}

// Обработка inline кнопок
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  
  if (callbackQuery.data === 'back_to_menu') {
    bot.deleteMessage(chatId, msg.message_id);
    // Переотправляем меню
    bot.sendMessage(chatId, 'Возвращаемся в меню...', {
      reply_markup: {
        keyboard: [
          ['🍔 Бургеры', '🌯 Твистеры'],
          ['🍗 Баскеты', '📦 Боксы'],
          ['📞 Контакты', '🛒 Корзина']
        ],
        resize_keyboard: true
      }
    });
  } else if (callbackQuery.data.startsWith('add_')) {
    bot.answerCallbackQuery(callbackQuery.id, { text: 'Товар добавлен в корзину! 🛒' });
  }
});

console.log('KFC Bot is running...');