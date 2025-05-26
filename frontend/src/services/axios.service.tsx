import API_CONSTANTS from '@/constants/apiConstant';
import axios from 'axios';

const axiosObject = axios.create({
  baseURL: API_CONSTANTS.BASE_URL
});

axiosObject.interceptors.request.use(
  config => {
    const getCookie = (name: string): string | null => {
      // Only run on client side
      if (typeof window === 'undefined') return null;
      
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    };

    // Only add authorization header on client side
    if (typeof window !== 'undefined') {
      const token = getCookie("cabtoken");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
    }
    
    return config;
  },
  error => { 
    return Promise.reject(error);
  }
);

type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
type JSONObject = { [key: string]: JSONValue };
type JSONArray = JSONValue[];

const convertDatesToLocal = (obj: JSONValue): JSONValue => {
  const isDateString = (str: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(str);
  };

  const convertToLocalDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const convertObject = (item: JSONValue): JSONValue => {
    if (typeof item !== 'object' || item === null) {
      return item;
    }

    if (Array.isArray(item)) {
      return item.map(convertObject);
    }

    return Object.fromEntries(
      Object.entries(item).map(([key, value]: [string, JSONValue]) => {
        if (typeof value === 'string' && isDateString(value)) {
          return [key, convertToLocalDate(value)];
        }
        return [key, convertObject(value)];
      })
    );
  };

  return convertObject(obj);
};

export default axiosObject;