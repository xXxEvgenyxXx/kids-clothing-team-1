"use client";

import s from './delivery.module.scss';
import { Input, Button, Radio, message } from 'antd';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DeliveryItem } from '@/widgets/DeliveryItem';

interface CartItemData {
    id: number;
    title: string;
    price: number;
    image: string;
    quantity: number;
}

const DeliveryPage = () => {
    const router = useRouter();
    
    // Form fields state
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [street, setStreet] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'payment'>('card');

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [cartItems, setCartItems] = useState<CartItemData[]>([]);
    const [loading, setLoading] = useState(false);

    // Load cart from localStorage
    const loadCart = () => {
        try {
            const stored = localStorage.getItem('cart');
            const items = stored ? JSON.parse(stored) : [];
            setCartItems(items);
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error);
        }
    };

    useEffect(() => {
        loadCart();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cart') {
                loadCart();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    // Calculations
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCost = totalPrice > 10000 ? 0 : 1000;
    const finalTotal = cartItems.length > 0 ? totalPrice + deliveryCost : 0;

    // Validation
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!name.trim()) newErrors.name = 'Имя обязательно';
        if (!street.trim()) newErrors.street = 'Адрес обязателен';
        if (!city.trim()) newErrors.city = 'Город обязателен';
        if (!phone.trim()) newErrors.phone = 'Телефон обязателен';
        if (!email.trim()) {
            newErrors.email = 'Email обязателен';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Некорректный email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit handler
    const handleSubmit = async () => {
        if (!validateForm()) return;
        if (cartItems.length === 0) {
            message.warning('Корзина пуста');
            return;
        }

        setLoading(true);

        // Build order object according to the required format
        const order = {
            userId: 1,
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
            total: finalTotal,
            status: 'paid',
            createdAt: new Date().toISOString(),
            shippingAddress: {
                fullAddress: `${street}, ${apartment ? 'кв/этаж ' + apartment : ''}, г. ${city}`.trim(),
                zip: zip || '',
            },
            paymentMethod: paymentMethod === 'card' ? 'card' : 'cash',
        };

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order),
            });

            if (!response.ok) {
                throw new Error('Ошибка при отправке заказа');
            }

            // Success: clear cart
            localStorage.removeItem('cart');
            setCartItems([]);
            
            // Show success message
            message.success('Заказ успешно оформлен!');
            
            // Redirect to homepage after a short delay to show the success message
            setTimeout(() => {
                router.push('/');
            }, 1500);

        } catch (error) {
            console.error(error);
            message.error('Не удалось оформить заказ. Попробуйте позже.');
            setLoading(false);
        }
    };

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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иван"
                        status={errors.name ? 'error' : ''}
                    />
                    {errors.name && <div className={s.error}>{errors.name}</div>}
                </div>

                <div className={s.formItem}>
                    <label htmlFor="company" className={s.label}>
                        Наименование компании
                    </label>
                    <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="ООО 'Пример'"
                    />
                </div>

                <div className={s.formItem}>
                    <label htmlFor="street" className={s.label}>
                        Адрес улицы
                    </label>
                    <Input
                        id="street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Улица Ленина, 15"
                        status={errors.street ? 'error' : ''}
                    />
                    {errors.street && <div className={s.error}>{errors.street}</div>}
                </div>

                <div className={s.formItem}>
                    <label htmlFor="apartment" className={s.label}>
                        Квартира(этаж)
                    </label>
                    <Input
                        id="apartment"
                        value={apartment}
                        onChange={(e) => setApartment(e.target.value)}
                        placeholder="Квартира 10, 3 этаж"
                    />
                </div>

                <div className={s.formItem}>
                    <label htmlFor="city" className={s.label}>
                        Город
                    </label>
                    <Input
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Москва"
                        status={errors.city ? 'error' : ''}
                    />
                    {errors.city && <div className={s.error}>{errors.city}</div>}
                </div>

                <div className={s.formItem}>
                    <label htmlFor="zip" className={s.label}>
                        Почтовый индекс
                    </label>
                    <Input
                        id="zip"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                        placeholder="101000"
                    />
                </div>

                <div className={s.formItem}>
                    <label htmlFor="phone" className={s.label}>
                        Номер телефона
                    </label>
                    <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (999) 123-45-67"
                        status={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <div className={s.error}>{errors.phone}</div>}
                </div>

                <div className={s.formItem}>
                    <label htmlFor="email" className={s.label}>
                        Адрес электронной почты
                    </label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        status={errors.email ? 'error' : ''}
                    />
                    {errors.email && <div className={s.error}>{errors.email}</div>}
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
                    ))}
                </div>
                <div className={s.deliveryCostInfo}>
                    Доставка: {deliveryCost} ₽
                </div>
                <div className={s.deliveryCostInfo}>
                    Итог: {finalTotal} ₽
                </div>
                <Radio.Group
                    className={s.selectPayment}
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    options={[
                        { value: 'card', label: 'Банковской картой' },
                        { value: 'payment', label: 'Наличными' },
                    ]}
                />
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={cartItems.length === 0}
                >
                    Подтвердить заказ
                </Button>
            </div>
        </div>
    );
};

export default DeliveryPage;