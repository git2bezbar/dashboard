import ky from "ky";
import { UUID } from "../types";

/**
 * Provides the general settings for a given website.
 * @example
 * ```ts
 * await getGeneralSettings(uuid);
 * ```
 */
export const getGeneralSettings = async (
  uuid: UUID,
) => await ky.get(`http://localhost:3333/${uuid}/general-settings`).json();

/**
 * todo
 * Updates the general settings for a given website.
 * @example
 * ```ts
 * await updateGeneralSettings(uuid, updatedGeneralSettings);
 * ```
 */
// export const updatedGeneralSettings = async (
//   uuid: UUID,
//   updatedGeneralSettings: any,
// ) => await ky.post(`http://localhost:3333/${uuid}/general-settings`);
