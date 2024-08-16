import { ContactSettings, UUID } from "../types";

/**
 * Provides the contact settings for a given website.
 * @example
 * ```ts
 * await getContactSettings(uuid);
 * ```
 */

export const getContactSettings = async (
  uuid: string,
  cookies: any
): Promise<ContactSettings> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/contact-settings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join('; '),
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Failed to get contact settings: ${response.statusText}`);
  }

  return await response.json();
};

/**
 *
 * Updates the contact settings for a given website.
 * @example
 * ```ts
 * await updateContactSettings(uuid, updatedContactSettings);
 * ```
 */

export const updateContactSettings = async (
  uuid: UUID,
  updatedContactSettings: ContactSettings,
  cookies: any
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/contact-settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join('; '),
    },
    body: JSON.stringify(updatedContactSettings),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to update contact settings: ${response.statusText}`);
  }

  return await response.json();
};