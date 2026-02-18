'use client';

import { useEffect, useState } from 'react';
import s from './catalog.module.scss';
import { ItemCard } from '@/widgets/ItemCard/ItemCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Ошибка загрузки товаров');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Загрузка товаров...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goFirst = () => setCurrentPage(1);
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setCurrentPage(totalPages);

  return (
    <div className={s.catalogPageWrapper}>
      <section className={s.filtersSection}>
        <h2>Фильтры</h2>
      </section>
      <section className={s.itemsSection}>
        <h1 className={s.itemsHeader}>Наши товары</h1>
        <div className={s.itemsWrapper}>
          {displayedProducts.map((product) => (
            <ItemCard
              key={product.id}
              itemImage={product.image || '/images/placeholder.png'} // заглушка, если нет картинки
              itemAlt={product.name}
              itemTitle={product.name}
              itemPrice={product.price}
            />
          ))}
        </div>
        <div className={s.pagination}>
          <button onClick={goFirst} disabled={currentPage === 1}>&laquo;</button>
          <button onClick={goPrev} disabled={currentPage === 1}>&lsaquo;</button>
          <span className={s.pageInfo}>{currentPage} / {totalPages}</span>
          <button onClick={goNext} disabled={currentPage === totalPages}>&rsaquo;</button>
          <button onClick={goLast} disabled={currentPage === totalPages}>&raquo;</button>
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;