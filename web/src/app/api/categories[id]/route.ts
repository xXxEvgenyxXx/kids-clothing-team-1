import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/lib/db';
import { Category } from '@/types';

// Этот API работает с конкретной категорией по ID, поэтому должен быть динамическим
export const dynamic = 'force-dynamic';

const FILE_NAME = 'categories.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const categoryId = parseInt(id, 10);
    
    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const categories = await readJSONFile<Category>(FILE_NAME);
    const category = categories.find(c => c.id === categoryId);

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category' },
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
    const categoryId = parseInt(id, 10);
    
    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const categories = await readJSONFile<Category>(FILE_NAME);
    const index = categories.findIndex(c => c.id === categoryId);

    if (index === -1) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const [deletedCategory] = categories.splice(index, 1);
    await writeJSONFile(FILE_NAME, categories);

    return NextResponse.json(deletedCategory);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}