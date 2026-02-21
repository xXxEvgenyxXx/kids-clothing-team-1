import { useEffect, useState } from 'react';
import s from './ItemCard.module.scss';
import { ShoppingCartOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
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
    const [isInFav, setIsInFav] = useState(false);

    // --- Корзина ---
    const checkIfInCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const exists = cart.some((item: any) => item.id === props.id);
            setIsInCart(exists);
        } catch (error) {
            console.error('Ошибка при чтении корзины:', error);
        }
    };

    const logCart = () => {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            console.log('Текущая корзина (localStorage):', cart);
        } catch (error) {
            console.error('Ошибка при логировании корзины:', error);
        }
    };

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
            setIsInCart(true);
            logCart();
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Ошибка при работе с корзиной:', error);
        }
    };

    // --- Избранное ---
    const checkIfInFav = () => {
        try {
            const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
            const exists = fav.some((item: any) => item.id === props.id);
            setIsInFav(exists);
        } catch (error) {
            console.error('Ошибка при чтении избранного:', error);
        }
    };

    const handleToggleFav = () => {
        try {
            const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
            let newFav;
            if (isInFav) {
                // Удаляем
                newFav = fav.filter((item: any) => item.id !== props.id);
            } else {
                // Добавляем
                newFav = [...fav, {
                    id: props.id,
                    title: props.itemTitle,
                    price: props.itemPrice,
                    image: props.itemImage,
                }];
            }
            localStorage.setItem('favorites', JSON.stringify(newFav));
            setIsInFav(!isInFav);
            console.log('Избранное обновлено:', newFav);
            window.dispatchEvent(new Event('favoritesUpdated'));
        } catch (error) {
            console.error('Ошибка при работе с избранным:', error);
        }
    };

    // Проверка при монтировании и подписка на изменения localStorage
    useEffect(() => {
        checkIfInCart();
        checkIfInFav();
        logCart(); // для отладки корзины
    }, []);

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cart') {
                checkIfInCart();
                logCart();
            }
            if (e.key === 'favorites') {
                checkIfInFav();
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <div className={s.itemCard}>
            <div className={s.itemImage}>
                <Button 
                    className={s.addToFav} 
                    icon={isInFav ? <HeartFilled /> : <HeartOutlined />}
                    onClick={handleToggleFav}
                />
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