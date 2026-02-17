import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '..', 'data', 'db');

// Ensure storage directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {
    // ignore mkdir errors; they'll surface on read/write
  }
}

// Чтение JSON-файла с типизацией. Создаёт файл с пустым массивом, если файла нет.
export async function readJSONFile<T>(filename: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as T[];
  } catch (error: any) {
    if (error && (error.code === 'ENOENT' || error.code === 'ENOTDIR')) {
      // File or directory doesn't exist - create an empty array file and return []
      try {
        await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf-8');
      } catch (e) {
        // ignore write error for now
      }
      return [];
    }
    // For other errors, rethrow so caller can handle/log
    throw error;
  }
}

// Запись JSON-файла
export async function writeJSONFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
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