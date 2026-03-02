"use client"

import s from './header.module.scss'
import Link from 'next/link'
import { routes } from '@/constants'
import {Dropdown, Space} from 'antd'
import type { MenuProps } from 'antd'
import {HeartOutlined, ShoppingCartOutlined,  MenuOutlined} from '@ant-design/icons'
import clsx from 'clsx'

const dropdownItems: MenuProps['items'] = [
    {
        label: (
            <Link href={routes.main}>Главная</Link>
        ),
        key: '0'
    },
    {
        label: (
            <Link href={routes.catalog}>Каталог</Link>
        ),
        key: '2'
    },
    {
        label: (
            <Link href={routes.contacts}>Контакты</Link>
        ),
        key: '3'
    },
    {
        label: (
            <Link href={routes.about}>О нас</Link>
        ),
        key: '4'
    },
    {
        label: (
            <Link href={routes.favorite}>Избранное</Link>
        ),
        key: '5'
    },
    {
        label: (
            <Link href={routes.cart}>Корзина</Link>
        ),
        key: '6'
    },
]

export const Header = () => {
    const menuProps: MenuProps = {
        items: dropdownItems,
        onClick: (e) => {
            // Handle click if needed
        }
    };

    return (
        <header className={s.header}>
            <h2 className={s.logo}>Эксклюзив</h2>
            <div className={s.headerLinksWrapper}>
                <Link className={s.headerLink} href={routes.main}>Главная</Link>
                <Link className={s.headerLink} href={routes.catalog}>Каталог</Link>
                <Link className={s.headerLink} href={routes.contacts}>Контакты</Link>
                <Link className={s.headerLink} href={routes.about}>О нас</Link>
                <Link className={s.headerLink} href={routes.admin}>Панель администратора</Link>
            </div>
            <div className={s.headerLinksWrapper}>
                <Link href={routes.favorite} className={clsx([s.headerLink,s.headerIconLink])}><HeartOutlined /></Link>
                <Link href={routes.cart} className={clsx([s.headerLink,s.headerIconLink])}><ShoppingCartOutlined /></Link>
            </div>
            <div className={s.menuWrapper}>
                <Dropdown className={s.menu} menu={menuProps} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <MenuOutlined/>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </header>
    )
}