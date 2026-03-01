// Общий интерфейс для сущности с id
export interface Identifiable {
  id: number | string;
}

export interface Product extends Identifiable {
  name: string;
  price: number;
  description?: string;
  createdAt?: string;
  // другие поля по необходимости
}

export interface Category extends Identifiable {
  name: string;
  // ...
}

export interface Order extends Identifiable {
  userId: number;
  items: Array<{ productId: number; quantity: number }>;
  total: number;
  status: string;
  createdAt: string;
  // ...
}

export interface User extends Identifiable {
  email: string;
  name: string;
  role: 'admin' | 'user';
  // ...
}