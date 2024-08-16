import { AccountInfo, User } from "../types";

/**
 * Provides the authenticated user information.
 * @example
 * ```ts
 * await getAccountInfo(cookies);
 * ```
 */

export const getAccountInfo = async (cookies: any): Promise<User> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join("; "),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

/**
 * Updates the user account information.
 * @example
 * ```ts
 * await updateAccountInfo(cookies, data);
 * ```
 */

export const updateAccountInfo = async (
  updatedAccountInfo: AccountInfo,
  cookies: any,
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies.map((cookie: any) =>
        `${cookie.name}=${cookie.value}`).join("; "),
    },
    body: JSON.stringify(updatedAccountInfo),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to update account info: ${response.statusText}`);
  }

  return await response.json();
};
