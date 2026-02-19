'use client';

import { useEffect, useState } from 'react';
import s from './catalog.module.scss';
import { ItemCard } from '@/widgets/ItemCard/ItemCard';

// Обновленный интерфейс Product с полем categoryId
interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  categoryId: number;
}

// Интерфейс для категорий
interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
}

const CatalogPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ITEMS_PER_PAGE = 6;

  // Загрузка продуктов
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Ошибка загрузки товаров');
        const data = await res.json();
        
        // Убедимся, что все продукты имеют categoryId
        const productsWithCategory = data.map((product: any) => ({
          ...product,
          categoryId: product.categoryId || 1
        }));
        
        setProducts(productsWithCategory);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка при загрузке товаров');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Загрузка категорий
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Ошибка загрузки категорий');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Ошибка загрузки категорий:', err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Обработка изменения чекбокса категории
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
    setCurrentPage(1); // Сброс пагинации при изменении фильтров
  };

  // Обработка выбора "Все категории"
  const handleSelectAll = () => {
    setSelectedCategories([]);
    setCurrentPage(1);
  };

  // Фильтрация продуктов по выбранным категориям
  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(product => selectedCategories.includes(product.categoryId));

  // Расчет пагинации для отфильтрованных продуктов
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = filteredProducts.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  // Пагинационные функции
  const goFirst = () => setCurrentPage(1);
  const goPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setCurrentPage(totalPages);

  // Показываем индикатор загрузки для всего каталога
  if (loading || loadingCategories) {
    return <div className={s.loader}>Загрузка каталога...</div>;
  }

  if (error) {
    return <div className={s.error}>Ошибка: {error}</div>;
  }

  return (
    <div className={s.catalogPageWrapper}>
      <section className={s.filtersSection}>
        <h2>Фильтры</h2>
        
        <div className={s.categoriesFilter}>
          <div className={s.filterItem}>
            <input 
              type="checkbox" 
              id="all-categories" 
              checked={selectedCategories.length === 0}
              onChange={handleSelectAll}
            />
            <label htmlFor="all-categories">Все категории</label>
          </div>
          
          {categories.map(category => (
            <div key={category.id} className={s.filterItem}>
              <input 
                type="checkbox" 
                id={`category-${category.id}`} 
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>
        
        {selectedCategories.length > 0 && (
          <div className={s.selectedFilters}>
            <span>Выбрано категорий: {selectedCategories.length}</span>
            <button 
              onClick={() => setSelectedCategories([])} 
              className={s.clearAllFilters}
              aria-label="Сбросить все фильтры"
            >
              Сбросить все
            </button>
          </div>
        )}
      </section>
      
      <section className={s.itemsSection}>
        <div className={s.headerContainer}>
          <h1 className={s.itemsHeader}>Наши товары</h1>
          
          {selectedCategories.length > 0 && (
            <div className={s.activeFiltersInfo}>
              <span>Применено фильтров: {selectedCategories.length}</span>
              <button 
                onClick={() => setSelectedCategories([])} 
                className={s.resetFiltersButton}
              >
                Сбросить все фильтры
              </button>
            </div>
          )}
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className={s.noProducts}>
            <p>По вашему запросу товаров не найдено</p>
            <button onClick={() => setSelectedCategories([])} className={s.resetButton}>
              Показать все товары
            </button>
          </div>
        ) : (
          <>
            <div className={s.itemsWrapper}>
              {displayedProducts.map((product) => (
                <ItemCard
                  key={product.id}
                  itemImage={product.image || '/images/placeholder.png'}
                  itemAlt={product.name}
                  itemTitle={product.name}
                  itemPrice={product.price}
                />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className={s.pagination}>
                <button 
                  onClick={goFirst} 
                  disabled={currentPage === 1}
                  aria-label="Первая страница"
                >
                  &laquo;
                </button>
                <button 
                  onClick={goPrev} 
                  disabled={currentPage === 1}
                  aria-label="Предыдущая страница"
                >
                  &lsaquo;
                </button>
                <span className={s.pageInfo}>
                  Страница {currentPage} из {totalPages}
                </span>
                <button 
                  onClick={goNext} 
                  disabled={currentPage === totalPages}
                  aria-label="Следующая страница"
                >
                  &rsaquo;
                </button>
                <button 
                  onClick={goLast} 
                  disabled={currentPage === totalPages}
                  aria-label="Последняя страница"
                >
                  &raquo;
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default CatalogPage;