import ky from "ky";
import { ContactSettings, UUID } from "../types";

/**
 * Provides the contact settings for a given website.
 * @example
 * ```ts
 * await getContactSettings(uuid);
 * ```
 */
export const getContactSettings = async (
  uuid: UUID,
):Promise<ContactSettings> => await ky.get(`http://localhost:3333/${uuid}/contact-settings`, { cache: 'no-store' }).json();

/**
 * todo
 * Updates the contact settings for a given website.
 * @example
 * ```ts
 * await updateContactSettings(uuid, updatedContactSettings);
 * ```
 */
export const updateContactSettings = async (
  uuid: UUID,
  updatedContactSettings: ContactSettings,
) => await ky.post(`http://localhost:3333/${uuid}/contact-settings`, { json: updatedContactSettings, cache: 'no-store' }).json();
