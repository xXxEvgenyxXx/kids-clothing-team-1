'use client'

import { useEffect, useState } from 'react'
import s from './FavoritePage.module.scss'
import { Button, message } from 'antd'
import { FavoriteItemCard } from '@/widgets/FavoriteItemCard'

// Тип товара в избранном (совпадает с тем, что кладем в localStorage)
interface FavoriteItem {
    id: number
    title: string
    price: number
    image: string
    // quantity не нужен, т.к. это просто список товаров
}

const FavoritePage = () => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([])

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

    // Сохранение избранного в localStorage и обновление состояния
    const saveFavorites = (updatedFavorites: FavoriteItem[]) => {
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
        setFavorites(updatedFavorites)
        window.dispatchEvent(new Event('storage')) // оповещаем другие вкладки
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
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
            const existingItem = cart.find((i: any) => i.id === item.id)
            if (existingItem) {
                existingItem.quantity += 1
            } else {
                cart.push({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    quantity: 1,
                })
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            window.dispatchEvent(new Event('storage')) // оповещаем другие вкладки
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
            const cart = JSON.parse(localStorage.getItem('cart') || '[]')
            favorites.forEach(favItem => {
                const existing = cart.find((i: any) => i.id === favItem.id)
                if (existing) {
                    existing.quantity += 1
                } else {
                    cart.push({
                        id: favItem.id,
                        title: favItem.title,
                        price: favItem.price,
                        image: favItem.image,
                        quantity: 1,
                    })
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart))
            window.dispatchEvent(new Event('storage'))
            message.success('Все товары добавлены в корзину')
        } catch (error) {
            console.error('Ошибка добавления всех товаров в корзину:', error)
            message.error('Не удалось добавить товары')
        }
    }

    // Подписка на изменения localStorage в других вкладках
    useEffect(() => {
        loadFavorites()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'favorites') {
                loadFavorites()
            }
        }
        window.addEventListener('storage', handleStorageChange)
        return () => window.removeEventListener('storage', handleStorageChange)
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
                        />
                    ))
                )}
            </div>
            <Button 
                onClick={handleAddAllToCart}
                disabled={favorites.length === 0}
            >
                Поместить все в корзину
            </Button>
        </div>
    )
}

export default FavoritePage