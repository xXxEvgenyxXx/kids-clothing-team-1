import s from './ItemCard.module.scss';

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
                        style={{ width: '100%', height: 'auto' }}
                    />
                )}
            </div>
            <div className={s.itemInfo}>
                <h4>{props.itemTitle}</h4>
                <p>{props.itemPrice} ₽</p>
            </div>
        </div>
    );
}