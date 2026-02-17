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

  if (loading) return <div className={s.loading}>Загрузка товаров...</div>;
  if (error) return <div className={s.error}>Ошибка: {error}</div>;

  return (
    <div className={s.catalogPageWrapper}>
      <section className={s.filtersSection}>
        <h2>Фильтры</h2>
      </section>
      <section className={s.itemsSection}>
        <h1 className={s.itemsHeader}>Наши товары</h1>
        <div className={s.itemsWrapper}>
          {products.map((product) => (
            <ItemCard
              key={product.id}
              itemImage={product.image || '/images/placeholder.png'} // заглушка, если нет картинки
              itemAlt={product.name}
              itemTitle={product.name}
              itemPrice={product.price}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CatalogPage;