import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '..', 'data', 'db');

// Чтение JSON-файла с типизацией
export async function readJSONFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T[];
  } catch (error) {
    return [];
  }
}

// Запись JSON-файла
export async function writeJSONFile<T>(filename: string, data: T[]): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Поиск индекса элемента по id (сравниваем строковые представления)
export function findIndexById<T extends { id: number | string }>(
  items: T[],
  id: string | number
): number {
  const searchId = String(id);
  return items.findIndex(item => String(item.id) === searchId);
}

// Генерация нового числового id (timestamp)
export function generateId(): number {
  return Date.now();
}