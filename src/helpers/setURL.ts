export const setURL = (searchingPhrase: string, page: number = 1) => {
  page <= 0 && (page = 1);
  return `&ingr=${searchingPhrase}&session=${(page - 1) * 20}`;
};
