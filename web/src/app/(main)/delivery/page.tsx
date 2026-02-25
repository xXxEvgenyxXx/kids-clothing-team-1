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

  return (
    <div className={s.deliveryPageWrapper}>
      <h1 className={s.deliveryPageTitle}>Детали доставки</h1>
      
      <form className={s.deliveryForm}>
        <div className={s.formItem}>
          <label htmlFor="name" className={s.label}>
            Ваше имя
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
            Адрес улицы
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
            Город
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
            Номер телефона
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
            Адрес электронной почты
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
          {cartItems.map((item) => (
              <DeliveryItem
                  key={item.id}
                  itemImage={item.image || '/images/placeholder.png'}
                  itemName={item.title}
                  itemPrice={item.price}
                  quantity={item.quantity}
              />
            ))
          }
        </div>
        <hr/>
        <div className={s.deliveryCostInfo}>
          <span>Доставка:</span>
          <span>0</span>
        </div>
        <hr/>
        <div className={s.deliveryCostInfo}>
          <span>Итог:</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage;