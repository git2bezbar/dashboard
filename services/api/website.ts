import ky from "ky";

/**
 *
 * Generates a website.
 * @example
 * ```ts
 * await generateWebsite("Restaurant", "contact@restaurant.fr");
 * ```
 */
export const generateWebsite = async (
  websiteTitle: string,
  email: string,
): Promise<{ uuid: string }> => await ky.post(`http://localhost:3333/generate`, {
  json: { websiteTitle, email },
  credentials: 'include',
}).json();

/**
 *
 * Get the UUID of a website for an authenticated user.
 * @example
 * ```ts
 * await getWebsite(cookies);
 * ```
 */
export const getWebsite = async (
  cookies: any,
): Promise<{ uuid: string }> => await ky.get(`http://localhost:3333/website`, {
  credentials: 'include',
  headers: {
    'Cookie': cookies.map((cookie: any) => `${cookie.name}=${cookie.value}`).join('; '),
  },
}).json();

/**
 *
 * Get the UUIDs of several websites for an authenticated user.
 * @example
 * ```ts
 * await getWebsites(cookies);
 * ```
 */
export const getWebsites = async (
  cookies: any,
): Promise<any[]> => await ky.get(`http://localhost:3333/websites`, {
  credentials: 'include',
  headers: {
    'Cookie': cookies.map((cookie: any) => `${cookie.name}=${cookie.value}`).join('; '),
  },
}).json();
