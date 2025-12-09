export function assetUrl(path: string): string {
  if (!path) return path;
  
  // In development, use the path as-is since Vite serves from root
  if (import.meta.env.DEV) {
    return path.startsWith('/') ? path : `/${path}`;
  }
  
  // In production, use BASE_URL to construct the full path
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return new URL(normalizedPath, import.meta.env.BASE_URL).toString();
}


