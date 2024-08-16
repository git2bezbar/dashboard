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
): Promise<{ isLogged: boolean }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

/**
 * Checks authentication.
 * @example
 * ```ts
 * await checkAuthentication(cookies);
 * ```
 */

export const checkAuthentication = async (cookies: any): Promise<boolean> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
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
 * Disconnect the user.
 * @example
 * ```ts
 * await disconnect();
 * ```
 */

export const disconnect = async (): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};
