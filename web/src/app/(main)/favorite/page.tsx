import s from './FavoritePage.module.scss'
import { Button } from 'antd';
import { FavoriteItemCard } from '@/widgets/FavoriteItemCard';

const FavoritePage = () => {
    
    return (
        <div className={s.favoritePageWrapper}>
            <h1 className={s.favoriteItemsHeader}>Избранное (0)</h1>
            <div className={s.favoriteItems}>
                <FavoriteItemCard 
                    itemName="название товара"
                    itemAlt="картинка"
                    itemImage="/images/banner-image.png"
                    itemPrice={1234}
                />
                <FavoriteItemCard 
                    itemName="название товара"
                    itemAlt="картинка"
                    itemImage="/images/banner-image.png"
                    itemPrice={1234}
                />
                <FavoriteItemCard 
                    itemName="название товара"
                    itemAlt="картинка"
                    itemImage="/images/banner-image.png"
                    itemPrice={1234}
                />
                <FavoriteItemCard 
                    itemName="название товара"
                    itemAlt="картинка"
                    itemImage="/images/banner-image.png"
                    itemPrice={1234}
                />
                <FavoriteItemCard 
                    itemName="название товара"
                    itemAlt="картинка"
                    itemImage="/images/banner-image.png"
                    itemPrice={1234}
                />
                <FavoriteItemCard 
                    itemName="название товара"
                    itemAlt="картинка"
                    itemImage="/images/banner-image.png"
                    itemPrice={1234}
                />
                <FavoriteItemCard 
                    itemName="название товара"
                    itemAlt="картинка"
                    itemImage="/images/banner-image.png"
                    itemPrice={1234}
                />
                <FavoriteItemCard 
                    itemName="название товара"
                    itemAlt="картинка"
                    itemImage="/images/banner-image.png"
                    itemPrice={1234}
                />
            </div>
            <Button>Поместить все в корзину</Button>
        </div>
    );
};

export default FavoritePage;