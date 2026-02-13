import s from './catalog.module.scss'

const CatalogPage = () => {
    
    return (
        <div className={s.catalogPageWrapper}>
            <div className={s.filtersWrapper}>
                <h2>Фильтры</h2>
            </div>
            <div>
                <h1>Наши товары</h1>
            </div>
        </div>
    );
};

export default CatalogPage;