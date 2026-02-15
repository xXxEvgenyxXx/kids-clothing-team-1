"use client"
import s from './CartItem.module.scss'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useState } from 'react'

interface CartItemProps {
    itemImage: string,
    itemName: string,
    itemPrice: number,
    initialQuantity: number
}

export function CartItem(props: CartItemProps) {
    const [quantity, setQuantity] = useState(props.initialQuantity);

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    return (
        <div className={s.cartItem}>
            <div className={s.cartItemName}>
                <img className={s.cartItemImage} src={props.itemImage} alt="картинка не загрузилась" />
                <p>{props.itemName}</p>
            </div>
            <p className={s.cartItemPrice}>{props.itemPrice}</p>
            <div className={s.cartItemQuantity}>
                <p>{quantity}</p>
                <div className={s.changeItemQuantity}>
                    <Button 
                        type="text" 
                        className={s.addItemQuantity} 
                        icon={<UpOutlined />} 
                        onClick={increaseQuantity}
                    />
                    <Button 
                        type="text" 
                        className={s.removeItemQuantity} 
                        icon={<DownOutlined />} 
                        onClick={decreaseQuantity}
                    />
                </div>
            </div>
            <p>{props.itemPrice * quantity}</p>
        </div>
    );
}