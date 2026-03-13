"use client"

import React, { useEffect, useState } from 'react';
import { Table, Button, InputNumber, Space, message } from 'antd';
import { DropboxOutlined } from '@ant-design/icons';
import s from './products.module.scss';
import { AdminLayout } from '../layout';
import { Product } from '@/types';
import { apiFetch } from '@/lib/apiFetch';

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingRowId, setEditingRowId] = useState<string | number | null>(null);
  const [editValue, setEditValue] = useState<number | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/products');
      if (!res.ok) throw new Error('Ошибка загрузки');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      message.error('Не удалось загрузить товары');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Явные типы для функций
  const handleEdit: (record: Product) => void = (record) => {
    setEditingRowId(record.id);
    setEditValue(record.inStock);
  };

  const handleCancel: () => void = () => {
    setEditingRowId(null);
    setEditValue(null);
  };

  const handleSave: (id: string | number) => Promise<void> = async (id) => {
    if (editValue === null) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inStock: editValue }),
      });

      if (!res.ok) throw new Error('Ошибка обновления');

      const updatedProduct = await res.json();
      setProducts(prev => prev.map(p => (p.id === id ? updatedProduct : p)));
      message.success('Количество обновлено');
      handleCancel();
    } catch (error) {
      message.error('Не удалось сохранить изменения');
    }
  };

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
      ellipsis: true,
    },
    {
      title: 'Цена (₽)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price} ₽`,
    },
    {
      title: 'Количество на складе',
      dataIndex: 'inStock',
      key: 'inStock',
      render: (inStock: number, record: Product) => {
        if (editingRowId === record.id) {
          return (
            <InputNumber
              min={0}
              value={editValue}
              onChange={value => setEditValue(value ?? 0)}
            />
          );
        }
        return inStock;
      },
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: any, record: Product) => {
        if (editingRowId === record.id) {
          return (
            <Space>
              <Button type="primary" onClick={() => handleSave(record.id)}>
                Сохранить
              </Button>
              <Button onClick={handleCancel}>Отмена</Button>
            </Space>
          );
        }
        return <Button onClick={() => handleEdit(record)}>Изменить</Button>;
      },
    },
  ];

  return (
    <AdminLayout>
      <div className={s.adminProductsWrapper}>
        <h1>
          <DropboxOutlined /> Все товары
        </h1>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={products}
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminProductsPage;