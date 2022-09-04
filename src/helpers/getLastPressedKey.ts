export const getLastPressedKey = (newValue: string, value: string) => {
  const newValueArr = [...newValue];
  const valueArr = [...value];
  const lastKeyArr: string[] = [];

  [...newValue].forEach((elem) => {
    const index = valueArr.indexOf(elem);
    if (index === -1) {
      lastKeyArr.push(elem);
      newValueArr.splice(0, 1);
    } else {
      newValueArr.splice(0, 1);
      valueArr.splice(index, 1);
    }
  });
  return lastKeyArr.join();
};
