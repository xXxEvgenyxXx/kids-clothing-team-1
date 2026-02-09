import { ReactNode } from "react";
import { Header } from "@/widgets/Header";
import s from './layout.module.scss'

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
    return (
        <html lang="ru">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Эксклюзив</title>
        </head>
        <body className={s.body}>
            <Header />
            <main>
                {props.children}
            </main>
            <footer>
                подвал
            </footer>
        </body>
        </html>
    );
};

export default MainLayout;