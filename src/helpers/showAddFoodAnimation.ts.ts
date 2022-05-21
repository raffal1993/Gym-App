import { RefObject } from 'react';

export const addFoodAnimation = (
  ref: RefObject<HTMLElement>,
  option: 'hide' | 'show',
  duration: number = 300,
) => {
  if (ref.current) {
    const moveToPosition = option === 'show' ? 'translateY(0)' : 'translateY(100%)';
    ref.current.animate([{ transform: moveToPosition }], { duration, fill: 'forwards' });
  }
};
