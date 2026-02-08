import s from './header.module.scss'
import Link from 'next/link'
import { routes } from '@/shared/constants'
import {Input} from 'antd'
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons'

export const Header = () => {
    return (
        <header className={s.header}>
            <h2 className={s.logo}>Эксклюзив</h2>
            <div>
                <Link href={routes.main}>Главная</Link>
                <Link href={routes.contacts}>Контакты</Link>
                <Link href={routes.about}>О нас</Link>
                <Link href={routes.favorite}>Избранное</Link>
            </div>
            <div>
                <Input placeholder="Что вы ищете?" variant="outlined" />
                <HeartOutlined />
                <ShoppingCartOutlined />
            </div>
        </header>
    )
}