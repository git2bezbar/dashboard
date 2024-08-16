import { GeneralSettings } from "../types";

/**
 * Provides the general settings for a given website.
 * @example
 * ```ts
 * await getGeneralSettings(uuid);
 * ```
 */

export const getGeneralSettings = async (
  uuid: string,
  cookies: any
): Promise<GeneralSettings> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/general-settings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join('; '),
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to get general settings: ${response.statusText}`);
  }

  return await response.json();
};


/**
 *
 * Updates the general settings for a given website.
 * @example
 * ```ts
 * await updateGeneralSettings(uuid, updatedGeneralSettings);
 * ```
 */

export const updateGeneralSettings = async (
  uuid: string,
  updatedGeneralSettings: GeneralSettings,
  cookies: any
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/general-settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join('; '),
    },
    body: JSON.stringify(updatedGeneralSettings),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to update general settings: ${response.statusText}`);
  }

  return await response.json();
};
