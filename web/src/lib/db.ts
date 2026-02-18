import fs from 'fs/promises';
import path from 'path';

// Resolve data directory: prefer project-root `data/db` if present, else `web/data/db`
async function getDataDir(): Promise<string> {
  const cwd = process.cwd();
  const candidates = [
    path.join(cwd, 'data', 'db'), // project root/data/db
    path.join(cwd, '..', 'data', 'db'), // parent/data/db (just in case)
    path.join(__dirname, '..', 'data', 'db'), // web/src/lib/..../data/db
    path.join(cwd, 'web', 'data', 'db'), // web/data/db
  ];

  for (const dir of candidates) {
    try {
      await fs.access(dir);
      return dir;
    } catch (_) {
      // not found, try next
    }
  }

  // fallback to first candidate (project root/data/db)
  return candidates[0];
}

// Ensure storage directory exists
async function ensureDataDir(dir?: string) {
  const dataDir = dir ?? (await getDataDir());
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (e) {
    // ignore mkdir errors; they'll surface on read/write
  }
}

// Чтение JSON-файла с типизацией. Создаёт файл с пустым массивом, если файла нет.
export async function readJSONFile<T>(filename: string): Promise<T[]> {
  const dataDir = await getDataDir();
  await ensureDataDir(dataDir);
  const filePath = path.join(dataDir, filename);
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
  const dataDir = await getDataDir();
  await ensureDataDir(dataDir);
  const filePath = path.join(dataDir, filename);
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