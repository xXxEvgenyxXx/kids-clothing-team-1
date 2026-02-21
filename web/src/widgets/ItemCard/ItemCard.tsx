import { useEffect, useState } from 'react';
import s from './ItemCard.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface ItemCardProps {
    id: number;
    itemTitle?: string;
    itemImage?: string;
    itemPrice?: number;
    itemAlt?: string;
}

export function ItemCard(props: ItemCardProps) {
    const [isInCart, setIsInCart] = useState(false);

    // Функция для проверки наличия товара в корзине
    const checkIfInCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const exists = cart.some((item: any) => item.id === props.id);
            setIsInCart(exists);
        } catch (error) {
            console.error('Ошибка при чтении корзины:', error);
        }
    };

    // Функция для логирования содержимого корзины
    const logCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            console.log('Текущая корзина (localStorage):', cart);
        } catch (error) {
            console.error('Ошибка при логировании корзины:', error);
        }
    };

    // При монтировании проверяем статус и логируем корзину
    useEffect(() => {
        checkIfInCart();
        logCart(); // логируем корзину при загрузке компонента
    }, []);

    // Подписка на изменения localStorage (если корзина меняется в другой вкладке)
    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cart') {
                checkIfInCart();
                logCart(); // логируем при изменении из другой вкладки
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleAddToCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            const existingItemIndex = cart.findIndex((item: any) => item.id === props.id);
            
            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push({
                    id: props.id,
                    title: props.itemTitle,
                    price: props.itemPrice,
                    image: props.itemImage,
                    quantity: 1,
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            
            // После добавления обновляем состояние и логируем
            setIsInCart(true);
            logCart(); // логируем после добавления
            
            // Отправляем кастомное событие для обновления других компонентов на этой же странице
            window.dispatchEvent(new Event('cartUpdated'));
            
        } catch (error) {
            console.error('Ошибка при работе с корзиной:', error);
        }
    };

    return (
        <div className={s.itemCard}>
            <div className={s.itemImage}>
                {props.itemImage && (
                    <img
                        src={props.itemImage}
                        alt={props.itemAlt || "изображение товара"}
                    />
                )}
            </div>
            <div className={s.itemInfo}>
                <h4 className={s.itemTitle}>{props.itemTitle}</h4>
                <p className={s.itemPrice}>{props.itemPrice} ₽</p>
                <Button 
                    className={s.button} 
                    icon={<ShoppingCartOutlined/>} 
                    onClick={handleAddToCart}
                    disabled={isInCart}
                />
            </div>
        </div>
    );
}