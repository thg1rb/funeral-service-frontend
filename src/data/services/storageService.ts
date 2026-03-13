export const storageService = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return defaultValue;
    }
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  },
  set: <T>(key: string, value: T): void => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  },
};
