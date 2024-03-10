import ky from "ky";
import { Page, UUID } from "../types";

/**
 * Provides a list of pages for a given website.
 * @example
 * ```ts
 * await getPages(uuid);
 * ```
 */
export const getPages = async (
  uuid: UUID,
):Promise<Page[]> => await ky.get(`http://localhost:3333/${uuid}/pages`).json();

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
): Promise<Page> => await ky.get(`http://localhost:3333/${uuid}/pages/${pageUuid}`).json();

/**
 * todo
 * Provides a list of pages for a given website.
 * @example
 * ```ts
 * await getPages(uuid, pageUuid);
 * ```
 */
export const updatePage = async (
  uuid: UUID,
  pageUuid: UUID,
  updatedPage: Page,
) => await ky.post(`http://localhost:3333/${uuid}/pages/${pageUuid}`, { json: updatedPage }).json();
