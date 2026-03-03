'use client';

import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Typography } from 'antd';
import s from './categories.module.scss';
import { AdminLayout } from '../layout';
import { FolderOpenOutlined } from '@ant-design/icons';

// Типы данных (можно вынести в отдельный файл)
interface Category {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  categoryId: number;
  ageCategory: string;
  sizes: string[];
  colors: string[];
  material: string;
  images: string[];
  inStock: number;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
}

const { Title } = Typography;

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка данных с API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, productsRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/products'),
        ]);

        if (!categoriesRes.ok) throw new Error('Ошибка загрузки категорий');
        if (!productsRes.ok) throw new Error('Ошибка загрузки товаров');

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Группировка товаров по categoryId
  const productsByCategory = products.reduce<Record<number, Product[]>>((acc, product) => {
    const catId = product.categoryId;
    if (!acc[catId]) acc[catId] = [];
    acc[catId].push(product);
    return acc;
  }, {});

  // Колонки для таблицы товаров
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price} ₽`,
    },
    {
      title: 'Количество на складе',
      dataIndex: 'inStock',
      key: 'inStock',
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <Alert message="Ошибка" description={error} type="error" showIcon />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className={s.adminCategoriesWrapper}>
        <h1>
          <FolderOpenOutlined /> Товары по категориям
        </h1>

        {categories.map((category) => {
          const categoryProducts = productsByCategory[category.id] || [];
          const productCount = categoryProducts.length;

          return (
            <div key={category.id} style={{ marginBottom: 40 }}>
              <Title level={2} style={{ marginBottom: 16 }}>
                {category.name} ({productCount} {productCount === 1 ? 'товар' : 'товаров'})
              </Title>

              <Table
                dataSource={categoryProducts}
                columns={columns}
                rowKey="id"
                pagination={false}
                bordered
                size="middle"
                locale={{ emptyText: 'В этой категории пока нет товаров' }}
              />
            </div>
          );
        })}

        {categories.length === 0 && (
          <Alert message="Нет категорий" type="info" showIcon />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;