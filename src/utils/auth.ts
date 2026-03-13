export const isAdmin = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('session') !== null;
};
