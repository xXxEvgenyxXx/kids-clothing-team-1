import { Children, ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
    return (
        <>
            <header>
                шапка
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                подвал
            </footer>
        </>
    );
};

export default MainLayout;