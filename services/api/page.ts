import { Page } from "../types";

/**
 * Provides a list of pages for a given website.
 * @example
 * ```ts
 * await getPages(uuid, cookies);
 * ```
 */

export const getPages = async (
  uuid: string,
  cookies: any,
): Promise<Page[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/pages`, {
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
 * Provides the content of a page for a given website.
 * @example
 * ```ts
 * await getPage(uuid, pageUuid, cookies);
 * ```
 */

export const getPage = async (
  uuid: string,
  pageUuid: string,
  cookies: any,
): Promise<Page> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/pages/${pageUuid}`, {
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
 * Provides a list of pages for a given website.
 * @example
 * ```ts
 * await updatePage(uuid, pageUuid, data, cookies);
 * ```
 */

export const updatePage = async (
  uuid: string,
  pageUuid: string,
  updatedPage: Page,
  cookies: any,
): Promise<Page> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/pages/${pageUuid}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join("; "),
    },
    body: JSON.stringify(updatedPage),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
