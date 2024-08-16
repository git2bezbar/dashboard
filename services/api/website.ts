/**
 *
 * Generates a website.
 * @example
 * ```ts
 * await generateWebsite("Restaurant", "contact@restaurant.fr");
 * ```
 */

export const generateWebsite = async (
  websiteTitle: string,
  email: string
): Promise<{ uuid: string }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ websiteTitle, email }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

/**
 *
 * Get the UUID of a website for an authenticated user.
 * @example
 * ```ts
 * await getWebsite(cookies);
 * ```
 */

export const getWebsite = async (
  cookies: any
): Promise<{ uuid: string }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/website`, {
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
 *
 * Get the UUIDs of several websites for an authenticated user.
 * @example
 * ```ts
 * await getWebsites(cookies);
 * ```
 */

export const getWebsites = async (
  cookies: any
): Promise<any[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/websites`, {
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
