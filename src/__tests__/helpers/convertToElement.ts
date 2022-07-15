import { ReactWrapper } from 'enzyme';

export const convertToElement = (el: ReactWrapper) => {
  const element = el.getDOMNode();
  if (Array.isArray(element)) {
    return element.filter((item) => item !== null)[0] as HTMLElement;
  }
  if (element) return element as HTMLElement;
  return null;
};
