import { CustomizationSettings } from "../types";

/**
 * Provides the customization settings for a given website.
 * @example
 * ```ts
 * await getCustomizationSettings(uuid, cookies);
 * ```
 */

export const getCustomizationSettings = async (
  uuid: string,
  cookies: any,
): Promise<CustomizationSettings> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/customization`, {
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
 * Updates the customization settings for a given website.
 * @example
 * ```ts
 * await updateCustomizationSettings(uuid, updatedCustomizationSettings, cookies);
 * ```
 */

export const updateCustomizationSettings = async (
  uuid: string,
  updatedCustomizationSettings: CustomizationSettings,
  cookies: any,
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${uuid}/customization`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join("; "),
    },
    body: JSON.stringify(updatedCustomizationSettings),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to update customization settings: ${response.statusText}`);
  }

  return await response.json();
};
