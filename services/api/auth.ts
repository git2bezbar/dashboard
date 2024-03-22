import ky from "ky";

/**
 * Try to authenticate.
 * @example
 * ```ts
 * await authenticate("johndoe@forkee.fr", "johnDoe");
 * ```
 */
export const authenticate = async (
  email: string,
  password: string,
): Promise<{ isLogged: boolean }> => await ky.post("http://localhost:3333/auth/login", { json: { email, password }, credentials: "include" }).json()

/**
 * Checks authentication.
 * @example
 * ```ts
 * await checkAuthentication();
 * ```
 */
export const checkAuthentication = async (
  cookies: any,
): Promise<boolean> => await ky.get("http://localhost:3333/auth/me", { 
  credentials: "include",
  headers: {
    'Cookie': cookies.map((cookie: any) => `${cookie.name}=${cookie.value}`).join('; '),
  } 
}).json()

/**
 * Disconnect the user.
 * @example
 * ```ts
 * await disconnect();
 * ```
 */
export const disconnect = async () => await ky.post("http://localhost:3333/auth/logout").json()