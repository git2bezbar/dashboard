import ky from "ky";
import { GeneralSettings, UUID } from "../types";

/**
 * Provides the general settings for a given website.
 * @example
 * ```ts
 * await getGeneralSettings(uuid);
 * ```
 */
export const getGeneralSettings = async (
  uuid: UUID,
): Promise<GeneralSettings> => await ky.get(`http://localhost:3333/${uuid}/general-settings`, { cache: 'no-store' }).json();

/**
 * todo
 * Updates the general settings for a given website.
 * @example
 * ```ts
 * await updateGeneralSettings(uuid, updatedGeneralSettings);
 * ```
 */
export const updateGeneralSettings = async (
  uuid: UUID,
  updatedGeneralSettings: GeneralSettings,
) => await ky.post(`http://localhost:3333/${uuid}/general-settings`, { json: updatedGeneralSettings, cache: 'no-store'}).json();
