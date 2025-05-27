import Cookies from 'js-cookie';

export const cookieDebug = {
  // Debug function to test cookie behavior
  debugCookie: (name: string, value: string) => {
    console.log('=== COOKIE DEBUG START ===');
    console.log('Setting cookie:', name, '=', value);
    console.log('Current domain:', window.location.hostname);
    console.log('Current protocol:', window.location.protocol);
    console.log('All cookies before:', document.cookie);
    
    // Test 1: Minimal cookie
    console.log('\n--- Test 1: Minimal Cookie ---');
    Cookies.set(name + '_minimal', value);
    console.log('After minimal set:', document.cookie);
    
    // Test 2: With path only
    console.log('\n--- Test 2: Path Only ---');
    Cookies.set(name + '_path', value, { path: '/' });
    console.log('After path set:', document.cookie);
    
    // Test 3: With expires only
    console.log('\n--- Test 3: Expires Only ---');
    Cookies.set(name + '_expires', value, { expires: 1 });
    console.log('After expires set:', document.cookie);
    
    // Test 4: Your current config
    console.log('\n--- Test 4: Current Config ---');
    Cookies.set(name + '_current', value, {
      secure: true,
      sameSite: 'lax',
      expires: 7,
      path: '/'
    });
    console.log('After current config:', document.cookie);
    
    // Test 5: Without secure
    console.log('\n--- Test 5: Without Secure ---');
    Cookies.set(name + '_nosecure', value, {
      sameSite: 'lax',
      expires: 7,
      path: '/'
    });
    console.log('After no secure:', document.cookie);
    
    // Wait and check again
    setTimeout(() => {
      console.log('\n--- After 3 seconds ---');
      console.log('All cookies after delay:', document.cookie);
      console.log('=== COOKIE DEBUG END ===');
    }, 3000);
  },

  // Check if we're in the right environment
  checkEnvironment: () => {
    console.log('=== ENVIRONMENT CHECK ===');
    console.log('typeof window:', typeof window);
    console.log('window.location.hostname:', window?.location?.hostname);
    console.log('window.location.protocol:', window?.location?.protocol);
    console.log('Is HTTPS:', window?.location?.protocol === 'https:');
    console.log('User Agent:', navigator?.userAgent);
    console.log('Document cookie support:', 'cookie' in document);
    console.log('=== ENVIRONMENT CHECK END ===');
  }
};

// Updated cookie utils with better error handling
export const cookieUtils = {
  setCookie: (name: string, value: string, options?: Cookies.CookieAttributes) => {
    try {
      console.log('Setting cookie:', name, 'with options:', options);
      const result = Cookies.set(name, value, {
        expires: 7,
        path: '/',
        ...options,
      });
      console.log('Cookie set result:', result);
      console.log('Immediately after set:', Cookies.get(name));
      return result;
    } catch (error) {
      console.error('Error setting cookie:', error);
    }
  },

  getCookie: (name: string): string | undefined => {
    try {
      const value = Cookies.get(name);
      console.log('Getting cookie:', name, '=', value);
      return value;
    } catch (error) {
      console.error('Error getting cookie:', error);
      return undefined;
    }
  },

  removeCookie: (name: string, options?: Cookies.CookieAttributes) => {
    try {
      console.log('Removing cookie:', name);
      return Cookies.remove(name, {
        path: '/',
        ...options,
      });
    } catch (error) {
      console.error('Error removing cookie:', error);
    }
  },
  
  setSecureCookie: (name: string, value: string, options?: Cookies.CookieAttributes) => {
    try {
      console.log('Setting secure cookie:', name, 'with options:', options);
      const result = Cookies.set(name, value, {
        secure: true,
        sameSite: 'lax',
        expires: 7,
        path: '/',
        ...options,
      });
      console.log('Secure cookie set result:', result);
      console.log('Immediately after secure set:', Cookies.get(name));
      return result;
    } catch (error) {
      console.error('Error setting secure cookie:', error);
    }
  },
};