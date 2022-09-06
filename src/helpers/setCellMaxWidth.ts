export const setCellMaxWidth = (cell: string) => {
  switch (cell) {
    case 'weight':
      return 70;
    case 'reps':
      return 70;
    case 'info':
      return 120;
    default:
      return 80;
  }
};
