function sortedArrayByTimestamp<DbList extends { timestamp: number }>(array: DbList[]): DbList[] {
  return array.sort((a, b) => a.timestamp - b.timestamp);
}

export { sortedArrayByTimestamp };
