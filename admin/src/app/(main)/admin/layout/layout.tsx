import s from './layout.module.scss'
import type { ReactNode } from 'react';
import Link from 'next/link';
import { BarChartOutlined, DropboxOutlined, FolderOutlined, UnorderedListOutlined } from '@ant-design/icons';

interface AdminLayoutProps {
    children: ReactNode
}

export const AdminLayout = (props: AdminLayoutProps) => {
    
    return (
        <div className={s.adminLayoutWrapper}>
            <aside className={s.adminNavWrapper}>
                <Link className={s.adminNavLink} href='/admin'><BarChartOutlined /> Статистика</Link>
                <Link className={s.adminNavLink} href='/admin/products'><DropboxOutlined/> Товары</Link>
                <Link className={s.adminNavLink} href='/admin/orders'><UnorderedListOutlined /> Заказы</Link>
                <Link className={s.adminNavLink} href='/admin/categories'><FolderOutlined/> Категории</Link>
            </aside>
            <div className={s.adminContent}>
                {props.children}
            </div>
        </div>
    );
};
