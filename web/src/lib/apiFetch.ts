/**
 * Обёртка над fetch, которая автоматически добавляет basePath к URL-адресам API.
 * В локальной разработке basePath пустой, при деплое на GitHub Pages — /repo/web1.
 */
const BASE_PATH =
  typeof process !== 'undefined'
    ? (process.env.NEXT_PUBLIC_BASE_PATH ?? '')
    : '';

export function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  return fetch(`${BASE_PATH}${path}`, options);
}
