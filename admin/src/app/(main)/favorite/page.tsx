'use client'

import { useEffect, useState } from 'react'
import s from './FavoritePage.module.scss'
import { Button, message } from 'antd'
import { FavoriteItemCard } from '@/widgets/FavoriteItemCard'

// Тип товара в избранном
interface FavoriteItem {
    id: number
    title: string
    price: number
    image: string
}

// Тип товара в корзине
interface CartItem {
    id: number
    title: string
    price: number
    image: string
    quantity: number
}

const FavoritePage = () => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([])
    const [cartItems, setCartItems] = useState<CartItem[]>([]) // состояние для корзины

    // Загрузка избранного из localStorage
    const loadFavorites = () => {
        try {
            const stored = localStorage.getItem('favorites')
            const items = stored ? JSON.parse(stored) : []
            setFavorites(items)
        } catch (error) {
            console.error('Ошибка загрузки избранного:', error)
            message.error('Не удалось загрузить избранное')
        }
    }

    // Загрузка корзины из localStorage
    const loadCart = () => {
        try {
            const stored = localStorage.getItem('cart')
            const items = stored ? JSON.parse(stored) : []
            setCartItems(items)
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error)
        }
    }

    // Сохранение избранного в localStorage
    const saveFavorites = (updatedFavorites: FavoriteItem[]) => {
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
        setFavorites(updatedFavorites)
        window.dispatchEvent(new Event('favoritesUpdated'))
    }

    // Проверка, находится ли товар в корзине
    const isItemInCart = (itemId: number): boolean => {
        return cartItems.some(item => item.id === itemId)
    }

    // Проверка, все ли товары из избранного уже в корзине
    const areAllItemsInCart = (): boolean => {
        if (favorites.length === 0) return false
        return favorites.every(favItem => isItemInCart(favItem.id))
    }

    // Удаление товара из избранного
    const handleRemove = (id: number) => {
        const updated = favorites.filter(item => item.id !== id)
        saveFavorites(updated)
        message.success('Товар удалён из избранного')
    }

    // Добавление товара в корзину
    const handleAddToCart = (item: FavoriteItem) => {
        try {
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
            const existingItem = currentCart.find((i: any) => i.id === item.id)
            
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                currentCart.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    quantity: 1,
                })
            }
            
            localStorage.setItem('cart', JSON.stringify(currentCart))
            setCartItems(currentCart) // обновляем состояние корзины
            window.dispatchEvent(new Event('storage'))
            message.success('Товар добавлен в корзину')
        } catch (error) {
            console.error('Ошибка добавления в корзину:', error)
            message.error('Не удалось добавить товар в корзину')
        }
    }

    // Добавление всех товаров из избранного в корзину
    const handleAddAllToCart = () => {
        if (favorites.length === 0) {
            message.info('Избранное пусто')
            return
        }

        try {
            const currentCart = JSON.parse(localStorage.getItem('cart') || '[]')
            
            favorites.forEach(favItem => {
                const existing = currentCart.find((i: any) => i.id === favItem.id)
                if (existing) {
                    existing.quantity += 1
                } else {
                    currentCart.push({
                        id: favItem.id,
                        title: favItem.title,
                        price: favItem.price,
                        image: favItem.image,
                        quantity: 1,
                    })
                }
            })
            
            localStorage.setItem('cart', JSON.stringify(currentCart))
            setCartItems(currentCart) // обновляем состояние корзины
            window.dispatchEvent(new Event('storage'))
            message.success('Все товары добавлены в корзину')
        } catch (error) {
            console.error('Ошибка добавления всех товаров в корзину:', error)
            message.error('Не удалось добавить товары')
        }
    }

    // Подписка на изменения localStorage
    useEffect(() => {
        loadFavorites()
        loadCart()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'favorites') {
                loadFavorites()
            }
            if (e.key === 'cart') {
                loadCart()
            }
        }

        // Слушаем кастомные события для обновления на этой же странице
        const handleFavoritesUpdated = () => loadFavorites()
        const handleCartUpdated = () => loadCart()

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('favoritesUpdated', handleFavoritesUpdated)
        window.addEventListener('cartUpdated', handleCartUpdated)
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('favoritesUpdated', handleFavoritesUpdated)
            window.removeEventListener('cartUpdated', handleCartUpdated)
        }
    }, [])

    return (
        <div className={s.favoritePageWrapper}>
            <h1 className={s.favoriteItemsHeader}>
                Избранное ({favorites.length})
            </h1>
            <div className={s.favoriteItems}>
                {favorites.length === 0 ? (
                    <p>Список избранного пуст</p>
                ) : (
                    favorites.map(item => (
                        <FavoriteItemCard
                            key={item.id}
                            id={item.id}
                            itemName={item.title}
                            itemImage={item.image || '/images/placeholder.png'}
                            itemAlt={item.title}
                            itemPrice={item.price}
                            onRemove={() => handleRemove(item.id)}
                            onAddToCart={() => handleAddToCart(item)}
                            isInCart={isItemInCart(item.id)} // передаем проверку
                        />
                    ))
                )}
            </div>
            <Button 
                onClick={handleAddAllToCart}
                disabled={favorites.length === 0 || areAllItemsInCart()} // кнопка неактивна, если все товары уже в корзине
            >
                Поместить все в корзину
            </Button>
        </div>
    )
}

export default FavoritePage