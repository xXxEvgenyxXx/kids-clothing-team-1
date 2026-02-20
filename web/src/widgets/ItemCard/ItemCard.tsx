import s from './ItemCard.module.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button } from 'antd';

interface ItemCardProps {
    itemTitle?: string,
    itemImage?: string,
    itemPrice?: number,
    itemAlt?: string
}

export function ItemCard(props: ItemCardProps) {
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
                <Button className={s.button} icon={<ShoppingCartOutlined/>}></Button>
            </div>
        </div>
    );
}