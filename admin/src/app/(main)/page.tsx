import s from './mainPage.module.scss'
import { Button } from 'antd';
import { TruckOutlined, CustomerServiceOutlined, SafetyOutlined } from '@ant-design/icons';

const MainPage = () => {
    
    return (
        <div className={s.mainPageWrapper}>
            <div className={s.bannerImageWrapper}>
                <img
                    src="/images/banner-image.png"
                    alt="картинка баннера"
                />
            </div>
            <div className={s.banner}>
                <div className={s.bannerText}>
                    <h1>Откройте для себя мир детской моды</h1>
                    <Button href="/catalog" type="primary">
                        Купить сейчас
                    </Button>
                </div>
            </div>
            <div className={s.featIcons}>
                <div className={s.featIconWrapper}>
                    <div className={s.featIcon}>
                        <TruckOutlined className={s.icon} />
                    </div>
                    <h3>Бесплатная и быстрая доставка</h3>
                </div>
                <div className={s.featIconWrapper}>
                    <div className={s.featIcon}>
                        <CustomerServiceOutlined className={s.icon} />
                    </div>
                    <h3>Поддержка 24/7</h3>
                </div>
                <div className={s.featIconWrapper}>
                    <div className={s.featIcon}>
                        <SafetyOutlined className={s.icon} />
                    </div>
                    <h3>Гарантия возврата средств</h3>
                </div>
            </div>
        </div>
    );
};

export default MainPage;