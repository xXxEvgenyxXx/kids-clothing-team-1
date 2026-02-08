import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
    return (
        <html lang="ru">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <header>
                шапка
            </header>
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