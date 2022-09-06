const getLocalStorage = (key: string, property?: string) => {
  const parsedLocalStorage = JSON.parse(localStorage.getItem(key) || '{}');
  return property ? parsedLocalStorage[property] : parsedLocalStorage;
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
