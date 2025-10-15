export const categories = [
  { id: 'all', name: 'Все категории' },
  { id: 'burgers', name: 'Бургеры' },
  { id: 'twisters', name: 'Твистеры' },
  { id: 'baskets', name: 'Баскеты' },
  { id: 'saucy', name: 'Сочная курочка' },
  { id: 'boxes', name: 'Боксы' }
];

export const products = [
  // Бургеры
  {
    id: 1,
    name: 'БИГ САНДЕРС Б',
    price: 36000,
    category: 'burgers',
    image: '🍔',
    description: 'Большой бургер с куриной котлетой'
  },
  {
    id: 2,
    name: 'САНДЕРС Б',
    price: 30000,
    category: 'burgers',
    image: '🍔',
    description: 'Классический бургер'
  },
  {
    id: 3,
    name: 'ЧИЗ САНДЕРС',
    price: 32000,
    category: 'burgers',
    image: '🍔',
    description: 'Бургер с сыром'
  },

  // Твистеры
  {
    id: 4,
    name: 'БОКСМАСТЕР ОРИГИНАЛЬНЫЙ',
    price: 34000,
    category: 'twisters',
    image: '🌯',
    description: 'Оригинальный твистер'
  },
  {
    id: 5,
    name: 'ТВИСТЕР ОСТРЫЙ',
    price: 32000,
    category: 'twisters',
    image: '🌯',
    description: 'Острый твистер'
  },
  {
    id: 6,
    name: 'БОКСМАСТЕР СЫРНЫЙ',
    price: 36000,
    category: 'twisters',
    image: '🌯',
    description: 'Сырный боксмастер'
  },

  // Баскеты
  {
    id: 7,
    name: 'БАСКЕТ 5 ШТУК',
    price: 45000,
    category: 'baskets',
    image: '🍗',
    description: '5 кусочков курочки'
  },
  {
    id: 8,
    name: 'БАСКЕТ 10 ШТУК',
    price: 80000,
    category: 'baskets',
    image: '🍗',
    description: '10 кусочков курочки'
  },

  // Сочная курочка
  {
    id: 9,
    name: 'СТРИПСЫ 4 ШТ',
    price: 22000,
    category: 'saucy',
    image: '🍖',
    description: '4 сочных стрипса'
  },
  {
    id: 10,
    name: 'КРЫЛЬЯ 6 ШТ',
    price: 28000,
    category: 'saucy',
    image: '🍗',
    description: '6 куриных крыльев'
  },

  // Боксы
  {
    id: 11,
    name: 'БОКС С ТВИСТЕРОМ',
    price: 42000,
    category: 'boxes',
    image: '📦',
    description: 'Бокс с твистером и картошкой'
  },
  {
    id: 12,
    name: 'БОКС С БУРГЕРОМ',
    price: 38000,
    category: 'boxes',
    image: '📦',
    description: 'Бокс с бургером и напитком'
  }
];

export const branchInfo = {
  name: "KFC Fayz",
  address: "Филиал Fayz",
  workingHours: "10:00 - 23:00"
};