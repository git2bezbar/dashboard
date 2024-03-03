import ky from "ky";
import { MenuPage, UUID } from "../types";

/**
 * Provides the menu for a given website.
 * @example
 * ```ts
 * await getMenu(uuid);
 * ```
 */
export const getMenu = async (
  uuid: UUID,
): Promise<MenuPage[]> => await ky.get(`http://localhost:3333/${uuid}/menu`).json();

/**
 * todo
 * Updates the menu for a given website.
 * @example
 * ```ts
 * await updateMenu(uuid, updatedMenu);
 * ```
 */
export const updateMenu = async (
  uuid: UUID,
  updatedMenu: MenuPage[],
) => await ky.post(`http://localhost:3333/${uuid}/menu`, { json: updatedMenu }).json();
