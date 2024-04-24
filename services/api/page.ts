import ky from "ky";
import { Page, UUID } from "../types";

/**
 * Provides a list of pages for a given website.
 * @example
 * ```ts
 * await getPages(uuid, cookies);
 * ```
 */

export const getPages = async (
  uuid: UUID,
  cookies: any,
): Promise<Page[]> => 
  await ky.get(`http://localhost:3333/${uuid}/pages`, { 
    headers: {
      'Cookie': cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join('; '),
    }
  }).json();

/**
 * Provides the content of a page for a given website.
 * @example
 * ```ts
 * await getPage(uuid, pageUuid, cookies);
 * ```
 */

export const getPage = async (
  uuid: UUID,
  pageUuid: UUID,
  cookies: any,
): Promise<Page> =>
  await ky.get(`http://localhost:3333/${uuid}/pages/${pageUuid}`, {
    headers: {
      'Cookie': cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join('; '),
    }
  }).json();

/**
 *
 * Provides a list of pages for a given website.
 * @example
 * ```ts
 * await updatePage(uuid, pageUuid, data, cookies);
 * ```
 */

export const updatePage = async (
  uuid: UUID,
  pageUuid: UUID,
  updatedPage: Page,
  cookies: any,
) =>
  await ky.post(`http://localhost:3333/${uuid}/pages/${pageUuid}`, {
    json: updatedPage,
    credentials: 'include',
    headers: {
      'Cookie': cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join('; '),
    }
  }).json();
