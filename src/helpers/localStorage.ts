const getLocalStorage = (key: string, property?: string) => {
  if (property) return JSON.parse(localStorage.getItem(key) || '{}')[property];
  return JSON.parse(localStorage.getItem(key) || '{}');
};

const updateLocalStorage = (key: string, value: object) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      ...getLocalStorage(key),
      ...value,
    }),
  );
};

const clearLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export { getLocalStorage, updateLocalStorage, clearLocalStorage };
