import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/lib/db';

// Определяем типы
type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
};

type NewCategory = {
  name: string;
  slug: string;
  parentId: number | null;
};

const FILE_NAME = 'categories.json';
export const dynamic = 'force-dynamic';

// Вспомогательная функция для проверки типа
function isCategoryData(data: unknown): data is { id: unknown; name: unknown; slug: unknown; parentId: unknown } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'slug' in data &&
    'parentId' in data
  );
}

// Вспомогательная функция для безопасного преобразования
function toCategory(item: unknown): Category | null {
  if (!isCategoryData(item)) return null;

  // Преобразуем id
  const id = Number(item.id);
  if (isNaN(id) || id <= 0) return null;

  // Проверяем обязательные поля
  if (typeof item.name !== 'string' || typeof item.slug !== 'string') return null;

  // Обрабатываем parentId
  let parentId: number | null = null;
  if (item.parentId !== null && item.parentId !== undefined) {
    const numParentId = Number(item.parentId);
    if (isNaN(numParentId)) return null;
    parentId = numParentId;
  }

  return {
    id,
    name: item.name.trim(),
    slug: item.slug.trim(),
    parentId
  };
}

export async function GET() {
  try {
    const rawData = await readJSONFile<unknown>(FILE_NAME);
    
    // Проверяем, что данные - это массив
    if (!Array.isArray(rawData)) {
      throw new Error('Invalid categories data format: expected array');
    }

    // Фильтруем и преобразуем данные
    const categories: Category[] = [];
    for (const item of rawData) {
      const category = toCategory(item);
      if (category) {
        categories.push(category);
      }
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error('GET categories error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Валидация входных данных
    const rawData = await request.json();
    
    if (typeof rawData.name !== 'string' || typeof rawData.slug !== 'string') {
      return NextResponse.json(
        { 
          error: 'Invalid input', 
          details: 'name and slug must be strings' 
        },
        { status: 400 }
      );
    }

    // Обработка parentId
    let parentId: number | null = null;
    if (rawData.parentId !== null && rawData.parentId !== undefined) {
      const numId = Number(rawData.parentId);
      if (isNaN(numId)) {
        return NextResponse.json(
          { error: 'Invalid parentId', details: 'parentId must be a number' },
          { status: 400 }
        );
      }
      parentId = numId;
    }

    const newCategoryData: NewCategory = {
      name: rawData.name.trim(),
      slug: rawData.slug.trim(),
      parentId
    };

    // Чтение существующих категорий
    const existingData = await readJSONFile<unknown>(FILE_NAME);
    if (!Array.isArray(existingData)) {
      throw new Error('Invalid categories data format');
    }

    const categories: Category[] = [];
    for (const item of existingData) {
      const category = toCategory(item);
      if (category) {
        categories.push(category);
      }
    }

    // Генерация ID
    const nextId = categories.length > 0 
      ? Math.max(...categories.map(c => c.id)) + 1 
      : 1;

    // Проверка уникальности slug
    if (categories.some(c => c.slug === newCategoryData.slug)) {
      return NextResponse.json(
        { 
          error: 'Slug conflict', 
          details: `Slug "${newCategoryData.slug}" is already in use` 
        },
        { status: 409 }
      );
    }

    // Проверка родительской категории
    if (parentId !== null) {
      const parentExists = categories.some(c => c.id === parentId);
      if (!parentExists) {
        return NextResponse.json(
          { 
            error: 'Parent not found', 
            details: `Parent category with ID ${parentId} does not exist` 
          },
          { status: 400 }
        );
      }
    }

    // Создание новой категории
    const categoryToSave: Category = {
      id: nextId,
      name: newCategoryData.name,
      slug: newCategoryData.slug,
      parentId: newCategoryData.parentId
    };

    // Сохранение
    categories.push(categoryToSave);
    await writeJSONFile(FILE_NAME, categories);

    return NextResponse.json(categoryToSave, { status: 201 });
  } catch (error) {
    console.error('POST category error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}