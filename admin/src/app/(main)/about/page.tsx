import s from './about.module.scss'

const AboutPage = () => {
    
    return (
        <div className={s.aboutPageWrapper}>
            <div className={s.aboutPageContent}>
                <h1 className={s.aboutPageTitle}>О нас</h1>
                <p>Запущенная в 2015 году, Эксклюзив — ведущая онлайн-площадка для покупок в Южной Азии, активно представленная в Бангладеш. Благодаря широкому спектру индивидуальных маркетинговых решений, Exclusive объединяет 10 500 продавцов и 300 брендов и обслуживает 3 миллиона клиентов по всему региону.</p>
                <p>В ассортименте Эксклюзив более 1 миллиона товаров детской одежды, и он очень быстро растет. Эксклюзив предлагает разнообразный выбор товаров в различных категориях сферы детской одежды.</p>
            </div>
            <div className={s.bannerImageWrapper}>
                <img className={s.bannerImage} src="/images/about-banner.png" />
            </div>
        </div>
    );
};

export default AboutPage;