import ky from "ky";
import { CustomizationSettings, UUID } from "../types";

/**
 * Provides the customization settings for a given website.
 * @example
 * ```ts
 * await getCustomizationSettings(uuid, cookies);
 * ```
 */

export const getCustomizationSettings = async (
  uuid: UUID,
  cookies: any,
): Promise<CustomizationSettings> =>
  await ky.get(`http://localhost:3333/${uuid}/customization`, {
  headers: {
    'Cookie': cookies.map((cookie: any) => 
      `${cookie.name}=${cookie.value}`).join('; '),
  }
}).json();

/**
 * Updates the customization settings for a given website.
 * @example
 * ```ts
 * await updateCustomizationSettings(uuid, updatedCustomizationSettings);
 * ```
 */

export const updateCustomizationSettings = async (
  uuid: UUID,
  updatedCustomizationSettings: CustomizationSettings,
) => 
  await ky.post(`http://localhost:3333/${uuid}/customization`, { 
    json: updatedCustomizationSettings
  }).json();
