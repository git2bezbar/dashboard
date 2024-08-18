import { MenuCard, UpdatedProducts } from "../types";

/**
 * Provides a list of products of a menu card of a website.
 * @example
 * ```ts
 * await getProducts(uuid, cookies);
 * ```
 */

export const getProducts = async (
  uuid: string,
  cookies: any,
): Promise<MenuCard> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join("; "),
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to get products: ${response.statusText}`);
  }

  return await response.json();
};

/**
 * Updates a list of products of a menu card of a website.
 * @example
 * ```ts
 * await updateProducts(uuid, cookies);
 * ```
 */

export const updateProducts = async (
  uuid: string,
  cookies: any,
  updatedProducts: UpdatedProducts,
): Promise<MenuCard> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join("; "),
    },
    credentials: "include",
    body: JSON.stringify(updatedProducts),
  });

  if (!response.ok) {
    throw new Error(`Failed to update products: ${response.statusText}`);
  }

  return await response.json();
}
