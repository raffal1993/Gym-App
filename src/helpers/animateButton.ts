import { RefObject } from 'react';

let keyframes: {
  [key: string]: KeyframeEffect;
};
let animation: {
  [key: string]: Animation;
};

export const animateButton = (
  ref: RefObject<HTMLElement>,
  option: 'start' | 'stop',
  type: 'sidebarButton' | 'editModeButton',
) => {
  if (ref.current) {
    const animationKeyframes = [{ filter: 'brightness(150%)' }, { filter: 'brightness(100%)' }];
    const animationOptions: KeyframeAnimationOptions = {
      duration: 1000,
      iterations: Infinity,
      direction: 'alternate',
    };

    if (option === 'start') {
      for (const key in animation) {
        animation[key].cancel();
      }

      const tempKeyframes = {
        [type]: new KeyframeEffect(ref.current, animationKeyframes, animationOptions),
      };
      keyframes = { ...keyframes, ...tempKeyframes };

      const tempAnimation = {
        [type]: new Animation(tempKeyframes[type]),
      };

      animation = { ...animation, ...tempAnimation };
      animation[type].play();
    }
    if (option === 'stop' && animation[type]) animation[type].cancel();
  }
};
