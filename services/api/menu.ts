import ky from "ky";
import { MenuPage, UUID } from "../types";

/**
 * Provides the menu for a given website.
 * @example
 * ```ts
 * await getMenu(uuid, cookies);
 * ```
 */

export const getMenu = async (
  uuid: UUID,
  cookies: any,
): Promise<MenuPage[]> =>
  await ky.get(`http://localhost:3333/${uuid}/menu`, {
    headers: {
      'Cookie': cookies.map((cookie: any) => 
        `${cookie.name}=${cookie.value}`).join('; '),
    }
  }).json();

/**
 *
 * Updates the menu for a given website.
 * @example
 * ```ts
 * await updateMenu(uuid, updatedMenu, cookies);
 * ```
 */

export const updateMenu = async (
  uuid: UUID,
  updatedMenu: MenuPage[],
  cookies: any,
) =>
  await ky.post(`http://localhost:3333/${uuid}/menu`, {
    json: updatedMenu,
    headers: {
      'Cookie': cookies.map((cookie: any) => 
        `${cookie.name}=${cookie.value}`).join('; '),
    }
  }).json();
