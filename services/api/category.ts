import { Category } from "../types";

/**
 * Provides a list of categories for restaurant products.
 * @example
 * ```ts
 * await getCategories();
 * ```
 */

export const getCategories = async (
): Promise<Category[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};
