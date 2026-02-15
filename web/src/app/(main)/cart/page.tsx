import s from './cart.module.scss'

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

                </div>
            </div>
            <div className={s.cartActionsWrapper}>

            </div>
        </div>
    );
};

export default CartPage;