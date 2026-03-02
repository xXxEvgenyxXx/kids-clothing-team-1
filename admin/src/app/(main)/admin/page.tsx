'use client';

import { useEffect, useState } from 'react';
import s from './admin.module.scss';
import { StatCard } from '@/widgets/StatCard';
import { stats as statsConfig } from '@/constants/stats';

// Типы данных (можно вынести в отдельный файл)
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    oldPrice: number | null;
    categoryId: number;
    ageCategory: string;
    sizes: string[];
    colors: string[];
    material: string;
    images: string[];
    inStock: number;
    rating: number;
    reviewsCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface ShippingAddress {
    fullAddress: string;
    zip: string;
}

export type OrderStatus = 'pending' | 'paid' | 'shipping' | 'delivered' | 'cancelled';

export interface Order {
    id: number;
    userId: number;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    createdAt: string;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
}

const AdminPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productsRes, ordersRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/orders')
                ]);
                const productsData = await productsRes.json();
                const ordersData = await ordersRes.json();
                setProducts(productsData);
                setOrders(ordersData);
            } catch (error) {
                console.error('Ошибка загрузки данных:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Получение данных из localStorage (корзина и избранное)
        const getCartCount = () => {
            try {
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                // Если в корзине объекты с quantity — суммируем, иначе считаем длину массива
                const total = cart.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0);
                setCartCount(total);
            } catch {
                setCartCount(0);
            }
        };

        const getWishlistCount = () => {
            try {
                const wishlist = JSON.parse(localStorage.getItem('favorites') || '[]');
                setWishlistCount(wishlist.length);
            } catch {
                setWishlistCount(0);
            }
        };

        getCartCount();
        getWishlistCount();
    }, []);

    // Вычисление статистик на основе загруженных данных
    const totalProducts = products.length;
    const activeOrders = orders.filter(o => o.status === 'paid' || o.status === 'shipping').length;
    const completedOrders = orders.filter(o => o.status === 'delivered').length;
    const totalStock = products.reduce((acc, p) => acc + (p.inStock || 0), 0);
    const lowStock = products.filter(p => p.inStock <= 10).length;
    const outOfStock = products.filter(p => p.inStock === 0).length;

    // Формирование итогового массива карточек с заполненными count
    const stats = statsConfig.map(stat => {
        switch (stat.name) {
            case "Всего товаров": return { ...stat, count: totalProducts };
            case "В корзинах": return { ...stat, count: cartCount };
            case "В избранном": return { ...stat, count: wishlistCount };
            case "Активные заказы": return { ...stat, count: activeOrders };
            case "Выполнено": return { ...stat, count: completedOrders };
            case "Осталось на складе": return { ...stat, count: totalStock };
            case "Заканчиваются": return { ...stat, count: lowStock };
            case "Нет в наличии": return { ...stat, count: outOfStock };
            default: return { ...stat, count: 0 };
        }
    });

    return (
        <div className={s.adminPageWrapper}>
            <aside>{/* боковое меню */}</aside>
            <div className={s.adminStatsWrapper}>
                <h1>Общая статистика</h1>
                <div className={s.adminStats}>
                    {loading ? (
                        <p>Загрузка...</p>
                    ) : (
                        stats.map(stat => (
                            <StatCard
                                key={stat.name}
                                icon={stat.icon}
                                title={stat.name}
                                count={stat.count}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;