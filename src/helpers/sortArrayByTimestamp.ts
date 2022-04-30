function sortedArrayByTimestamp<Type extends { timestamp: number }>(array: Type[]): Type[] {
  return array.sort((a, b) => {
    if (a.timestamp > b.timestamp) return 1;
    if (a.timestamp < b.timestamp) return -1;
    return 0;
  });
}

export { sortedArrayByTimestamp };
