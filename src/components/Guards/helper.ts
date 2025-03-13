import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * Retrieves a cookie.
 *
 * @param cookieName - Name of the cookie.
 * @return {any}
 */
export function getCookie(cookieName: string) {
  return cookies.get(cookieName);
}
