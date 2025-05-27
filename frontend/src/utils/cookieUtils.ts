import Cookies from 'js-cookie';

export const cookieUtils = {
  // Set a cookie
  setCookie: (name: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(name, value, {
      expires: 7, // expires in 7 days by default
      path: '/', // available across the entire site
      ...options,
    });
  },

  // Get a cookie
  getCookie: (name: string): string | undefined => {
    return Cookies.get(name);
  },

  // Remove a cookie
  removeCookie: (name: string, options?: Cookies.CookieAttributes) => {
    Cookies.remove(name, {
      path: '/',
      ...options,
    });
  },
  
  // Set a secure cookie (HTTPS only)
  setSecureCookie: (name: string, value: string, options?: Cookies.CookieAttributes) => {
    Cookies.set(name, value, {
      secure: true, // HTTPS only
      sameSite: 'lax',
      httpOnly: true,
      ...options,
    });
  },
};