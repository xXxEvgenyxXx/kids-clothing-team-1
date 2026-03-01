// widgets/CartItem/CartItem.tsx
"use client"
import s from './CartItem.module.scss'
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface CartItemProps {
    itemImage: string
    itemName: string
    itemPrice: number
    quantity: number                // текущее количество
    onIncrease: () => void          // колбэк увеличения
    onDecrease: () => void          // колбэк уменьшения
    onRemove?: () => void           // опционально – удаление товара
}

export function CartItem(props: CartItemProps) {
    return (
        <div className={s.cartItem}>
            <div className={s.cartItemName}>
                <img className={s.cartItemImage} src={props.itemImage} alt="картинка не загрузилась" />
                <p>{props.itemName}</p>
            </div>
            <p className={s.cartItemPrice}>{props.itemPrice}</p>
            <div className={s.cartItemQuantity}>
                <p>{props.quantity}</p>
                <div className={s.changeItemQuantity}>
                    <Button 
                        type="text" 
                        className={s.addItemQuantity} 
                        icon={<UpOutlined />} 
                        onClick={props.onIncrease}
                    />
                    <Button 
                        type="text" 
                        className={s.removeItemQuantity} 
                        icon={<DownOutlined />} 
                        onClick={props.onDecrease}
                    />
                </div>
            </div>
            <p>{props.itemPrice * props.quantity}</p>
            <Button 
                icon={<DeleteOutlined />} 
                onClick={props.onRemove}   // добавляем вызов удаления
                danger                      // опционально: красный цвет для кнопки удаления
            />
        </div>
    )
}