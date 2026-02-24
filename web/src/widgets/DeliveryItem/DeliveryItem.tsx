import s from './DeliveryItem.module.scss'

interface DeliveryItemProps {
    itemImage: string
    itemName: string
    itemPrice: number
    quantity: number          // добавлено
}

export const DeliveryItem = (props: DeliveryItemProps) => {
    const totalPrice = props.itemPrice * props.quantity

    return (
        <div className={s.item}>
            <img src={props.itemImage} alt={props.itemName} />
            <div className={s.info}>
                <p className={s.name}>{props.itemName}</p>
                <p className={s.price}>{props.itemPrice} ₽</p>
                <p className={s.quantity}>{props.quantity}</p>
                <p className={s.total}>{totalPrice} ₽</p>
            </div>
        </div>
    )
}