import ky from "ky";
import { User } from "../types";

/**
 * Provides the authenticated user information.
 * @example
 * ```ts
 * await getAccountInfo();
 * ```
 */
export const getAccountInfo = async (
  cookies: any,
): Promise<User> => await ky.get(`http://localhost:3333/account`, {
  credentials: "include",
  headers: { 'Cookie': cookies.map((cookie: any) => `${cookie.name}=${cookie.value}`).join('; ') }
}).json();
