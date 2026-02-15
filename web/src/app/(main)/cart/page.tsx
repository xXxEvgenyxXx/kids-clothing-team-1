import s from './cart.module.scss'
import { CartItem } from '@/widgets/CartItem';
import { Button, Input } from 'antd';

const CartPage = () => {
    
    return (
        <div className={s.cartPageWrapper}>
            <div className={s.cartItemsWrapper}>
                <div className={s.cartItemsHeader}>
                    <h2 className={s.cartItemCategory}>Товар</h2>
                    <h2 className={s.cartItemCategory}>Цена</h2>
                    <h2 className={s.cartItemCategory}>Количество</h2>
                    <h2 className={s.cartItemCategory}>Сумма</h2>
                </div>
                <div className={s.cartItems}>
                    <CartItem 
                        itemImage="/images/banner-image.png"
                        itemName="название товара"
                        itemPrice={1234}
                        initialQuantity={2}
                    />
                    <CartItem 
                        itemImage="/images/banner-image.png"
                        itemName="название товара"
                        itemPrice={1234}
                        initialQuantity={2}
                    />
                    <CartItem 
                        itemImage="/images/banner-image.png"
                        itemName="название товара"
                        itemPrice={1234}
                        initialQuantity={2}
                    />
                </div>
            </div>
            <div className={s.cartActionsWrapper}>
                <div className={s.bonusCodeWrapper}>
                    <Input placeholder="Бонусный код" />
                    <Button type="primary">Активировать бонус</Button>
                </div>
                <div className={s.goToDelivery}>
                    <h3>Итоговая сумма</h3>
                    <div className={s.sumDescription}>
                        <p>Доставка: 0</p>
                        <hr/>
                        <p>Итог: 0</p>
                    </div>
                    <Button type="primary" href="/delivery" className={s.goToDeliveryButton}>Перейти к деталям доставки</Button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;