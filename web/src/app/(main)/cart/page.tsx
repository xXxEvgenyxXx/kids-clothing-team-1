// app/cart/page.tsx (или ваш путь)
'use client'

import { useEffect, useState } from 'react'
import s from './cart.module.scss'
import { CartItem } from '@/widgets/CartItem'
import { Button, Input, message } from 'antd'

interface CartItemData {
    id: number
    title: string
    price: number
    image: string
    quantity: number
}

const CartPage = () => {
    const [cartItems, setCartItems] = useState<CartItemData[]>([])

    // Загрузка корзины из localStorage
    const loadCart = () => {
        try {
            const stored = localStorage.getItem('cart')
            const items = stored ? JSON.parse(stored) : []
            setCartItems(items)
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error)
            message.error('Не удалось загрузить корзину')
        }
    }

    // Сохранение корзины в localStorage и обновление состояния
    const saveCart = (updatedCart: CartItemData[]) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCartItems(updatedCart)
        window.dispatchEvent(new Event('storage')) // синхронизация с другими вкладками
    }

    // Увеличение количества товара
    const handleIncrease = (id: number) => {
        const updated = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
        saveCart(updated)
    }

    // Уменьшение количества товара (минимум 1)
    const handleDecrease = (id: number) => {
        const updated = cartItems.map(item =>
            item.id === id && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ).filter(item => item.quantity > 0) // если удаляем при 0, можно фильтровать
        saveCart(updated)
    }

    // Удаление товара из корзины
    const handleRemove = (id: number) => {
        const updated = cartItems.filter(item => item.id !== id)
        saveCart(updated)
        message.success('Товар удалён из корзины')
    }

    // Подписка на изменения localStorage в других вкладках
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

    // Вычисление итоговой суммы
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryCost = totalPrice > 10000 ? 0 : 1000;
    const finalTotal = cartItems.length > 0 ? totalPrice + deliveryCost : 0;
    const isEmpty = cartItems.length === 0;

    return (
        <div className={s.cartPageWrapper}>
            <div className={s.cartItemsWrapper}>
                <div className={s.cartItemsHeader}>
                    <h2 className={s.cartItemCategory}>Товар</h2>
                    <h2 className={s.cartItemCategory}>Цена</h2>
                    <h2 className={s.cartItemCategory}>Количество</h2>
                    <h2 className={s.cartItemCategory}>Сумма</h2>
                </div>
                <div className={s.cartItems}>
                    {cartItems.length === 0 ? (
                        <p>Корзина пуста</p>
                    ) : (
                        cartItems.map(item => (
                            <CartItem
                                key={item.id}
                                itemImage={item.image || '/images/placeholder.png'}
                                itemName={item.title}
                                itemPrice={item.price}
                                quantity={item.quantity}
                                onIncrease={() => handleIncrease(item.id)}
                                onDecrease={() => handleDecrease(item.id)}
                                onRemove={() => handleRemove(item.id)} // передаём функцию удаления
                            />
                        ))
                    )}
                </div>
            </div>
            <div className={s.cartActionsWrapper}>
                <div className={s.bonusCodeWrapper}>
                    <Input placeholder="Бонусный код" />
                    <Button type="primary">Активировать бонус</Button>
                </div>
                <div className={s.goToDelivery}>
                    <h3>Итоговая сумма</h3>
                    <div className={s.sumDescription}>
                        <p>Доставка: {deliveryCost} ₽</p>
                        <hr/>
                        <p>Итог: {finalTotal} ₽</p>
                    </div>
                    <Button disabled={isEmpty} type="primary" href="/delivery" className={s.goToDeliveryButton}>
                        Перейти к деталям доставки
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CartPage