import ky from "ky";
import { UUID } from "../types";

/**
 * Provides the customization settings for a given website.
 * @example
 * ```ts
 * await getCustomizationSettings(uuid);
 * ```
 */
export const getCustomizationSettings = async (
  uuid: UUID,
) => await ky.get(`http://localhost:3333/${uuid}/customization`).json();

/**
 * todo
 * Updates the customization settings for a given website.
 * @example
 * ```ts
 * await updateCustomizationSettings(uuid, updatedCustomizationSettings);
 * ```
 */
// export const updateCustomizationSettings = async (
//   uuid: UUID,
//   updatedCustomizationSettings: any,
// ) => await ky.post(`http://localhost:3333/${uuid}/customization`);
