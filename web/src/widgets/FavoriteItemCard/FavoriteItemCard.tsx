import s from './FavoriteItemCard.module.scss'
import { DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'

interface FavoriteItemCardProps {
    itemName: string,
    itemImage: string,
    itemAlt: string,
    itemPrice: number
}

export function FavoriteItemCard(props: FavoriteItemCardProps){
    return (
        <div className={s.favoriteItemCard}>
            <div className={s.favoriteItemCardImage}>
                <img 
                    src={props.itemImage}
                    alt={props.itemAlt}
                />
                <Button className={s.deleteItem} icon={<DeleteOutlined/>} />
            </div>
            <div className={s.favoriteItemCardContext}>
                <p className={s.favoriteItemCardName}>{props.itemName}</p>
                <p className={s.favoriteItemCardPrice}>{props.itemPrice} ₽</p>
                <Button className={s.addToCart} icon={<ShoppingCartOutlined/>}/>
            </div>
        </div>
    )
}