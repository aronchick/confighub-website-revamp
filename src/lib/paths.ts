const RAW_BASE = import.meta.env.BASE_URL;

export const BASE_PREFIX = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE;

export function assetUrl(relativePath: string): string {
  const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  return `${BASE_PREFIX}${cleanPath}`;
}

export function toBrowserPath(route: string): string {
  const cleanRoute = route.startsWith('/') ? route : `/${route}`;

  if (cleanRoute === '/') {
    return BASE_PREFIX ? `${BASE_PREFIX}/` : '/';
  }

  return `${BASE_PREFIX}${cleanRoute}`;
}

export function toAppRoute(pathname: string): string {
  let stripped = pathname;

  if (BASE_PREFIX && stripped.startsWith(BASE_PREFIX)) {
    stripped = stripped.slice(BASE_PREFIX.length);
  }

  if (stripped.length > 1 && stripped.endsWith('/')) {
    stripped = stripped.slice(0, -1);
  }

  return stripped || '/';
}
