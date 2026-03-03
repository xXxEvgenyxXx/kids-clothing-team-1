import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/lib/db';
import { Order } from '@/types';

// Этот API работает с конкретным заказом по ID, поэтому должен быть динамическим
export const dynamic = 'force-dynamic';

const FILE_NAME = 'orders.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const orders = await readJSONFile<Order>(FILE_NAME);
    const order = orders.find(o => o.id === id);

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updatedData = await request.json() as Partial<Omit<Order, 'id' | 'createdAt'>>;
    const orders = await readJSONFile<Order>(FILE_NAME);
    const index = orders.findIndex(o => String(o.id) === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const existingOrder = orders[index];
    const updatedOrder = {
      ...existingOrder,
      ...updatedData
    };

    orders[index] = updatedOrder;
    await writeJSONFile(FILE_NAME, orders);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const orders = await readJSONFile<Order>(FILE_NAME);
    const index = orders.findIndex(o => o.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const [deletedOrder] = orders.splice(index, 1);
    await writeJSONFile(FILE_NAME, orders);

    return NextResponse.json(deletedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}