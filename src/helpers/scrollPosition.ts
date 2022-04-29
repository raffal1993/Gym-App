const getScrollPosition = (property?: string) => {
  if (property) return JSON.parse(sessionStorage.getItem('scrollPositions') || '{}')[property];
  return JSON.parse(sessionStorage.getItem('scrollPositions') || '{}');
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
