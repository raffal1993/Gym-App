import { RefObject } from 'react';

type AnimatedElement = 'sidebarButton' | 'editModeButton';

let keyframes: {
  [key in AnimatedElement]: KeyframeEffect;
};
let animation: {
  [key in AnimatedElement]: Animation;
};

export const animateButton = (
  ref: RefObject<HTMLElement>,
  option: 'start' | 'stop',
  type: AnimatedElement,
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
        animation[key as AnimatedElement].cancel();
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

    if (option === 'stop' && animation && animation[type]) {
      animation[type].cancel();
    }
  }
};
