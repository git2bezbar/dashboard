import { MenuPage } from "../types";

/**
 * Provides the menu for a given website.
 * @example
 * ```ts
 * await getMenu(uuid, cookies);
 * ```
 */

export const getMenu = async (
  uuid: string,
  cookies: any,
): Promise<MenuPage[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/menu`, {
    method: "GET",
    headers: {
      Cookie: cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join("; "),
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

/**
 *
 * Updates the menu for a given website.
 * @example
 * ```ts
 * await updateMenu(uuid, updatedMenu, cookies);
 * ```
 */

export const updateMenu = async (
  uuid: string,
  updatedMenu: MenuPage[],
  cookies: any,
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join("; "),
    },
    body: JSON.stringify(updatedMenu),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to update menu: ${response.statusText}`);
  }

  return await response.json();
};
