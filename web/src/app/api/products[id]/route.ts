import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile, findIndexById } from '@/lib/db';
import { Product } from '@/types';

const FILE_NAME = 'products.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const products = await readJSONFile<Product>(FILE_NAME);
    const product = products.find(p => String(p.id) === id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const updatedData = await request.json() as Partial<Product>;
    const products = await readJSONFile<Product>(FILE_NAME);
    const index = findIndexById(products, id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updatedProduct: Product = {
      ...products[index],
      ...updatedData,
      id: products[index].id, // id не меняем
    };

    products[index] = updatedProduct;
    await writeJSONFile(FILE_NAME, products);

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const products = await readJSONFile<Product>(FILE_NAME);
    const index = findIndexById(products, id);

    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    products.splice(index, 1);
    await writeJSONFile(FILE_NAME, products);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}