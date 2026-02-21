import s from './FavoriteItemCard.module.scss'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface FavoriteItemCardProps {
    id: number
    itemName: string
    itemImage: string
    itemAlt: string
    itemPrice: number
    onRemove: () => void
    onAddToCart: () => void
}

export function FavoriteItemCard(props: FavoriteItemCardProps){
    return (
        <div className={s.favoriteItemCard}>
            <div className={s.favoriteItemCardImage}>
                <img 
                    src={props.itemImage}
                    alt={props.itemAlt}
                />
                <Button 
                    className={s.deleteItem} 
                    icon={<DeleteOutlined/>} 
                    onClick={props.onRemove}
                />
            </div>
            <div className={s.favoriteItemCardContext}>
                <p className={s.favoriteItemCardName}>{props.itemName}</p>
                <p className={s.favoriteItemCardPrice}>{props.itemPrice} ₽</p>
                <Button 
                    className={s.addToCart} 
                    icon={<ShoppingCartOutlined/>}
                    onClick={props.onAddToCart}
                />
            </div>
        </div>
    )
}