import s from './footer.module.scss'
import Input from 'antd/es/input/Input'
import Link from 'next/link'

export function Footer(){
    return (
        <footer className={s.footer}>
            <div className={s.footerLinksWrapper}>
                <h2 className={s.footerLinksHeader}>Эксклюзив</h2>
                <div className={s.footerLinks}>
                    <Input />
                </div>
            </div>
            <div className={s.footerLinksWrapper}>
                <h3 className={s.footerLinksHeader}>Поддержка</h3>
                <div className={s.footerLinks}>
                    <p>Малая Грузинская ул., 27/13, Москва, 123557</p>
                    <p>eksklyuziv@gmail.com</p>
                    <p>+7 965 111 11-11</p>
                </div>
            </div>
            <div className={s.footerLinksWrapper}>
                <h3 className={s.footerLinksHeader}>Быстрые ссылки</h3>
                <div className={s.footerLinks}>
                    <p><Link href="/">Главная</Link></p>
                    <p><Link href="/catalog">Каталог</Link></p>
                    <p><Link href="/favorite">Избранное</Link></p>
                    <p><Link href="/contacts">Контакты</Link></p>
                </div>
            </div>
        </footer>
    )
}