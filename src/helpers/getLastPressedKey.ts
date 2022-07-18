export const getlastPressedKey = (newValue: string, value: string) => {
  const newValuearr = [...newValue];
  const valueArr = [...value];
  const lastKeyArr: string[] = [];

  [...newValue].forEach((elem) => {
    const index = valueArr.indexOf(elem);
    if (index === -1) {
      lastKeyArr.push(elem);
      newValuearr.splice(0, 1);
    } else {
      newValuearr.splice(0, 1);
      valueArr.splice(index, 1);
    }
  });
  return lastKeyArr.join();
};
