import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile, generateId } from '@/lib/db';
import { Product } from '@/types';

// This API reads/writes local JSON files so it must run in a dynamic
// server runtime when Next is configured with `output: 'export'`.
export const dynamic = 'force-dynamic';

const FILE_NAME = 'products.json';

export async function GET() {
  try {
    const products = await readJSONFile<Product>(FILE_NAME);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newProduct = await request.json() as Omit<Product, 'id' | 'createdAt'>;
    const products = await readJSONFile<Product>(FILE_NAME);

    const productToSave: Product = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      ...newProduct,
    };

    products.push(productToSave);
    await writeJSONFile(FILE_NAME, products);

    return NextResponse.json(productToSave, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}