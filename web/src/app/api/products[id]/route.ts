import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/lib/db';
import { Product } from '@/types';

// Этот API работает с конкретным продуктом по ID, поэтому должен быть динамическим
export const dynamic = 'force-dynamic';

const FILE_NAME = 'products.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const products = await readJSONFile<Product>(FILE_NAME);
    const product = products.find(p => p.id === id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
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
    const updatedData = await request.json() as Partial<Omit<Product, 'id' | 'createdAt'>>;
    const products = await readJSONFile<Product>(FILE_NAME);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const existingProduct = products[index];
    const updatedProduct = {
      ...existingProduct,
      ...updatedData
    };

    products[index] = updatedProduct;
    await writeJSONFile(FILE_NAME, products);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
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
    const products = await readJSONFile<Product>(FILE_NAME);
    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const [deletedProduct] = products.splice(index, 1);
    await writeJSONFile(FILE_NAME, products);

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}