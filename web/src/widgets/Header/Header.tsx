import s from './header.module.scss'
import Link from 'next/link'
import { routes } from '@/constants'
import {Input} from 'antd'
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import clsx from 'clsx'
import { SearchOutlined } from '@ant-design/icons'

export const Header = () => {
    return (
        <header className={s.header}>
            <h2 className={s.logo}>Эксклюзив</h2>
            <div className={s.headerLinksWrapper}>
                <Link className={s.headerLink} href={routes.main}>Главная</Link>
                <Link className={s.headerLink} href={routes.catalog}>Каталог</Link>
                <Link className={s.headerLink} href={routes.contacts}>Контакты</Link>
                <Link className={s.headerLink} href={routes.about}>О нас</Link>
            </div>
            <div className={s.headerLinksWrapper}>
                <Input placeholder="Что вы ищете?" variant="outlined"/> 
                <Link href={routes.favorite} className={clsx([s.headerLink,s.headerIconLink])}><HeartOutlined /></Link>
                <Link href={routes.cart} className={clsx([s.headerLink,s.headerIconLink])}><ShoppingCartOutlined /></Link>
            </div>
        </header>
    )
}