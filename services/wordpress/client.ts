/**
 * Thin HTTP layer for WordPress REST. Keeps retries, headers, and URL joins in one place
 * so route handlers and server components stay declarative.
 */

export class WordPressRequestError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly url?: string,
  ) {
    super(message);
    this.name = "WordPressRequestError";
  }
}

function joinUrl(base: string, path: string) {
  const cleanBase = base.replace(/\/+$/, "");
  const cleanPath = path.replace(/^\/+/, "");
  return `${cleanBase}/${cleanPath}`;
}

export async function wpFetch<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number } },
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_WORDPRESS_URL;
  if (!base) {
    throw new WordPressRequestError("NEXT_PUBLIC_WORDPRESS_URL is not set");
  }

  const url = joinUrl(base, path);
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new WordPressRequestError(
      `WordPress request failed (${response.status})`,
      response.status,
      url,
    );
  }

  return (await response.json()) as T;
}
