import ky from "ky";
import { UUID } from "../types";

/**
 * Provides a list of pages for a given website.
 * @example
 * ```ts
 * await getPages(uuid);
 * ```
 */
export const getPages = async (
  uuid: UUID,
) => await ky.get(`http://localhost:3333/${uuid}/pages`).json();

/**
 * Provides the content of a page for a given website.
 * @example
 * ```ts
 * await getPage(uuid, pageUuid);
 * ```
 */
export const getPage = async (
  uuid: UUID,
  pageUuid: UUID,
) => await ky.get(`http://localhost:3333/${uuid}/pages/${pageUuid}`).json();

/**
 * todo
 * Provides a list of pages for a given website.
 * @example
 * ```ts
 * await getPages(uuid, pageUuid);
 * ```
 */
// export const updatePage = async (
//   uuid: UUID,
//   pageUuid: UUID,
//   updatedPage: any,
// ) => await ky.post(`http://localhost:3333/${uuid}/pages/${pageUuid}`);
