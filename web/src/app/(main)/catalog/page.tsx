import s from './catalog.module.scss'
import { ItemCard } from '@/widgets/ItemCard/ItemCard';

const CatalogPage = () => {
    
    return (
        <div className={s.catalogPageWrapper}>
            <section className={s.filtersSection}>
                <h2>Фильтры</h2>
            </section>
            <section className={s.itemsSection}>
                <h1 className={s.itemsHeader}>Наши товары</h1>
                <div className={s.itemsWrapper}>
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                    <ItemCard 
                        itemImage="/images/banner-image.png" 
                        itemAlt="картинка"
                        itemTitle="товар" 
                        itemPrice={12345}
                    />
                </div>
            </section>
        </div>
    );
};

export default CatalogPage;