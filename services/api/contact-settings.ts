import ky from "ky";
import { UUID } from "../types";

/**
 * Provides the contact settings for a given website.
 * @example
 * ```ts
 * await getContactSettings(uuid);
 * ```
 */
export const getContactSettings = async (
  uuid: UUID,
) => await ky.get(`http://localhost:3333/${uuid}/contact-settings`).json();

/**
 * todo
 * Updates the contact settings for a given website.
 * @example
 * ```ts
 * await updateContactSettings(uuid, updatedContactSettings);
 * ```
 */
// export const updateContactSettings = async (
//   uuid: UUID,
//   updatedContactSettings: any,
// ) => await ky.post(`http://localhost:3333/${uuid}/contact-settings`);
