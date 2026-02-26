import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile, generateId } from '@/lib/db';
import { Order } from '@/types';

// This API reads/writes local JSON files so it must run in a dynamic
// server runtime when Next is configured with `output: 'export'`.
export const dynamic = 'force-dynamic';

const FILE_NAME = 'orders.json';

export async function GET() {
  try {
    const orders = await readJSONFile<Order>(FILE_NAME);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newOrder = (await request.json()) as Omit<Order, 'id' | 'createdAt'>;
    const orders = await readJSONFile<Order>(FILE_NAME);

    const orderToSave: Order = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      ...newOrder,
    };

    orders.push(orderToSave);
    await writeJSONFile(FILE_NAME, orders);

    return NextResponse.json(orderToSave, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}