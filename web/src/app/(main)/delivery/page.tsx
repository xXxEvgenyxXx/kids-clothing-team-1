"use client"

import s from './delivery.module.scss';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { DeliveryItem } from '@/widgets/DeliveryItem';

interface CartItemData {
    id: number
    title: string
    price: number
    image: string
    quantity: number
}

const DeliveryPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cartItems, setCartItems] = useState<CartItemData[]>([])

  const loadCart = () => {
        try {
            const stored = localStorage.getItem('cart')
            const items = stored ? JSON.parse(stored) : []
            setCartItems(items)
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error)
        }
    }

    useEffect(() => {
        loadCart()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cart') {
                loadCart()
            }
        }
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
    }, [])
    

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};
    
    // Проверка обязательных полей
    const requiredFields = [
      { name: 'name', message: 'Пожалуйста, введите ваше имя!' },
      { name: 'street', message: 'Пожалуйста, введите адрес улицы!' },
      { name: 'city', message: 'Пожалуйста, введите город!' },
      { name: 'phone', message: 'Пожалуйста, введите номер телефона!' },
      { name: 'email', message: 'Пожалуйста, введите адрес электронной почты!' }
    ];

    requiredFields.forEach(field => {
      if (!formData.get(field.name)) {
        newErrors[field.name] = field.message;
      }
    });

    // Проверка email
    const email = formData.get('email') as string;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Неверный формат электронной почты!';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (validateForm(formData)) {
      // Сбор данных в объект
      const data = Object.fromEntries(formData.entries());
      console.log('Данные формы:', data);
      
      // Здесь ваша логика отправки
      alert('Форма успешно отправлена!');
    }
  };

  return (
    <>
      <h1>Детали доставки</h1>
      
      <form onSubmit={handleSubmit} className={s.registrationForm}>
        {/* Поле имени */}
        <div className={s.formItem}>
          <label htmlFor="name" className={s.label}>
            Ваше имя * {errors.name && <span className={s.error}>{errors.name}</span>}
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Иван"
            status={errors.name ? 'error' : ''}
          />
        </div>

        <div className={s.formItem}>
          <label htmlFor="company" className={s.label}>
            Наименование компании
          </label>
          <Input
            id="company"
            name="company"
            placeholder="ООО 'Пример'"
          />
        </div>

        <div className={s.formItem}>
          <label htmlFor="street" className={s.label}>
            Адрес улицы * {errors.street && <span className={s.error}>{errors.street}</span>}
          </label>
          <Input
            id="street"
            name="street"
            placeholder="Улица Ленина, 15"
            status={errors.street ? 'error' : ''}
          />
        </div>

        <div className={s.formItem}>
          <label htmlFor="apartment" className={s.label}>
            Квартира(этаж)
          </label>
          <Input
            id="apartment"
            name="apartment"
            placeholder="Квартира 10, 3 этаж"
          />
        </div>

        <div className={s.formItem}>
          <label htmlFor="city" className={s.label}>
            Город * {errors.city && <span className={s.error}>{errors.city}</span>}
          </label>
          <Input
            id="city"
            name="city"
            placeholder="Москва"
            status={errors.city ? 'error' : ''}
          />
        </div>

        <div className={s.formItem}>
          <label htmlFor="phone" className={s.label}>
            Номер телефона * {errors.phone && <span className={s.error}>{errors.phone}</span>}
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="+7 (999) 123-45-67"
            status={errors.phone ? 'error' : ''}
          />
        </div>

        <div className={s.formItem}>
          <label htmlFor="email" className={s.label}>
            Адрес электронной почты * {errors.email && <span className={s.error}>{errors.email}</span>}
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            status={errors.email ? 'error' : ''}
          />
        </div>
      </form>
      <div className={s.deliveryDetails}>
        <div className={s.deliveryItems}>
            {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                cartItems.map(item => (
                    <DeliveryItem
                        key={item.id}
                        itemImage={item.image || '/images/placeholder.png'}
                        itemName={item.title}
                        itemPrice={item.price}
                        quantity={item.quantity}
                    />
                ))
            )}
        </div>
      </div>
    </>
  );
};

export default DeliveryPage;