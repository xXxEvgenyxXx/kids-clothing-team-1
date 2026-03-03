'use client';

import { useState, useEffect } from 'react';
import { Table, Select, Typography, Spin, Alert, Space, Statistic, Card, Row, Col } from 'antd';
import { AdminLayout } from '../layout';
import { Order, OrderStatus } from '@/types';
import type { ColumnsType } from 'antd/es/table';

const { Title } = Typography;
const { Option } = Select;

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Ошибка загрузки заказов');
      const data = await res.json();
      setOrders(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number | string, newStatus: OrderStatus) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Ошибка обновления статуса');
      const updatedOrder = await res.json();

      setOrders(prev => prev.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
    } catch (err) {
      console.error('Ошибка при обновлении статуса:', err);
    }
  };

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTotalItems = (items: Order['items']) => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const columns: ColumnsType<Order> = [
    {
      title: 'ID заказа',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: 'Дата заказа',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => formatDate(text),
      width: 180,
    },
    {
      title: 'Кол-во товаров',
      key: 'itemsCount',
      render: (_, record) => getTotalItems(record.items),
      width: 140,
    },
    {
      title: 'Сумма',
      dataIndex: 'total',
      key: 'total',
      render: (value: number) => `${value.toLocaleString('ru-RU')} ₽`,
      width: 120,
    },
    {
      title: 'Статус',
      key: 'status',
      render: (_, record) => (
        <Select
          value={record.status}
          onChange={(value) => updateOrderStatus(record.id, value as OrderStatus)}
          style={{ width: 160 }}
          size="small"
        >
          <Option value="pending">Ожидает оплаты</Option>
          <Option value="paid">Оплачен</Option>
          <Option value="shipping">Доставляется</Option>
          <Option value="delivered">Доставлен</Option>
          <Option value="cancelled">Отменён</Option>
        </Select>
      ),
      width: 180,
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Spin size="large" tip="Загрузка заказов..." />
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div style={{ padding: 24 }}>
          <Alert message="Ошибка" description={error} type="error" showIcon />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div style={{ padding: 24 }}>
        <Row gutter={16} style={{ marginBottom: 24 }} align="middle">
          <Col>
            <Title level={2} style={{ margin: 0 }}>
              Заказы ({totalOrders})
            </Title>
          </Col>
          <Col>
            <Card size="small">
              <Statistic
                title="Общая выручка"
                value={totalRevenue}
                suffix="₽"
                groupSeparator=" "
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            bordered
          />
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;