const getScrollPosition = (property?: string) => {
  const parsedSessionStorage = JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
  return property ? parsedSessionStorage[property] : parsedSessionStorage;
};

const updateScrollPosition = (value: { [key: string]: number }) => {
  sessionStorage.setItem(
    'scrollPositions',
    JSON.stringify({
      ...getScrollPosition(),
      ...value,
    }),
  );
};

export { getScrollPosition, updateScrollPosition };
